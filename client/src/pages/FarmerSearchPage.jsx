import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Warehouse, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Truck, 
  Thermometer, 
  IndianRupee, 
  ShieldCheck, 
  Info,
  Filter,
  Layers,
  Phone,
  AlertCircle
} from 'lucide-react';
import { recommendationService } from '../services/recommendationService';
import { gisService } from '../services/gisService';
import { cropProductionService } from '../services/cropProductionService';
import { fetchApi } from '../services/api';
import DataBadge from '../components/DataBadge';

export default function FarmerSearchPage() {
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('Guntur');
  const [mandals, setMandals] = useState([]);
  const [selectedMandal, setSelectedMandal] = useState('');
  const [villages, setVillages] = useState([]);
  const [selectedVillage, setSelectedVillage] = useState('');
  
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState('Fresh Chilli');
  const [quantityMT, setQuantityMT] = useState(15);
  const [durationMonths, setDurationMonths] = useState(3);
  
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  // Booking Modal State
  const [bookingModalFacility, setBookingModalFacility] = useState(null);
  const [bookingFormData, setBookingFormData] = useState({
    farmerName: '',
    phone: '',
    notes: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Load districts and crops on mount
  useEffect(() => {
    async function loadInitialData() {
      try {
        const [distList, cropList] = await Promise.all([
          gisService.getDistricts(),
          cropProductionService.getHorticultureCrops()
        ]);
        setDistricts(distList);
        setCrops(cropList);

        // Load mandals for default district Guntur
        const mandalList = await gisService.getMandals('Guntur');
        setMandals(mandalList);
        if (mandalList.length > 0) {
          setSelectedMandal(mandalList[0].name);
          setVillages(mandalList[0].villages || []);
          if (mandalList[0].villages && mandalList[0].villages.length > 0) {
            setSelectedVillage(mandalList[0].villages[0]);
          }
        }
      } catch (err) {
        console.error('Failed to load initial GIS data:', err);
      }
    }
    loadInitialData();
  }, []);

  // When district changes, load its mandals
  const handleDistrictChange = async (newDistrict) => {
    setSelectedDistrict(newDistrict);
    try {
      const mandalList = await gisService.getMandals(newDistrict);
      setMandals(mandalList);
      if (mandalList.length > 0) {
        setSelectedMandal(mandalList[0].name);
        const vList = mandalList[0].villages || [];
        setVillages(vList);
        setSelectedVillage(vList[0] || '');
      } else {
        setSelectedMandal('');
        setVillages([]);
        setSelectedVillage('');
      }
    } catch (err) {
      console.error('Error loading mandals:', err);
    }
  };

  // When mandal changes, load villages
  const handleMandalChange = (newMandal) => {
    setSelectedMandal(newMandal);
    const mObj = mandals.find(m => m.name === newMandal);
    if (mObj && mObj.villages) {
      setVillages(mObj.villages);
      setSelectedVillage(mObj.villages[0] || '');
    } else {
      setVillages([]);
      setSelectedVillage('');
    }
  };

  // Run initial search once ready
  useEffect(() => {
    if (selectedDistrict) {
      handleSearch();
    }
  }, [selectedDistrict]);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await recommendationService.matchColdStorages({
        district: selectedDistrict,
        mandal: selectedMandal,
        village: selectedVillage,
        crop: selectedCrop,
        quantityMT: Number(quantityMT) || 10,
        maxDistanceKm: 180
      });
      setResults(data);
    } catch (err) {
      setError(err.message || 'Failed to match cold storages');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenBooking = (facility) => {
    const user = JSON.parse(localStorage.getItem('ap_user') || '{}');
    setBookingModalFacility(facility);
    setBookingFormData({
      farmerName: user.name || 'Srinivasa Rao',
      phone: user.phone || '+91 94401 23456',
      notes: ''
    });
    setBookingSuccess(false);
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    try {
      await fetchApi('/farmer-requests', {
        method: 'POST',
        body: JSON.stringify({
          farmerName: bookingFormData.farmerName,
          phone: bookingFormData.phone,
          district: selectedDistrict,
          mandal: selectedMandal,
          village: selectedVillage,
          crop: selectedCrop,
          quantityMT: Number(quantityMT),
          durationMonths: Number(durationMonths),
          targetColdStorageId: bookingModalFacility.id,
          targetColdStorageName: bookingModalFacility.facilityName,
          estimatedMonthlyCostINR: bookingModalFacility.monthlyStorageCostINR
        })
      });
      setBookingSuccess(true);
    } catch (err) {
      alert(`Booking failed: ${err.message}`);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider border border-emerald-400/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Farmer & FPO Matchmaker • Andhra Pradesh
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Find Nearby Cold Storage Capacity
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Locate verified cold storage facilities with live available capacity tailored for your crop's temperature needs. View accurate road distance, transit costs, and direct storage rates.
          </p>
        </div>
      </div>

      {/* Main Search Panel: Strict AP Hierarchy */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-emerald-700" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Location & Crop Specifications
            </h2>
          </div>
          {/* Fixed Geographic Scope Callout */}
          <div className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium flex items-center gap-1.5 border border-slate-200">
            <span>State:</span>
            <strong className="text-emerald-700 font-semibold">Andhra Pradesh (Fixed)</strong>
          </div>
        </div>

        <form onSubmit={handleSearch} className="space-y-6">
          {/* Hierarchy Row: State (fixed) -> District -> Mandal -> Village */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. State (Fixed Display) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                1. State
              </label>
              <div className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold flex items-center justify-between">
                <span>Andhra Pradesh</span>
                <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                  26 Districts
                </span>
              </div>
            </div>

            {/* 2. District Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                2. District <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                {districts.map((d) => (
                  <option key={d.name} value={d.name}>
                    {d.name} ({d.code})
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Mandal Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                3. Mandal
              </label>
              <select
                value={selectedMandal}
                onChange={(e) => handleMandalChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                {mandals.map((m) => (
                  <option key={m.name} value={m.name}>
                    {m.name}
                  </option>
                ))}
                {mandals.length === 0 && <option value="">Central / HQ</option>}
              </select>
            </div>

            {/* 4. Village / Location Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                4. Village / Cluster
              </label>
              <select
                value={selectedVillage}
                onChange={(e) => setSelectedVillage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                {villages.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
                {villages.length === 0 && <option value="">Local Farm Catchment</option>}
              </select>
            </div>
          </div>

          {/* Commodity & Volume Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
            {/* Crop */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Horticulture Crop <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                {crops.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name} ({c.category} • {c.tempRange})
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity MT */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Quantity to Store (Metric Tonnes)
              </label>
              <input
                type="number"
                min="1"
                max="5000"
                value={quantityMT}
                onChange={(e) => setQuantityMT(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            {/* Storage Duration */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Duration (Months)
              </label>
              <select
                value={durationMonths}
                onChange={(e) => setDurationMonths(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                <option value="1">1 Month (Immediate buffer)</option>
                <option value="3">3 Months (Standard seasonal)</option>
                <option value="6">6 Months (Off-season realization)</option>
                <option value="9">9 Months (Long-term preservation)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-slate-500">
              Matches facilities across AP using geodesic Haversine distance & live chamber capacity.
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all hover:scale-102"
            >
              <Search className="w-4 h-4" />
              {loading ? 'Searching...' : 'Find Matching Cold Storages'}
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Matching Facilities in Andhra Pradesh
            </h2>
            <p className="text-xs text-slate-500">
              Sorted by proximity, live capacity availability for <strong className="text-slate-800">{selectedCrop}</strong>, and overall match score.
            </p>
          </div>
          {results && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Found {results.resultsCount} Verified Facilities
            </span>
          )}
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {loading && (
          <div className="p-12 text-center text-slate-500 space-y-3">
            <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-medium">Computing distance matrix & chamber compatibility...</p>
          </div>
        )}

        {!loading && results && results.recommendations.length === 0 && (
          <div className="p-10 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
            <Warehouse className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No Facilities with Available Capacity Found Nearby</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              No cold storage within 180 km currently has {quantityMT} MT available for {selectedCrop}.
              Check our Potential Locations page to see if this area qualifies for new infrastructure development!
            </p>
            <Link
              to="/potential-locations"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline pt-2"
            >
              View Infrastructure Deficit Hotspots <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Results Cards List */}
        {!loading && results && (
          <div className="grid grid-cols-1 gap-5">
            {results.recommendations.map((storage) => {
              const totalCap = storage.totalCapacityMT;
              const availCap = storage.availableCapacityMT;
              const occupiedPct = Math.round(((totalCap - availCap) / totalCap) * 100);

              return (
                <div
                  key={storage.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col lg:flex-row justify-between gap-6"
                >
                  {/* Left Column: Details */}
                  <div className="space-y-4 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {storage.badge && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-xs">
                          {storage.badge}
                        </span>
                      )}
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        Match Score: <strong className="text-emerald-700 font-bold">{storage.matchScore}%</strong>
                      </span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                        storage.operatingStatus === 'Active' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {storage.operatingStatus}
                      </span>
                    </div>

                    <div>
                      <Link
                        to={`/cold-storage/${storage.id}`}
                        className="text-lg font-bold text-slate-900 hover:text-emerald-700 transition-colors"
                      >
                        {storage.facilityName}
                      </Link>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{storage.address} ({storage.district} Dist)</span>
                      </p>
                    </div>

                    {/* Capacity and Specs Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                      <div>
                        <p className="text-slate-400 text-[11px]">Road Distance</p>
                        <p className="font-bold text-slate-900 text-sm mt-0.5">{storage.distanceKm} km</p>
                        <p className="text-[10px] text-slate-400">from {selectedMandal || selectedDistrict}</p>
                      </div>

                      <div>
                        <p className="text-slate-400 text-[11px]">Live Available</p>
                        <p className="font-bold text-emerald-700 text-sm mt-0.5">{storage.availableCapacityMT} MT</p>
                        <p className="text-[10px] text-slate-400">of {storage.totalCapacityMT} MT total</p>
                      </div>

                      <div>
                        <p className="text-slate-400 text-[11px]">Storage Charge</p>
                        <p className="font-bold text-slate-900 text-sm mt-0.5">₹{storage.pricingPerMTMonth} <span className="text-[10px] font-normal text-slate-500">/MT/mo</span></p>
                        <p className="text-[10px] text-slate-400">Monthly invoice</p>
                      </div>

                      <div>
                        <p className="text-slate-400 text-[11px]">Est. Transit Cost</p>
                        <p className="font-bold text-slate-900 text-sm mt-0.5">₹{storage.estimatedTransitCostINR.toLocaleString('en-IN')}</p>
                        <p className="text-[10px] text-slate-400">for {quantityMT} MT haulage</p>
                      </div>
                    </div>

                    {/* Supported Commodities & Amenities */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                      <span className="text-slate-400 text-[11px] font-medium mr-1">Accepts:</span>
                      {storage.commoditiesSupported.map(c => (
                        <span 
                          key={c}
                          className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                            c.toLowerCase() === selectedCrop.toLowerCase()
                              ? 'bg-emerald-100 text-emerald-800 font-bold border border-emerald-300'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {c}
                        </span>
                      ))}
                    </div>

                    {/* Data Provenance Badge */}
                    <div>
                      <DataBadge
                        source={storage.source}
                        sourceType={storage.sourceType}
                        sourceLastUpdated={storage.sourceLastUpdated}
                        lastVerified={storage.lastVerified}
                      />
                    </div>
                  </div>

                  {/* Right Column: Cost Breakdown & Booking CTA */}
                  <div className="lg:w-72 shrink-0 p-5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Storage Outlay Estimate
                      </p>
                      <div className="space-y-1 text-xs text-slate-600">
                        <div className="flex justify-between">
                          <span>Monthly Rent ({quantityMT} MT):</span>
                          <span className="font-semibold text-slate-900">₹{storage.monthlyStorageCostINR.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Est. Transit ({storage.distanceKm} km):</span>
                          <span className="font-semibold text-slate-900">₹{storage.estimatedTransitCostINR.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="pt-2 border-t border-slate-200 flex justify-between text-sm">
                          <span className="font-bold text-slate-900">1st Month Total:</span>
                          <span className="font-bold text-emerald-700">₹{storage.totalFirstMonthOutlayINR.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <button
                        onClick={() => handleOpenBooking(storage)}
                        className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition-all text-center flex items-center justify-center gap-1.5"
                      >
                        <Warehouse className="w-3.5 h-3.5" />
                        Book / Inquire Space
                      </button>

                      <Link
                        to={`/cold-storage/${storage.id}`}
                        className="w-full py-2 px-4 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-all text-center block"
                      >
                        View Full Facility Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Booking / Reservation Modal */}
      {bookingModalFacility && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-100">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Reserve Cold Storage Space</h3>
                <p className="text-xs text-slate-500">{bookingModalFacility.facilityName}</p>
              </div>
              <button
                onClick={() => setBookingModalFacility(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            {bookingSuccess ? (
              <div className="p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Reservation Request Submitted!</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your storage inquiry for <strong>{quantityMT} MT of {selectedCrop}</strong> has been transmitted to facility manager <strong>{bookingModalFacility.contactPerson}</strong> ({bookingModalFacility.contactPhone}). They will contact you shortly to confirm gate check-in.
                </p>
                <button
                  onClick={() => setBookingModalFacility(null)}
                  className="mt-4 px-6 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitBooking} className="space-y-4 text-xs">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                  <p className="font-semibold text-emerald-900">Reservation Summary</p>
                  <p className="text-emerald-800">
                    {quantityMT} MT of <strong>{selectedCrop}</strong> • {durationMonths} Months Duration
                  </p>
                  <p className="text-emerald-700 text-[11px]">
                    Est. Monthly Fee: ₹{bookingModalFacility.monthlyStorageCostINR.toLocaleString('en-IN')} (₹{bookingModalFacility.pricingPerMTMonth}/MT)
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Farmer / FPO Representative Name</label>
                  <input
                    type="text"
                    required
                    value={bookingFormData.farmerName}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, farmerName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contact Phone (WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    value={bookingFormData.phone}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500"
                    placeholder="+91 98480 00000"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Special Requirements (Optional)</label>
                  <textarea
                    rows="2"
                    value={bookingFormData.notes}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, notes: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g. Require pre-cooling, need crates, harvest date Oct 5th"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setBookingModalFacility(null)}
                    className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className="px-5 py-2 rounded-lg bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 disabled:opacity-50"
                  >
                    {bookingLoading ? 'Submitting...' : 'Confirm Space Request'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
