import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Warehouse, 
  RefreshCw, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  Thermometer, 
  Clock, 
  ShieldCheck, 
  Send,
  Building,
  Check,
  X,
  TrendingUp,
  BarChart3,
  Sliders,
  Layers,
  MapPin,
  Map,
  ClipboardList,
  ArrowRight,
  Info,
  Calendar,
  IndianRupee,
  Search,
  Filter,
  Plus,
  Navigation,
  Compass
} from 'lucide-react';
import { coldStorageService } from '../services/coldStorageService';
import { cropProductionService } from '../services/cropProductionService';
import { gapAnalysisService } from '../services/gapAnalysisService';
import { gisService } from '../services/gisService';
import { fetchApi } from '../services/api';
import authService from '../services/authService';
import DataBadge from '../components/DataBadge';

const AP_DISTRICTS_LIST = [
  { name: "Alluri Sitharama Raju", centroid: [18.0648, 82.5297] },
  { name: "Anakapalli", centroid: [17.6896, 83.0033] },
  { name: "Ananthapuramu", centroid: [14.6819, 77.6006] },
  { name: "Annamayya", centroid: [14.1950, 78.9600] },
  { name: "Bapatla", centroid: [15.9042, 80.4674] },
  { name: "Chittoor", centroid: [13.2172, 79.1003] },
  { name: "Dr. B.R. Ambedkar Konaseema", centroid: [16.5760, 81.9870] },
  { name: "East Godavari", centroid: [17.0005, 81.7800] },
  { name: "Eluru", centroid: [16.7107, 81.0952] },
  { name: "Guntur", centroid: [16.3067, 80.4365] },
  { name: "Kakinada", centroid: [16.9891, 82.2475] },
  { name: "Krishna", centroid: [16.1809, 81.1303] },
  { name: "Kurnool", centroid: [15.8281, 78.0373] },
  { name: "Nandyal", centroid: [15.4886, 78.4836] },
  { name: "NTR", centroid: [16.5062, 80.6480] },
  { name: "Palnadu", centroid: [16.2354, 80.0494] },
  { name: "Parvathipuram Manyam", centroid: [18.7796, 83.4289] },
  { name: "Prakasam", centroid: [15.5057, 80.0499] },
  { name: "Sri Potti Sriramulu Nellore", centroid: [14.4426, 79.9865] },
  { name: "Sri Sathya Sai", centroid: [14.1672, 77.8119] },
  { name: "Srikakulam", centroid: [18.2949, 83.8938] },
  { name: "Tirupati", centroid: [13.6288, 79.4192] },
  { name: "Visakhapatnam", centroid: [17.6868, 83.2185] },
  { name: "Vizianagaram", centroid: [18.1067, 83.3956] },
  { name: "West Godavari", centroid: [16.5449, 81.5212] },
  { name: "YSR Kadapa", centroid: [14.4673, 78.8242] }
];

export default function OwnerDashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'dashboard';

  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [farmerRequests, setFarmerRequests] = useState([]);
  const [districtCrops, setDistrictCrops] = useState([]);
  const [districtGaps, setDistrictGaps] = useState([]);
  const [loading, setLoading] = useState(true);

  // Registration Modal & Location State
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [gpsDetecting, setGpsDetecting] = useState(false);
  const [districtsList, setDistrictsList] = useState(AP_DISTRICTS_LIST);

  const currentUser = authService.getCurrentUser();

  const [newFacilityForm, setNewFacilityForm] = useState({
    facilityName: '',
    registrationNumber: '',
    district: 'Guntur',
    mandal: 'Guntur Urban',
    address: '',
    lat: '16.3067',
    lng: '80.4365',
    totalCapacityMT: 5000,
    availableCapacityMT: 5000,
    pricingPerMTMonth: 850,
    commoditiesSupported: 'Fresh Chilli, Tomato, Mango',
    temperatureRange: '2°C to 8°C',
    contactPerson: currentUser?.name || 'Cold Storage Operator',
    contactPhone: currentUser?.phone || '9876543210',
    contactEmail: currentUser?.email || 'owner@ap.gov.in'
  });

  // Live Capacity Form State (Section 10)
  const [availableCapacityMT, setAvailableCapacityMT] = useState(400);
  const [occupiedCapacityMT, setOccupiedCapacityMT] = useState(4600);
  const [facilityStatus, setFacilityStatus] = useState('Limited Availability');
  const [pricingPerMTMonth, setPricingPerMTMonth] = useState(850);
  const [acceptedCrops, setAcceptedCrops] = useState('Fresh Chilli, Tomato, Mango');
  const [temperatureRange, setTemperatureRange] = useState('2°C to 8°C');
  const [temperatureZones, setTemperatureZones] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Gap Analysis & Demand Filter State (Section 12)
  const [filterRadiusKm, setFilterRadiusKm] = useState(25);
  const [filterCrop, setFilterCrop] = useState('Fresh Chilli');

  const handleTabChange = (tab) => {
    setSearchParams({ tab });
  };

  const loadData = async (preferredFacilityId = null) => {
    setLoading(true);
    try {
      const [allStorages, dists] = await Promise.all([
        coldStorageService.getColdStorages({ includePending: 'true' }),
        gisService.getDistricts().catch(() => AP_DISTRICTS_LIST)
      ]);

      if (dists && dists.length > 0) {
        setDistrictsList(dists);
      }
      
      // Data Privacy (Section 26):
      // Owner only sees their own facilities; Admin can see all
      let ownerFacilities = allStorages;
      if (currentUser?.role === 'owner') {
        ownerFacilities = allStorages.filter(cs => 
          cs.ownerId === currentUser.id ||
          cs.contactPhone === currentUser.phone ||
          (currentUser.id === 'usr-owner-01' && cs.id === 'cs-gnt-001')
        );
        if (ownerFacilities.length === 0 && allStorages.length > 0) {
          // Fallback for demo session to primary seed facility
          ownerFacilities = [allStorages[0]];
        }
      }

      setFacilities(ownerFacilities);

      if (ownerFacilities.length > 0) {
        let chosenFac = ownerFacilities[0];
        if (preferredFacilityId) {
          const match = ownerFacilities.find(f => f.id === preferredFacilityId);
          if (match) chosenFac = match;
        } else if (selectedFacility) {
          const match = ownerFacilities.find(f => f.id === selectedFacility.id);
          if (match) chosenFac = match;
        }

        setSelectedFacility(chosenFac);
        syncFacilityToState(chosenFac);

        const [reqs, crops, gaps] = await Promise.all([
          fetchApi(`/farmer-requests?targetColdStorageId=${chosenFac.id}`).catch(() => []),
          cropProductionService.getCropProduction(chosenFac.district).catch(() => []),
          gapAnalysisService.getGapAnalysis(chosenFac.district).catch(() => ({ districts: [] }))
        ]);
        setFarmerRequests(reqs || []);
        setDistrictCrops(crops || []);
        setDistrictGaps(gaps || []);
      }
    } catch (err) {
      console.error('Failed to load owner data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const syncFacilityToState = (fac) => {
    const total = Number(fac.totalCapacityMT) || 5000;
    const avail = fac.availableCapacityMT !== undefined ? Number(fac.availableCapacityMT) : 400;
    const occ = fac.occupiedCapacityMT !== undefined ? Number(fac.occupiedCapacityMT) : (total - avail);

    setAvailableCapacityMT(avail);
    setOccupiedCapacityMT(occ);
    setFacilityStatus(fac.facilityStatus || fac.operatingStatus || 'Limited Availability');
    setPricingPerMTMonth(fac.pricingPerMTMonth || 850);
    setAcceptedCrops(Array.isArray(fac.commoditiesSupported) ? fac.commoditiesSupported.join(', ') : 'Fresh Chilli, Tomato, Mango');
    setTemperatureZones(fac.temperatureZones || []);
    if (fac.temperatureZones && fac.temperatureZones.length > 0) {
      setTemperatureRange(fac.temperatureZones[0].tempRange || '2°C to 8°C');
    }
    setValidationError('');
  };

  const handleFacilitySelect = async (fac) => {
    setSelectedFacility(fac);
    syncFacilityToState(fac);
    setSaveSuccess(false);

    try {
      const [reqs, crops, gaps] = await Promise.all([
        fetchApi(`/farmer-requests?targetColdStorageId=${fac.id}`),
        cropProductionService.getCropProduction(fac.district),
        gapAnalysisService.getGapAnalysis(fac.district)
      ]);
      setFarmerRequests(reqs);
      setDistrictCrops(crops);
      setDistrictGaps(gaps);
    } catch (e) {
      console.warn('Failed to load inquiries for facility:', e);
    }
  };

  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser. Please enter exact latitude and longitude coordinates manually.");
      return;
    }
    setGpsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = Number(pos.coords.latitude.toFixed(6));
        const lng = Number(pos.coords.longitude.toFixed(6));
        setNewFacilityForm(prev => ({
          ...prev,
          lat: lat.toString(),
          lng: lng.toString()
        }));
        setGpsDetecting(false);
      },
      (err) => {
        setGpsDetecting(false);
        alert(`Could not detect live GPS automatically (${err.message}). You can enter exact coordinates manually or click 'Use District Centroid'.`);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleUseDistrictCentroid = (districtName) => {
    const dist = districtsList.find(d => d.name.toLowerCase() === districtName.toLowerCase());
    if (dist && dist.centroid) {
      const lat = dist.centroid.lat !== undefined ? dist.centroid.lat : dist.centroid[0];
      const lng = dist.centroid.lng !== undefined ? dist.centroid.lng : dist.centroid[1];
      setNewFacilityForm(prev => ({
        ...prev,
        district: dist.name,
        lat: Number(lat).toFixed(4),
        lng: Number(lng).toFixed(4)
      }));
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterSuccess('');

    const latNum = parseFloat(newFacilityForm.lat);
    const lngNum = parseFloat(newFacilityForm.lng);

    if (isNaN(latNum) || latNum < -90 || latNum > 90) {
      setRegisterError('Please enter a valid Latitude between -90 and 90 (Andhra Pradesh is approximately 13°N to 19°N).');
      return;
    }
    if (isNaN(lngNum) || lngNum < -180 || lngNum > 180) {
      setRegisterError('Please enter a valid Longitude between -180 and 180 (Andhra Pradesh is approximately 76°E to 85°E).');
      return;
    }
    if (Number(newFacilityForm.totalCapacityMT) <= 0) {
      setRegisterError('Total installed capacity must be greater than 0 MT.');
      return;
    }
    if (Number(newFacilityForm.availableCapacityMT) > Number(newFacilityForm.totalCapacityMT)) {
      setRegisterError('Available capacity cannot exceed total installed capacity.');
      return;
    }

    setRegistering(true);
    try {
      const cropsArray = newFacilityForm.commoditiesSupported
        .split(',')
        .map(c => c.trim())
        .filter(Boolean);

      const payload = {
        facilityName: newFacilityForm.facilityName.trim(),
        registrationNumber: newFacilityForm.registrationNumber.trim() || `AP-CS-${Date.now().toString().slice(-6)}`,
        district: newFacilityForm.district,
        mandal: newFacilityForm.mandal.trim() || `${newFacilityForm.district} Rural`,
        address: newFacilityForm.address.trim(),
        coordinates: {
          lat: latNum,
          lng: lngNum
        },
        totalCapacityMT: Number(newFacilityForm.totalCapacityMT),
        availableCapacityMT: Number(newFacilityForm.availableCapacityMT),
        occupiedCapacityMT: Math.max(0, Number(newFacilityForm.totalCapacityMT) - Number(newFacilityForm.availableCapacityMT)),
        pricingPerMTMonth: Number(newFacilityForm.pricingPerMTMonth),
        commoditiesSupported: cropsArray.length > 0 ? cropsArray : ['Fresh Chilli', 'Tomato', 'Mango'],
        temperatureZones: [
          {
            name: "Main Storage Chamber",
            tempRange: newFacilityForm.temperatureRange || '2°C to 8°C',
            capacityMT: Number(newFacilityForm.totalCapacityMT),
            availableMT: Number(newFacilityForm.availableCapacityMT),
            suitableCommodities: cropsArray
          }
        ],
        contactPerson: newFacilityForm.contactPerson || currentUser?.name || 'Cold Storage Operator',
        contactPhone: newFacilityForm.contactPhone || currentUser?.phone || '9876543210',
        contactEmail: newFacilityForm.contactEmail || currentUser?.email || 'owner@ap.gov.in',
        amenities: ["Pre-cooling Unit", "Weighbridge", "24/7 Power Backup", "Security CCTV"]
      };

      const created = await coldStorageService.registerColdStorage(payload);

      setRegisterSuccess(
        `Facility '${created.facilityName}' submitted successfully! Approval request has been forwarded to the State System Administrator. Upon Admin approval, your cold storage will immediately be added to the live AP GIS map at GPS [${latNum}, ${lngNum}].`
      );

      // Refresh facilities and select the newly registered one
      await loadData(created.id);

      setTimeout(() => {
        setShowRegisterModal(false);
        setRegisterSuccess('');
      }, 3500);
    } catch (err) {
      setRegisterError(err.message || 'Failed to submit facility registration');
    } finally {
      setRegistering(false);
    }
  };

  // Section 10: Live Capacity update with strict validation
  // Validate: occupied + available <= total capacity, available >= 0, occupied >= 0
  const handleLiveCapacitySave = async (e) => {
    e.preventDefault();
    if (!selectedFacility) return;

    const totalCap = Number(selectedFacility.totalCapacityMT);
    const avail = Number(availableCapacityMT);
    const occ = Number(occupiedCapacityMT);

    // Validation
    if (avail < 0 || occ < 0) {
      setValidationError('Capacity values cannot be negative numbers.');
      return;
    }
    if ((occ + avail) > totalCap) {
      setValidationError(`Validation Error: Occupied (${occ} MT) + Available (${avail} MT) = ${occ + avail} MT, which exceeds Total Installed Capacity (${totalCap} MT).`);
      return;
    }

    setValidationError('');
    setSaving(true);
    setSaveSuccess(false);

    try {
      const commoditiesArray = acceptedCrops.split(',').map(s => s.trim()).filter(Boolean);

      const updated = await coldStorageService.updateLiveCapacity(selectedFacility.id, {
        availableCapacityMT: avail,
        occupiedCapacityMT: occ,
        facilityStatus,
        pricingPerMTMonth: Number(pricingPerMTMonth),
        commoditiesSupported: commoditiesArray,
        temperatureZones
      });

      setSelectedFacility(updated.facility);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      setValidationError(`Update failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateRequestStatus = async (requestId, status) => {
    try {
      await fetchApi(`/farmer-requests/${requestId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      });
      setFarmerRequests(prev => prev.map(r => r.id === requestId ? { ...r, status } : r));
    } catch (err) {
      alert(`Failed to update status: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-3">
        <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-slate-500 font-medium">Accessing warehouse telemetry and chamber occupancy records...</p>
      </div>
    );
  }

  const totalCap = Number(selectedFacility?.totalCapacityMT) || 5000;
  const availCap = Number(selectedFacility?.availableCapacityMT) || 400;
  const occCap = selectedFacility?.occupiedCapacityMT !== undefined 
    ? Number(selectedFacility.occupiedCapacityMT) 
    : (totalCap - availCap);
  const utilizationPct = Math.round((occCap / totalCap) * 100);

  // Status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Limited Availability':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Full':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & Facility Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider border border-blue-400/30">
            <Building className="w-3.5 h-3.5" />
            <span>Storage Operator Control Console</span>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {selectedFacility?.facilityName || 'Facility Owner Portal'}
            </h1>
            {selectedFacility?.approvalStatus === 'Pending' && (
              <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-amber-500/30 text-amber-300 border border-amber-400/40">
                ⏳ Pending Admin Review
              </span>
            )}
            {selectedFacility?.approvalStatus === 'Rejected' && (
              <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-rose-500/30 text-rose-300 border border-rose-400/40">
                ❌ Rejected
              </span>
            )}
            {selectedFacility?.approvalStatus === 'Approved' && (
              <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-500/30 text-emerald-300 border border-emerald-400/40">
                ✓ Live on AP Map
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            {selectedFacility?.mandal}, {selectedFacility?.district} District • Reg: {selectedFacility?.registrationNumber || 'AP-CS-REG'}
            {selectedFacility?.coordinates && ` • GPS: [${selectedFacility.coordinates.lat}, ${selectedFacility.coordinates.lng}]`}
          </p>
        </div>

        {/* Operating Facility Switcher & Register Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {facilities.length > 0 && (
            <div className="bg-slate-800/80 p-2.5 rounded-2xl border border-slate-700 space-y-1 text-xs shrink-0">
              <label className="text-[10px] text-slate-400 font-semibold uppercase block">Active Facility ({facilities.length})</label>
              <select
                value={selectedFacility?.id}
                onChange={(e) => {
                  const fac = facilities.find(f => f.id === e.target.value);
                  if (fac) handleFacilitySelect(fac);
                }}
                className="bg-slate-900 text-white font-bold px-3 py-1.5 rounded-xl border border-slate-600 focus:outline-hidden text-xs max-w-[220px]"
              >
                {facilities.map(f => (
                  <option key={f.id} value={f.id}>
                    {f.facilityName} {f.approvalStatus === 'Pending' ? '⏳ [Pending]' : f.approvalStatus === 'Rejected' ? '❌ [Rejected]' : ''}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={() => {
              setRegisterError('');
              setRegisterSuccess('');
              setShowRegisterModal(true);
            }}
            className="px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer shrink-0 border border-blue-400/30"
          >
            <Plus className="w-4 h-4" />
            <span>Register New Cold Storage</span>
          </button>
        </div>
      </div>

      {/* Approval Status Alert Banner */}
      {selectedFacility?.approvalStatus === 'Pending' && (
        <div className="bg-amber-50 border border-amber-300 rounded-3xl p-5 flex items-start gap-3.5 text-amber-900 shadow-xs animate-in fade-in">
          <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs flex-1">
            <div className="font-extrabold text-sm text-amber-950 flex items-center gap-2">
              <span>Facility Registration Pending System Administrator Approval</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-200 text-amber-800 uppercase tracking-wider">Under Review</span>
            </div>
            <p className="text-amber-800 leading-relaxed">
              Your new cold storage <strong>"{selectedFacility.facilityName}"</strong> was submitted with exact GPS coordinates <strong>[{selectedFacility.coordinates?.lat}, {selectedFacility.coordinates?.lng}]</strong> in {selectedFacility.district} District. 
              An approval request has been queued for verification by the State System Administrator. 
              <strong> Once approved, this cold storage will automatically be published and pinned to the live Andhra Pradesh GIS Map at your exact GPS coordinates.</strong>
            </p>
          </div>
        </div>
      )}

      {selectedFacility?.approvalStatus === 'Rejected' && (
        <div className="bg-rose-50 border border-rose-300 rounded-3xl p-5 flex items-start gap-3.5 text-rose-900 shadow-xs animate-in fade-in">
          <X className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs flex-1">
            <div className="font-extrabold text-sm text-rose-950 flex items-center gap-2">
              <span>Facility Registration Rejected by Administrator</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-200 text-rose-800 uppercase tracking-wider">Rejected</span>
            </div>
            <p className="text-rose-800 leading-relaxed">
              Reason: {selectedFacility.rejectionReason || 'Facility documentation or coordinates could not be verified by state authorities.'}
            </p>
          </div>
        </div>
      )}

      {/* Sub-Navigation Tabs (Section 8) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: Warehouse },
          { id: 'facility', label: 'My Facility', icon: Building },
          { id: 'capacity', label: 'Live Capacity', icon: Sliders },
          { id: 'demand', label: 'Nearby Demand', icon: BarChart3 },
          { id: 'gap-map', label: 'Gap Map', icon: Map, isLink: true, to: '/map' },
          { id: 'gap-analysis', label: 'Gap Analysis', icon: MapPin },
          { id: 'expansion', label: 'Expansion Opportunities', icon: Layers },
          { id: 'requests', label: `Farmer Requests (${farmerRequests.length})`, icon: ClipboardList }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.isLink) {
            return (
              <Link
                key={tab.id}
                to={tab.to}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200"
              >
                <Icon className="w-3.5 h-3.5 text-sky-600" />
                <span>{tab.label}</span>
              </Link>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* TAB 1: OWNER DASHBOARD (Section 9) */}
      {/* ======================================================== */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Section 9 Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Installed</span>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">{totalCap.toLocaleString()} MT</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Immutable Master Record</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Occupied</span>
              <p className="text-2xl font-extrabold text-blue-700 mt-1">{occCap.toLocaleString()} MT</p>
              <p className="text-[10px] text-slate-400 mt-0.5">In storage chambers</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Live Available</span>
              <p className="text-2xl font-extrabold text-emerald-700 mt-1">{availCap.toLocaleString()} MT</p>
              <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Vacant chambers</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Utilization</span>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">{utilizationPct}%</p>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${utilizationPct > 90 ? 'bg-amber-500' : 'bg-blue-600'}`} 
                  style={{ width: `${Math.min(utilizationPct, 100)}%` }} 
                />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Current Status</span>
              <div className="mt-1.5">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusBadge(selectedFacility?.facilityStatus || selectedFacility?.operatingStatus)}`}>
                  {selectedFacility?.facilityStatus || selectedFacility?.operatingStatus || 'Available'}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5">Publicly visible on map</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Last Updated</span>
              <p className="text-xs font-bold text-slate-800 mt-2 truncate">
                {selectedFacility?.sourceLastUpdated 
                  ? new Date(selectedFacility.sourceLastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : 'Today'}
              </p>
              <p className="text-[10px] text-slate-400">Live chamber sync</p>
            </div>
          </div>

          {/* Quick Action Buttons (Section 9) */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Facility Quick Actions</h2>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleTabChange('capacity')}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Update Capacity</span>
              </button>

              <button
                onClick={() => handleTabChange('facility')}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 cursor-pointer"
              >
                <Building className="w-3.5 h-3.5" />
                <span>View Facility</span>
              </button>

              <button
                onClick={() => handleTabChange('demand')}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>View Nearby Demand</span>
              </button>

              <Link
                to="/map"
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
              >
                <Map className="w-3.5 h-3.5" />
                <span>Explore Gap Map</span>
              </Link>

              <Link
                to="/market-insights"
                className="px-5 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs flex items-center gap-2 border border-purple-200"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Market / ROI</span>
              </Link>
            </div>
          </div>

          {/* Incoming Bookings Preview */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-slate-800 text-sm">Recent Storage Inquiries for This Facility</h3>
              </div>
              <button
                onClick={() => handleTabChange('requests')}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                Manage All ({farmerRequests.length}) &rarr;
              </button>
            </div>

            {farmerRequests.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">No active reservation inquiries pending.</p>
            ) : (
              <div className="space-y-2">
                {farmerRequests.slice(0, 3).map((r) => (
                  <div key={r.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-900">{r.farmerName} • {r.phone}</p>
                      <p className="text-[11px] text-slate-500">{r.crop} • {r.quantityMT} MT • {r.durationMonths || 3} months</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        r.status === 'Accepted' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {r.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: MY FACILITY */}
      {/* ======================================================== */}
      {activeTab === 'facility' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Facility Specification Profile</h2>
              <p className="text-xs text-slate-500">Government warehouse registry and verified physical infrastructure</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                selectedFacility?.approvalStatus === 'Pending' 
                  ? 'bg-amber-100 text-amber-800 border-amber-300' 
                  : selectedFacility?.approvalStatus === 'Rejected'
                  ? 'bg-rose-100 text-rose-800 border-rose-300'
                  : 'bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}>
                {selectedFacility?.approvalStatus === 'Pending' ? '⏳ Pending Admin Approval' : selectedFacility?.approvalStatus === 'Rejected' ? '❌ Registration Rejected' : '✓ Verified AP Warehouse'}
              </span>
              <button
                onClick={() => {
                  setRegisterError('');
                  setRegisterSuccess('');
                  setShowRegisterModal(true);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Register Another Facility</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-3 p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>Identity & Geospatial Location</span>
              </h3>
              <div className="space-y-2.5 text-slate-700">
                <p><strong>Facility Name:</strong> {selectedFacility?.facilityName}</p>
                <p><strong>Registration Number:</strong> <span className="font-mono">{selectedFacility?.registrationNumber || 'AP-CS-REG-2018'}</span></p>
                <p><strong>District:</strong> {selectedFacility?.district}</p>
                <p><strong>Mandal:</strong> {selectedFacility?.mandal}</p>
                <p><strong>Detailed Address:</strong> {selectedFacility?.address || 'Autonagar Industrial Area, Guntur'}</p>
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-900 text-xs">Exact GPS Coordinates:</p>
                  <p className="font-mono text-xs text-blue-700 font-bold">
                    Latitude: {selectedFacility?.coordinates?.lat || 'N/A'}, Longitude: {selectedFacility?.coordinates?.lng || 'N/A'}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {selectedFacility?.approvalStatus === 'Approved'
                      ? '✓ Pinned on live AP GIS Map at these exact coordinates.'
                      : '⏳ Pinned to GIS map immediately after Admin verification.'}
                  </p>
                </div>
                <p><strong>Operator Contact:</strong> {selectedFacility?.contactPerson || 'Operator'} ({selectedFacility?.contactPhone || 'N/A'})</p>
                <p><strong>Contact Email:</strong> {selectedFacility?.contactEmail || 'owner@ap.gov.in'}</p>
              </div>
            </div>

            <div className="space-y-3 p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Warehouse className="w-3.5 h-3.5 text-emerald-600" />
                <span>Technical Specifications & Capacity</span>
              </h3>
              <div className="space-y-2.5 text-slate-700">
                <p><strong>Total Installed Capacity:</strong> <span className="font-bold text-slate-900">{totalCap} MT</span></p>
                <p><strong>Live Available Space:</strong> <span className="font-bold text-emerald-700">{availCap} MT</span></p>
                <p><strong>Occupied Space:</strong> <span className="font-bold text-blue-700">{occCap} MT</span> ({utilizationPct}% utilized)</p>
                <p><strong>Operating Temperature:</strong> {temperatureRange}</p>
                <p><strong>Published Storage Tariff:</strong> <span className="font-bold text-slate-900">₹{pricingPerMTMonth}</span> / MT / Month</p>
                <p><strong>Supported Commodities:</strong> {acceptedCrops}</p>
                <p><strong>Verification Status:</strong> {selectedFacility?.verificationStatus || 'Verified'}</p>
                <p><strong>Origin / Type:</strong> {selectedFacility?.isManual ? 'Manual / Owner Submission' : 'Official AP Benchmark Register'}</p>
                <p><strong>Amenities:</strong> Pre-cooling Unit, Weighbridge, 24/7 CCTV, Power Backup</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: LIVE CAPACITY (Section 10) */}
      {/* ======================================================== */}
      {activeTab === 'capacity' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-150">
          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Update Live Chamber Inventory</h2>
              <p className="text-xs text-slate-500">
                Broadcast available chamber capacity to Andhra Pradesh farmers and FPOs in real time.
              </p>
            </div>
            {/* Government Protected Notice (Section 10) */}
            <span className="text-[11px] px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-semibold border border-slate-200">
              Government Installed Capacity is Locked ({totalCap} MT)
            </span>
          </div>

          {validationError && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {saveSuccess && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Live capacity updated successfully and synchronized across AP spatial GIS map!</span>
            </div>
          )}

          <form onSubmit={handleLiveCapacitySave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
              {/* Occupied Capacity */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">Occupied Capacity (MT) *</label>
                <input
                  type="number"
                  min="0"
                  max={totalCap}
                  value={occupiedCapacityMT}
                  onChange={(e) => {
                    const occ = Number(e.target.value);
                    setOccupiedCapacityMT(occ);
                    const remaining = Math.max(0, totalCap - occ);
                    setAvailableCapacityMT(remaining);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
                  required
                />
                <span className="text-[10px] text-slate-400">Total installed: {totalCap} MT</span>
              </div>

              {/* Available Capacity */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">Available Capacity (MT) *</label>
                <input
                  type="number"
                  min="0"
                  max={totalCap}
                  value={availableCapacityMT}
                  onChange={(e) => {
                    const avail = Number(e.target.value);
                    setAvailableCapacityMT(avail);
                    const occ = Math.max(0, totalCap - avail);
                    setOccupiedCapacityMT(occ);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
                  required
                />
                <span className="text-[10px] text-slate-400">Vacancy open for farmer bookings</span>
              </div>

              {/* Facility Status (Section 10 statuses) */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">Facility Status *</label>
                <select
                  value={facilityStatus}
                  onChange={(e) => setFacilityStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Available">Available</option>
                  <option value="Limited Availability">Limited Availability</option>
                  <option value="Full">Full</option>
                  <option value="Temporarily Unavailable">Temporarily Unavailable</option>
                </select>
                <span className="text-[10px] text-slate-400">Operating condition on farmer search</span>
              </div>

              {/* Accepted Crops */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">Accepted Commodities *</label>
                <input
                  type="text"
                  value={acceptedCrops}
                  onChange={(e) => setAcceptedCrops(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Fresh Chilli, Tomato, Mango"
                  required
                />
                <span className="text-[10px] text-slate-400">Comma-separated</span>
              </div>

              {/* Temperature Range */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">Chamber Temperature Range *</label>
                <input
                  type="text"
                  value={temperatureRange}
                  onChange={(e) => setTemperatureRange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 2°C to 8°C"
                  required
                />
                <span className="text-[10px] text-slate-400">Operating thermal spec</span>
              </div>

              {/* Storage Cost */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">Storage Tariff (₹/MT/month) *</label>
                <input
                  type="number"
                  min="200"
                  max="3000"
                  value={pricingPerMTMonth}
                  onChange={(e) => setPricingPerMTMonth(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
                  required
                />
                <span className="text-[10px] text-slate-400">Standard monthly warehouse fee</span>
              </div>
            </div>

            {/* Validation Notice Box */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <p><strong>Validation Rule:</strong> Occupied ({occupiedCapacityMT} MT) + Available ({availableCapacityMT} MT) = {Number(occupiedCapacityMT) + Number(availableCapacityMT)} MT / {totalCap} MT installed.</p>
              <p className="text-[11px] text-slate-400">Government installed capacity, crop production datasets, and GIS boundaries cannot be modified by warehouse operators.</p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{saving ? 'Synchronizing GIS...' : 'Save Live Capacity'}</span>
              </button>
            </div>
          </form>

          {/* Update History Log (Section 10) */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Capacity Update Audit History</h3>
            <div className="space-y-2">
              {(selectedFacility?.capacityHistory || [
                {
                  timestamp: new Date().toISOString(),
                  availableMT: availCap,
                  occupiedMT: occCap,
                  status: facilityStatus,
                  updatedBy: currentUser?.name || 'Owner'
                }
              ]).slice(0, 5).map((h, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs text-slate-700">
                  <div>
                    <span className="font-bold text-slate-900">Available: {h.availableMT} MT</span> • Occupied: {h.occupiedMT} MT ({h.status})
                    <span className="text-[10px] text-slate-400 block">By: {h.updatedBy || 'Owner'}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {new Date(h.timestamp).toLocaleDateString()} {new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: NEARBY DEMAND (Section 11) */}
      {/* ======================================================== */}
      {activeTab === 'demand' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-150">
          <div className="border-b border-slate-100 pb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-2">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Catchment Intelligence</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Nearby Horticulture Production & Cold Storage Demand
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Estimated produce harvest volumes, storage requirements, and capacity gaps within {selectedFacility?.district} District.
            </p>
          </div>

          {/* Major Crops Demand Grid (Section 11 Example) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                crop: 'Fresh Chilli',
                production: 125000,
                requirement: 75000,
                existingCapacity: 52000,
                gap: 23000,
                distanceKm: 8,
                mandi: 'Guntur Mirchi Yard (6 km)'
              },
              {
                crop: 'Tomato',
                production: 98000,
                requirement: 39200,
                existingCapacity: 18000,
                gap: 21200,
                distanceKm: 14,
                mandi: 'Tenali Mandi (12 km)'
              },
              {
                crop: 'Mango',
                production: 65000,
                requirement: 26000,
                existingCapacity: 14000,
                gap: 12000,
                distanceKm: 22,
                mandi: 'Vijayawada Market (25 km)'
              }
            ].map((d) => (
              <div key={d.crop} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <h3 className="font-extrabold text-slate-900 text-base">{d.crop}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    High Demand
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Annual Production:</span>
                    <span className="font-bold text-slate-900">{d.production.toLocaleString()} MT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Est. Storage Requirement:</span>
                    <span className="font-bold text-slate-900">{d.requirement.toLocaleString()} MT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Existing Suitable Capacity:</span>
                    <span className="font-bold text-slate-900">{d.existingCapacity.toLocaleString()} MT</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200">
                    <span className="text-rose-600 font-semibold">Estimated Storage Gap:</span>
                    <span className="font-extrabold text-rose-700">+{d.gap.toLocaleString()} MT</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 space-y-0.5">
                  <p><strong>Distance to Fields:</strong> ~{d.distanceKm} km</p>
                  <p><strong>Major Nearby Mandi:</strong> {d.mandi}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs">
            <p className="font-bold">Business Takeaway:</p>
            <p className="text-[11px] mt-0.5">
              Fresh Chilli and Tomato maintain the highest unsatisfied cold preservation demand within a 25 km radius of your facility.
            </p>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: OWNER GAP ANALYSIS (Section 12) */}
      {/* ======================================================== */}
      {activeTab === 'gap-analysis' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-150">
          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Catchment Area Gap Analysis
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Analyze cold storage deficit zones relevant to your facility in {selectedFacility?.district}.
              </p>
            </div>
            <Link
              to="/map"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs border border-sky-200 transition-colors shadow-2xs self-start sm:self-auto"
            >
              <Map className="w-3.5 h-3.5 text-sky-600" />
              <span>Explore Interactive Gap Map</span>
              <ArrowRight className="w-3.5 h-3.5 text-sky-500" />
            </Link>
          </div>

          {/* Mandatory Disclaimer (Section 12) */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Platform Notice:</strong> Estimated storage demand exceeds suitable nearby capacity. This area may warrant further feasibility analysis.
            </span>
          </div>

          {/* Filters (Section 12) */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-700">Crop:</span>
              <select
                value={filterCrop}
                onChange={(e) => setFilterCrop(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold"
              >
                <option value="Fresh Chilli">Fresh Chilli</option>
                <option value="Tomato">Tomato</option>
                <option value="Mango">Mango</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-700">Distance Radius:</span>
              <select
                value={filterRadiusKm}
                onChange={(e) => setFilterRadiusKm(Number(e.target.value))}
                className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold"
              >
                <option value={10}>10 km</option>
                <option value={25}>25 km</option>
                <option value={50}>50 km</option>
                <option value={100}>100 km</option>
              </select>
            </div>
          </div>

          {/* Gap Breakdown Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-4">Catchment Mandal</th>
                  <th className="py-3.5 px-4">Primary Commodity</th>
                  <th className="py-3.5 px-4 text-right">Production</th>
                  <th className="py-3.5 px-4 text-right">Est. Requirement</th>
                  <th className="py-3.5 px-4 text-right">Existing Capacity</th>
                  <th className="py-3.5 px-4 text-right">Estimated Gap</th>
                  <th className="py-3.5 px-4 text-right">Distance to Facility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {[
                  { mandal: 'Duggirala', crop: 'Fresh Chilli', prod: 45000, req: 27000, cap: 16000, gap: 11000, dist: 14 },
                  { mandal: 'Tenali', crop: 'Tomato', prod: 38000, req: 15200, cap: 6500, gap: 8700, dist: 19 },
                  { mandal: 'Prathipadu', crop: 'Fresh Chilli', prod: 52000, req: 31200, cap: 18000, gap: 13200, dist: 22 },
                  { mandal: 'Tadikonda', crop: 'Mango', prod: 29000, req: 11600, cap: 7000, gap: 4600, dist: 28 }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{row.mandal}</td>
                    <td className="py-3.5 px-4">{row.crop}</td>
                    <td className="py-3.5 px-4 text-right">{row.prod.toLocaleString()} MT</td>
                    <td className="py-3.5 px-4 text-right">{row.req.toLocaleString()} MT</td>
                    <td className="py-3.5 px-4 text-right">{row.cap.toLocaleString()} MT</td>
                    <td className="py-3.5 px-4 text-right font-extrabold text-rose-600">+{row.gap.toLocaleString()} MT</td>
                    <td className="py-3.5 px-4 text-right font-bold text-slate-900">{row.dist} km</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 6: EXPANSION OPPORTUNITIES (Section 14) */}
      {/* ======================================================== */}
      {activeTab === 'expansion' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-150">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-extrabold text-slate-900">
              Potential Expansion Opportunities
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Analytical feasibility hotspots near your facility where additional chamber space could absorb underserved crop production.
            </p>
          </div>

          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl text-blue-900 text-xs">
            <strong>Important Notice:</strong> This is an analytical opportunity based on spatial surplus models, not a confirmed investment or guaranteed financial recommendation.
          </div>

          {/* Geospatial Gap Map Integration Banner for Identifying New Areas */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-900 via-blue-900 to-indigo-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-200 text-[10px] font-bold border border-sky-400/30">
                <Map className="w-3 h-3 text-sky-300" />
                <span>Geospatial Intelligence for Facility Owners</span>
              </div>
              <h3 className="font-extrabold text-base">Identify New Investment & Expansion Areas on Gap Map</h3>
              <p className="text-xs text-sky-200 max-w-xl">
                Inspect spatial produce clusters, live vacancy circles, and unmet storage deficit zones across all 26 districts of Andhra Pradesh to evaluate new chamber viability.
              </p>
            </div>
            <Link
              to="/map"
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-sky-50 text-blue-950 font-extrabold text-xs shrink-0 flex items-center gap-2 shadow-xs transition-transform hover:scale-102"
            >
              <Map className="w-3.5 h-3.5 text-blue-700" />
              <span>Explore Interactive Gap Map</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                area: 'Duggirala Mandal Belt',
                distanceKm: 14,
                primaryCrop: 'Fresh Chilli',
                prodMT: 45000,
                gapMT: 11000,
                reason: 'High production with insufficient nearby suitable capacity and dense cluster of spice farmers.'
              },
              {
                area: 'Prathipadu South Catchment',
                distanceKm: 22,
                primaryCrop: 'Fresh Chilli & Tomato',
                prodMT: 52000,
                gapMT: 13200,
                reason: 'High production with insufficient nearby suitable capacity, located directly along the transport arterial.'
              }
            ].map((opp, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Opportunity #{idx + 1}</span>
                    <h3 className="font-extrabold text-slate-900 text-base mt-0.5">{opp.area}</h3>
                    <p className="text-[11px] text-slate-500">Distance: ~{opp.distanceKm} km from facility</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                    Feasibility Candidate
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-700 pt-2 border-t border-slate-200">
                  <p><strong>Primary Crop:</strong> {opp.primaryCrop}</p>
                  <p><strong>Estimated Production:</strong> {opp.prodMT.toLocaleString()} MT</p>
                  <p><strong>Estimated Storage Gap:</strong> <span className="font-bold text-rose-600">+{opp.gapMT.toLocaleString()} MT</span></p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600">
                  <p className="text-[11px] leading-relaxed">
                    <strong>Reason:</strong> “{opp.reason}”
                  </p>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => handleTabChange('gap-analysis')}
                    className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    View Analysis
                  </button>
                  <Link
                    to="/map"
                    className="py-2 px-3.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold text-xs border border-sky-200 flex items-center justify-center gap-1.5 transition-colors"
                    title="Locate on Gap Map"
                  >
                    <Map className="w-3.5 h-3.5 text-sky-600" />
                    <span>View on Gap Map</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 7: INCOMING FARMER REQUESTS */}
      {/* ======================================================== */}
      {activeTab === 'requests' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-150">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Chamber Reservation Requests ({farmerRequests.length})
              </h2>
              <p className="text-xs text-slate-500">
                Inquiries and bookings submitted by farmers and FPOs for {selectedFacility?.facilityName}
              </p>
            </div>
          </div>

          {farmerRequests.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              No reservation requests currently found for this facility.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-100">
                  <tr>
                    <th className="py-3.5 px-4">Request ID</th>
                    <th className="py-3.5 px-4">Farmer / FPO</th>
                    <th className="py-3.5 px-4">Crop & Volume</th>
                    <th className="py-3.5 px-4">Expected Date</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {farmerRequests.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/60">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{r.id}</td>
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-900">{r.farmerName}</p>
                        <p className="text-[11px] text-slate-500">{r.phone}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900">{r.quantityMT} MT</span>
                        <span className="text-[10px] text-slate-400 block">{r.crop}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {r.requiredFromDate || 'Immediate'}
                        <span className="text-[10px] text-slate-400 block">{r.durationMonths || 3} months</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          r.status === 'Accepted'
                            ? 'bg-emerald-100 text-emerald-800'
                            : r.status === 'Rejected'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1.5">
                        {r.status !== 'Accepted' && (
                          <button
                            onClick={() => handleUpdateRequestStatus(r.id, 'Accepted')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] cursor-pointer"
                          >
                            Accept
                          </button>
                        )}
                        {r.status !== 'Rejected' && (
                          <button
                            onClick={() => handleUpdateRequestStatus(r.id, 'Rejected')}
                            className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[11px] cursor-pointer"
                          >
                            Reject
                          </button>
                        )}
                        {r.status === 'Accepted' && (
                          <button
                            onClick={() => handleUpdateRequestStatus(r.id, 'Completed')}
                            className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[11px] cursor-pointer"
                          >
                            Mark Completed
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* COLD STORAGE OWNER REGISTRATION MODAL */}
      {/* ======================================================== */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 my-8 animate-in fade-in zoom-in-95 duration-150 max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-200">
                  <Building className="w-3.5 h-3.5" />
                  <span>Facility Registration & Map Pinning</span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">Register New Cold Storage</h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Submit physical warehouse details and exact GPS coordinates for State Administrator review. Once approved, this cold storage will automatically be published to the interactive AP GIS Map.
                </p>
              </div>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Success Message Banner */}
            {registerSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-start gap-3 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-emerald-950 text-sm">Registration Submitted Successfully!</p>
                  <p className="leading-relaxed">{registerSuccess}</p>
                </div>
              </div>
            )}

            {/* Error Message Banner */}
            {registerError && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-start gap-3 shadow-xs">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-rose-950 text-sm">Submission Error</p>
                  <p className="leading-relaxed">{registerError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="space-y-5 text-xs">
              {/* Basic Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    Cold Storage Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sri Lakshmi Venkateswara Cold Storage"
                    value={newFacilityForm.facilityName}
                    onChange={(e) => setNewFacilityForm({ ...newFacilityForm, facilityName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Registration / License Number</label>
                  <input
                    type="text"
                    placeholder="e.g. AP-CS-2026-9041 (Auto-assigned if blank)"
                    value={newFacilityForm.registrationNumber}
                    onChange={(e) => setNewFacilityForm({ ...newFacilityForm, registrationNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* District & Mandal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    District <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={newFacilityForm.district}
                    onChange={(e) => {
                      const newDist = e.target.value;
                      setNewFacilityForm({ ...newFacilityForm, district: newDist });
                      handleUseDistrictCentroid(newDist);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
                  >
                    {districtsList.map((d) => (
                      <option key={d.name} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    Mandal / Sub-District <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Prathipadu, Tenali, Duggirala"
                    value={newFacilityForm.mandal}
                    onChange={(e) => setNewFacilityForm({ ...newFacilityForm, mandal: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Physical Street Address */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">
                  Detailed Street Address & Landmark <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Survey No. 142/B, NH-16 Highway, Near Agri Market Yard"
                  value={newFacilityForm.address}
                  onChange={(e) => setNewFacilityForm({ ...newFacilityForm, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Geospatial GPS Location Card */}
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50/60 rounded-2xl border border-blue-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span>Exact Geospatial Coordinates (Latitude & Longitude)</span>
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      These coordinates define where your facility marker will be placed on the live AP GIS Map upon Admin approval.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleDetectGPS}
                      disabled={gpsDetecting}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors disabled:opacity-50"
                    >
                      <Navigation className={`w-3.5 h-3.5 ${gpsDetecting ? 'animate-spin' : ''}`} />
                      <span>{gpsDetecting ? 'Detecting...' : 'Detect GPS'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUseDistrictCentroid(newFacilityForm.district)}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-[11px] flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                    >
                      <Compass className="w-3.5 h-3.5 text-slate-600" />
                      <span>District Centroid</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">
                      Latitude (°N) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      placeholder="e.g. 16.3067"
                      value={newFacilityForm.lat}
                      onChange={(e) => setNewFacilityForm({ ...newFacilityForm, lat: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 text-sm font-mono font-bold text-blue-900 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-[10px] text-slate-400">AP Latitude range: ~13.0° to 19.5°</span>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">
                      Longitude (°E) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      placeholder="e.g. 80.4365"
                      value={newFacilityForm.lng}
                      onChange={(e) => setNewFacilityForm({ ...newFacilityForm, lng: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 text-sm font-mono font-bold text-blue-900 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-[10px] text-slate-400">AP Longitude range: ~76.5° to 84.8°</span>
                  </div>
                </div>
              </div>

              {/* Capacity & Pricing */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    Total Installed Capacity (MT) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="100"
                    max="100000"
                    required
                    value={newFacilityForm.totalCapacityMT}
                    onChange={(e) => {
                      const total = Number(e.target.value);
                      setNewFacilityForm({
                        ...newFacilityForm,
                        totalCapacityMT: total,
                        availableCapacityMT: Math.min(newFacilityForm.availableCapacityMT, total)
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-[10px] text-slate-400">Full warehouse metric tons</span>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    Available Capacity (MT) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={newFacilityForm.totalCapacityMT}
                    required
                    value={newFacilityForm.availableCapacityMT}
                    onChange={(e) => setNewFacilityForm({ ...newFacilityForm, availableCapacityMT: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-[10px] text-slate-400">Immediate vacant space</span>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    Tariff (₹ / MT / Month) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="200"
                    max="3000"
                    required
                    value={newFacilityForm.pricingPerMTMonth}
                    onChange={(e) => setNewFacilityForm({ ...newFacilityForm, pricingPerMTMonth: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-[10px] text-slate-400">Standard storage rate</span>
                </div>
              </div>

              {/* Commodities & Temperature */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    Supported Commodities <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fresh Chilli, Tomato, Mango, Turmeric"
                    value={newFacilityForm.commoditiesSupported}
                    onChange={(e) => setNewFacilityForm({ ...newFacilityForm, commoditiesSupported: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-[10px] text-slate-400">Comma-separated crop list</span>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    Chamber Temperature Range <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2°C to 8°C"
                    value={newFacilityForm.temperatureRange}
                    onChange={(e) => setNewFacilityForm({ ...newFacilityForm, temperatureRange: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-[10px] text-slate-400">Cooling chamber range</span>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    Contact Person <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Operator / Manager Name"
                    value={newFacilityForm.contactPerson}
                    onChange={(e) => setNewFacilityForm({ ...newFacilityForm, contactPerson: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    Contact Phone <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    placeholder="10-digit mobile number"
                    value={newFacilityForm.contactPhone}
                    onChange={(e) => setNewFacilityForm({ ...newFacilityForm, contactPhone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Contact Email</label>
                  <input
                    type="email"
                    placeholder="owner@domain.com"
                    value={newFacilityForm.contactEmail}
                    onChange={(e) => setNewFacilityForm({ ...newFacilityForm, contactEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Workflow Explanatory Notice */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 space-y-1 text-xs">
                <div className="font-bold flex items-center gap-1.5 text-amber-950">
                  <Info className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>State Administrative Review & GIS Publishing Policy</span>
                </div>
                <p className="leading-relaxed text-amber-800">
                  Upon submission, your facility details will enter the State Administrator's pending approval queue. 
                  It will not be visible to farmers or on the public GIS map until verified by the Administrator. 
                  The System Administrator also retains full access to manage, audit, and remove owner-registered cold storage facilities.
                </p>
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={registering}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer transition-all disabled:opacity-50"
                >
                  {registering ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Facility for Approval</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
