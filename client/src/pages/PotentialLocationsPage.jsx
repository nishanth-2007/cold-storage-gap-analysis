import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  AlertCircle, 
  TrendingUp, 
  IndianRupee, 
  Warehouse, 
  Truck, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Compass,
  FileSpreadsheet,
  Layers
} from 'lucide-react';
import { newStorageLocationService } from '../services/newStorageLocationService';
import DataBadge from '../components/DataBadge';

export default function PotentialLocationsPage() {
  const [data, setData] = useState(null);
  const [selectedUrgency, setSelectedUrgency] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLocations() {
      setLoading(true);
      try {
        const res = await newStorageLocationService.getPotentialLocations();
        setData(res);
      } catch (err) {
        console.error('Failed to load potential locations:', err);
      } finally {
        setLoading(false);
      }
    }
    loadLocations();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-3">
        <div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-slate-500 font-medium">Running geospatial catchment & deficit clustering algorithm...</p>
      </div>
    );
  }

  let clusters = data?.clusters || [];
  if (selectedUrgency !== 'ALL') {
    clusters = clusters.filter(c => c.urgencyLevel === selectedUrgency);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Spatial Deficit Algorithm • Andhra Pradesh</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Potential Areas for New Cold Storage Facilities
        </h1>
        <p className="text-xs sm:text-sm text-amber-100 max-w-3xl leading-relaxed">
          Identifies unserved high-density horticulture clusters where existing cold storage facilities are either too far away (&gt;25 km) or operating at near-maximum capacity, leading to severe distress sales.
        </p>
      </div>

      {/* Aggregate Investment Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Identified Zones</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{data?.totalIdentifiedClusters} Clusters</p>
          <p className="text-[11px] text-amber-600 mt-0.5">Top-priority agricultural catchments</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Annual Produce at Risk</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {(data?.aggregateProduceAtRiskMT / 1000).toLocaleString('en-IN')}k <span className="text-xs font-normal text-slate-500">MT/yr</span>
          </p>
          <p className="text-[10px] text-red-500 mt-0.5">Vulnerable to post-harvest spoilage</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Recommended New MT</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">
            {data?.totalRecommendedNewCapacityMT.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-500">MT</span>
          </p>
          <p className="text-[10px] text-emerald-600 mt-0.5">Multi-chamber & CA technology</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Estimated Capex Required</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            ₹{data?.estimatedInvestmentRequiredCroresINR} <span className="text-xs font-normal text-slate-500">Crores</span>
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">Avg payback: 4.2 years</p>
        </div>
      </div>

      {/* Filter and Cluster Listing */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              High-Priority Feasibility Clusters
            </h2>
            <p className="text-xs text-slate-500">
              Detailed site appraisals with local produce exposure, recommended specifications, and payback estimations.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-600">Urgency Level:</span>
            <select
              value={selectedUrgency}
              onChange={(e) => setSelectedUrgency(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-amber-500"
            >
              <option value="ALL">All Urgency Levels</option>
              <option value="Critical Priority">Critical Priority</option>
              <option value="High Priority">High Priority</option>
              <option value="Medium Priority">Medium Priority</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {clusters.map((cluster) => {
            const isCritical = cluster.urgencyLevel === 'Critical Priority';
            const badgeBg = isCritical ? 'bg-red-100 text-red-800 border-red-200' : 'bg-amber-100 text-amber-800 border-amber-200';

            return (
              <div 
                key={cluster.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-6"
              >
                {/* Cluster Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${badgeBg}`}>
                        {cluster.urgencyLevel}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        Priority Score: <strong className="text-amber-700 font-bold">{cluster.priorityScore}/100</strong>
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-800">
                        {cluster.district} District ({cluster.mandal} Mandal)
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900">
                      {cluster.clusterName}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-slate-400" />
                      <span>Suggested Centroid: Lat {cluster.suggestedCoordinates.lat}, Lng {cluster.suggestedCoordinates.lng}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <p className="text-[11px] text-slate-400 uppercase font-semibold">Nearest Existing Store</p>
                      <p className="text-lg font-bold text-red-600">{cluster.distanceToNearestExistingColdStorageKm} km away</p>
                    </div>
                  </div>
                </div>

                {/* Analytical Rationale Callout */}
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-slate-700 space-y-1.5">
                  <span className="font-bold text-amber-900 flex items-center gap-1.5 text-xs">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                    Strategic Assessment & Farmer Hardship:
                  </span>
                  <p className="leading-relaxed text-slate-700">{cluster.rationale}</p>
                </div>

                {/* Technical Specifications Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 text-[11px]">Produce at Spoilage Risk</span>
                    <p className="font-bold text-slate-900 text-sm mt-0.5">
                      {cluster.localProduceAtRiskMTPerYear.toLocaleString('en-IN')} MT / yr
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[11px]">Recommended Facility Size</span>
                    <p className="font-bold text-emerald-700 text-sm mt-0.5">
                      {cluster.recommendedCapacityMT.toLocaleString('en-IN')} MT
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[11px]">Estimated Project Capex</span>
                    <p className="font-bold text-slate-900 text-sm mt-0.5">
                      ₹{cluster.estimatedCapexCroresINR} Crores INR
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[11px]">Est. Payback Horizon</span>
                    <p className="font-bold text-slate-900 text-sm mt-0.5">
                      {cluster.paybackPeriodYears} Years
                    </p>
                  </div>
                </div>

                {/* Chamber Type & Connectivity */}
                <div className="space-y-2 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-slate-500 font-medium">Recommended Technology:</span>
                    <span className="font-semibold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {cluster.recommendedChamberType}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-slate-500 font-medium">Corridor Logistics & NH Access:</span>
                    <span className="font-medium text-slate-700">
                      {cluster.connectivity}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-slate-400 text-[11px] font-medium mr-1">Primary Commodities:</span>
                    {cluster.primaryTargetCommodities.map(c => (
                      <span key={c} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer with Data Provenance */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <DataBadge
                    source="GIS Catchment & Cluster Algorithm"
                    sourceType="Platform Calculated"
                    sourceLastUpdated="2026-09-27"
                  />
                  <div className="flex items-center gap-2">
                    <Link
                      to="/map"
                      className="inline-flex items-center gap-1 text-emerald-700 font-bold hover:underline"
                    >
                      Locate on Map <Compass className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
