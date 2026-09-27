import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import { 
  Layers, 
  MapPin, 
  Warehouse, 
  AlertTriangle, 
  TrendingUp, 
  Filter, 
  Info, 
  Check, 
  ShieldCheck,
  Maximize2,
  Navigation,
  RefreshCw,
  Eye,
  Store
} from 'lucide-react';
import { coldStorageService } from '../services/coldStorageService';
import { gapAnalysisService } from '../services/gapAnalysisService';
import { newStorageLocationService } from '../services/newStorageLocationService';
import { marketService } from '../services/marketService';
import { gisService } from '../services/gisService';
import DataBadge from '../components/DataBadge';

export default function InteractiveMapPage() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupsRef = useRef({
    coldStorages: null,
    gapCircles: null,
    potentialHotspots: null,
    markets: null
  });

  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');
  const [selectedCrop, setSelectedCrop] = useState('ALL');
  
  // Layer toggles
  const [layers, setLayers] = useState({
    coldStorages: true,
    gapCircles: true,
    potentialHotspots: true,
    markets: true
  });

  const [coldStorages, setColdStorages] = useState([]);
  const [gapRecords, setGapRecords] = useState([]);
  const [potentialLocations, setPotentialLocations] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // AP Center coordinates
      const map = L.map(mapContainerRef.current, {
        center: [15.9129, 79.7400],
        zoom: 7,
        minZoom: 6,
        maxZoom: 14
      });

      // CartoDB Positron / OpenStreetMap clean tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> & OpenStreetMap contributors',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      // Initialize layer groups
      layerGroupsRef.current.coldStorages = L.layerGroup().addTo(map);
      layerGroupsRef.current.gapCircles = L.layerGroup().addTo(map);
      layerGroupsRef.current.potentialHotspots = L.layerGroup().addTo(map);
      layerGroupsRef.current.markets = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Fetch all GIS datasets
  useEffect(() => {
    async function loadGisData() {
      setLoading(true);
      try {
        const [storages, gaps, potentials, mkts, distList] = await Promise.all([
          coldStorageService.getColdStorages(),
          gapAnalysisService.getGapAnalysis(),
          newStorageLocationService.getPotentialLocations(),
          marketService.getMarkets(),
          gisService.getDistricts()
        ]);

        setColdStorages(storages);
        setGapRecords(gaps.districts || []);
        setPotentialLocations(potentials.clusters || []);
        setMarkets(mkts);
        setDistricts(distList);
      } catch (err) {
        console.error('Failed to load map data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadGisData();
  }, []);

  // Render Markers on Map
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const { coldStorages: csLayer, gapCircles: gapLayer, potentialHotspots: potLayer, markets: mktLayer } = layerGroupsRef.current;

    // 1. Render Cold Storages Layer
    csLayer.clearLayers();
    if (layers.coldStorages) {
      let filteredCS = coldStorages;
      if (selectedDistrict !== 'ALL') {
        filteredCS = filteredCS.filter(cs => cs.district.toLowerCase() === selectedDistrict.toLowerCase());
      }
      if (selectedCrop !== 'ALL') {
        filteredCS = filteredCS.filter(cs => cs.commoditiesSupported.some(c => c.toLowerCase() === selectedCrop.toLowerCase()));
      }

      filteredCS.forEach(cs => {
        const isNearFull = cs.operatingStatus === 'Near Full';
        const isFull = cs.operatingStatus === 'Full';
        const color = isFull ? '#ef4444' : isNearFull ? '#f59e0b' : '#10b981';

        const customIcon = L.divIcon({
          className: 'custom-map-marker',
          html: `
            <div style="background-color: ${color}; color: white; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 2.5px solid white;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 21V7l9-4 9 4v14H3z"></path>
                <path d="M9 21V11h6v10"></path>
              </svg>
            </div>
          `,
          iconSize: [34, 34],
          iconAnchor: [17, 17],
          popupAnchor: [0, -18]
        });

        const marker = L.marker([cs.coordinates.lat, cs.coordinates.lng], { icon: customIcon });
        
        marker.bindPopup(`
          <div style="font-family: inherit; font-size: 12px; width: 240px; padding: 4px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-size: 10px; font-weight: bold; background: ${isNearFull ? '#fef3c7' : '#d1fae5'}; color: ${isNearFull ? '#92400e' : '#065f46'}; padding: 2px 6px; border-radius: 4px;">
                ${cs.operatingStatus}
              </span>
              <span style="font-size: 11px; font-weight: bold; color: #047857;">${cs.availableCapacityMT} MT Free</span>
            </div>
            <strong style="font-size: 13px; color: #0f172a; display: block; margin-bottom: 4px;">${cs.facilityName}</strong>
            <p style="color: #64748b; font-size: 11px; margin: 0 0 6px 0;">${cs.address}</p>
            <div style="background: #f8fafc; border-radius: 6px; padding: 6px; margin-bottom: 8px; font-size: 11px;">
              <div><strong>Total Capacity:</strong> ${cs.totalCapacityMT} MT</div>
              <div><strong>Rent:</strong> ₹${cs.pricingPerMTMonth} / MT / Month</div>
              <div><strong>Contact:</strong> ${cs.contactPhone}</div>
            </div>
            <a href="/cold-storage/${cs.id}" style="display: block; text-align: center; background: #047857; color: white; padding: 6px 12px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 11px;">
              View Facility Details
            </a>
          </div>
        `);

        marker.on('click', () => setSelectedFacility(cs));
        csLayer.addLayer(marker);
      });
    }

    // 2. Render Gap Circles Layer (District Deficit Heatmap)
    gapLayer.clearLayers();
    if (layers.gapCircles) {
      gapRecords.forEach(gap => {
        const dist = districts.find(d => d.name.toLowerCase() === gap.district.toLowerCase());
        if (dist && dist.centroid) {
          let circleColor = '#10b981';
          if (gap.gapSeverityIndex === 'Critical Deficit') circleColor = '#ef4444';
          else if (gap.gapSeverityIndex === 'High Deficit') circleColor = '#f97316';
          else if (gap.gapSeverityIndex === 'Moderate Deficit') circleColor = '#eab308';

          const radius = Math.min(45000, Math.max(18000, (gap.netStorageGapMT / 10)));

          const circle = L.circle(dist.centroid, {
            color: circleColor,
            fillColor: circleColor,
            fillOpacity: 0.18,
            weight: 2,
            radius: radius
          });

          circle.bindPopup(`
            <div style="font-size: 12px; width: 220px; font-family: inherit;">
              <span style="font-size: 10px; font-weight: bold; background: ${circleColor}20; color: ${circleColor}; padding: 2px 6px; border-radius: 4px;">
                ${gap.gapSeverityIndex}
              </span>
              <h4 style="font-size: 14px; font-weight: bold; margin: 6px 0 4px 0; color: #0f172a;">${gap.district} District</h4>
              <div style="font-size: 11px; color: #475569; line-height: 1.5;">
                <div>Storage Demand: <strong>${gap.annualStorageDemandMT.toLocaleString('en-IN')} MT</strong></div>
                <div>Existing Capacity: <strong>${gap.existingColdStorageCapacityMT.toLocaleString('en-IN')} MT</strong></div>
                <div>Storage Gap: <strong style="color: ${circleColor};">${gap.netStorageGapMT.toLocaleString('en-IN')} MT (${gap.gapPercentage}%)</strong></div>
                <div>Recommended New MT: <strong>${gap.recommendedNewCapacityMT.toLocaleString('en-IN')} MT</strong></div>
              </div>
            </div>
          `);

          gapLayer.addLayer(circle);
        }
      });
    }

    // 3. Render Potential Hotspots Layer (Pulsing Radar Rings)
    potLayer.clearLayers();
    if (layers.potentialHotspots) {
      potentialLocations.forEach(spot => {
        const potIcon = L.divIcon({
          className: 'custom-radar-marker',
          html: `
            <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
              <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background: rgba(245, 158, 11, 0.4); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
              <div style="background-color: #d97706; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 2px solid white; z-index: 2;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
            </div>
          `,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
          popupAnchor: [0, -18]
        });

        const marker = L.marker([spot.suggestedCoordinates.lat, spot.suggestedCoordinates.lng], { icon: potIcon });
        marker.bindPopup(`
          <div style="font-size: 12px; width: 240px; font-family: inherit;">
            <span style="font-size: 10px; font-weight: bold; background: #fef3c7; color: #b45309; padding: 2px 6px; border-radius: 4px;">
              ${spot.urgencyLevel}
            </span>
            <h4 style="font-size: 13px; font-weight: bold; margin: 6px 0 2px 0; color: #0f172a;">${spot.clusterName}</h4>
            <p style="color: #64748b; font-size: 11px; margin: 0 0 6px 0;">${spot.district} District (${spot.mandal} Mandal)</p>
            <div style="background: #fffbeb; border: 1px solid #fef3c7; border-radius: 6px; padding: 6px; font-size: 11px; margin-bottom: 8px;">
              <div><strong>Produce at Risk:</strong> ${spot.localProduceAtRiskMTPerYear.toLocaleString('en-IN')} MT/yr</div>
              <div><strong>Recommended MT:</strong> ${spot.recommendedCapacityMT} MT</div>
              <div><strong>Est. Capex:</strong> ₹${spot.estimatedCapexCroresINR} Cr</div>
              <div><strong>Payback:</strong> ${spot.paybackPeriodYears} Years</div>
            </div>
            <a href="/potential-locations" style="display: block; text-align: center; background: #d97706; color: white; padding: 6px 12px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 11px;">
              View Cluster Feasibility
            </a>
          </div>
        `);
        potLayer.addLayer(marker);
      });
    }

    // 4. Render APMC Mandi Agri Markets Layer
    mktLayer.clearLayers();
    if (layers.markets) {
      markets.forEach(mkt => {
        const mktIcon = L.divIcon({
          className: 'custom-mkt-marker',
          html: `
            <div style="background-color: #0284c7; color: white; width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 8px rgba(0,0,0,0.25); border: 2px solid white;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
          popupAnchor: [0, -14]
        });

        const marker = L.marker([mkt.coordinates.lat, mkt.coordinates.lng], { icon: mktIcon });
        marker.bindPopup(`
          <div style="font-size: 12px; width: 210px; font-family: inherit;">
            <span style="font-size: 10px; font-weight: bold; background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px;">
              ${mkt.marketType}
            </span>
            <h4 style="font-size: 13px; font-weight: bold; margin: 6px 0 2px 0; color: #0f172a;">${mkt.marketName}</h4>
            <p style="color: #64748b; font-size: 11px; margin: 0 0 6px 0;">${mkt.district} District</p>
            <div style="font-size: 11px; color: #475569; margin-bottom: 6px;">
              <strong>Key Commodities:</strong> ${mkt.majorCommodities.join(', ')}
            </div>
            <a href="/market-insights" style="display: block; text-align: center; background: #0284c7; color: white; padding: 5px 10px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 11px;">
              Check Daily Modal Prices
            </a>
          </div>
        `);
        mktLayer.addLayer(marker);
      });
    }

  }, [layers, coldStorages, gapRecords, potentialLocations, markets, selectedDistrict, selectedCrop, districts]);

  // Handle District Jump
  const handleDistrictJump = (districtName) => {
    setSelectedDistrict(districtName);
    const map = mapInstanceRef.current;
    if (!map) return;

    if (districtName === 'ALL') {
      map.flyTo([15.9129, 79.7400], 7, { duration: 1.2 });
      return;
    }

    const dist = districts.find(d => d.name.toLowerCase() === districtName.toLowerCase());
    if (dist && dist.centroid) {
      map.flyTo(dist.centroid, 10, { duration: 1.2 });
    }
  };

  const toggleLayer = (layerKey) => {
    setLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
      {/* Top Controls Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Interactive Andhra Pradesh Cold Storage & Gap Map
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time geospatial visualization of 26 districts, facility capacities, deficit clusters, and mandi nodes.
          </p>
        </div>

        {/* Filters & District Quick Jump */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* District Quick Jump */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-semibold text-slate-600">District:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => handleDistrictJump(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 font-medium text-xs focus:ring-2 focus:ring-emerald-500"
            >
              <option value="ALL">Entire State (All 26 Districts)</option>
              {districts.map(d => (
                <option key={d.name} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Crop Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-semibold text-slate-600">Crop:</span>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 font-medium text-xs focus:ring-2 focus:ring-emerald-500"
            >
              <option value="ALL">All Commodities</option>
              <option value="Fresh Chilli">Fresh Chilli</option>
              <option value="Tomato">Tomato</option>
              <option value="Mango">Mango</option>
              <option value="Banana">Banana</option>
              <option value="Sweet Orange">Sweet Orange</option>
              <option value="Turmeric">Turmeric</option>
            </select>
          </div>
        </div>
      </div>

      {/* Layer Toggles & Map Container Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Column: Interactive Map Layers & Legend */}
        <div className="space-y-4 lg:col-span-1">
          {/* Layer Visibility Toggles */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-700" />
                Map Layers
              </span>
              <span className="text-[10px] text-slate-400">Toggle Visibility</span>
            </div>

            <div className="space-y-2 text-xs">
              {/* Layer 1: Cold Storages */}
              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer border border-slate-100 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[9px]">
                    ●
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">Cold Storages</span>
                    <p className="text-[10px] text-slate-400">Live available MT</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={layers.coldStorages}
                  onChange={() => toggleLayer('coldStorages')}
                  className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
              </label>

              {/* Layer 2: Gap Severity Circles */}
              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer border border-slate-100 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500/80 flex items-center justify-center text-white text-[9px]">
                    ◎
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">Storage Gap Deficit</span>
                    <p className="text-[10px] text-slate-400">District severity circles</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={layers.gapCircles}
                  onChange={() => toggleLayer('gapCircles')}
                  className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
              </label>

              {/* Layer 3: Potential New Locations */}
              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer border border-slate-100 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-white text-[9px] animate-pulse">
                    ★
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">New Storage Hotspots</span>
                    <p className="text-[10px] text-slate-400">Underserved catchments</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={layers.potentialHotspots}
                  onChange={() => toggleLayer('potentialHotspots')}
                  className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
              </label>

              {/* Layer 4: APMC Mandis */}
              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer border border-slate-100 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-sky-600 flex items-center justify-center text-white text-[9px]">
                    ■
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">APMC Mandis</span>
                    <p className="text-[10px] text-slate-400">Trading terminals & yards</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={layers.markets}
                  onChange={() => toggleLayer('markets')}
                  className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
              </label>
            </div>
          </div>

          {/* Map Legend */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
              Gap Severity Legend
            </span>
            <div className="space-y-1.5 text-[11px] text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span>Critical Deficit (&gt;95% unserved)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-500" />
                <span>High Deficit (80% - 95%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span>Moderate Deficit (30% - 80%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span>Adequate / Surplus Capacity</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <DataBadge
                source="NCCD & Directorate of Horticulture AP"
                sourceType="Platform Calculated"
                sourceLastUpdated="2026-09-27"
              />
            </div>
          </div>

          {/* Selected Facility Mini Drawer */}
          {selectedFacility && (
            <div className="bg-white p-4 rounded-2xl border border-emerald-300 shadow-md space-y-3 animate-in fade-in duration-100">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {selectedFacility.operatingStatus}
                </span>
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {selectedFacility.facilityName}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">{selectedFacility.address}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs p-2.5 bg-slate-50 rounded-xl">
                <div>
                  <span className="text-[10px] text-slate-400">Available:</span>
                  <p className="font-bold text-emerald-700">{selectedFacility.availableCapacityMT} MT</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400">Rate:</span>
                  <p className="font-bold text-slate-800">₹{selectedFacility.pricingPerMTMonth} / MT</p>
                </div>
              </div>

              <Link
                to={`/cold-storage/${selectedFacility.id}`}
                className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold text-center block"
              >
                Open Facility Details
              </Link>
            </div>
          )}
        </div>

        {/* Right Column: Leaflet Map Viewer */}
        <div className="lg:col-span-3 h-[680px] rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative">
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Map Overlay Badge: State Lock */}
          <div className="absolute top-3 right-3 z-20 pointer-events-none bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-md text-xs font-semibold text-slate-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Andhra Pradesh GIS Grid</span>
          </div>
        </div>
      </div>
    </div>
  );
}
