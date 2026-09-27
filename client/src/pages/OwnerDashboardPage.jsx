import React, { useState, useEffect } from 'react';
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
  X
} from 'lucide-react';
import { coldStorageService } from '../services/coldStorageService';
import { fetchApi } from '../services/api';
import DataBadge from '../components/DataBadge';

export default function OwnerDashboardPage() {
  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [availableCapacityMT, setAvailableCapacityMT] = useState(0);
  const [temperatureZones, setTemperatureZones] = useState([]);
  const [farmerRequests, setFarmerRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const storages = await coldStorageService.getColdStorages();
        setFacilities(storages);

        if (storages.length > 0) {
          const defaultFac = storages[0]; // Sri Venkateswara Cold Storage
          setSelectedFacility(defaultFac);
          setAvailableCapacityMT(defaultFac.availableCapacityMT);
          setTemperatureZones(defaultFac.temperatureZones || []);

          // Load farmer requests for this facility
          const reqs = await fetchApi(`/farmer-requests?targetColdStorageId=${defaultFac.id}`);
          setFarmerRequests(reqs);
        }
      } catch (err) {
        console.error('Failed to load owner data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleFacilitySelect = async (fac) => {
    setSelectedFacility(fac);
    setAvailableCapacityMT(fac.availableCapacityMT);
    setTemperatureZones(fac.temperatureZones || []);
    setSaveSuccess(false);

    try {
      const reqs = await fetchApi(`/farmer-requests?targetColdStorageId=${fac.id}`);
      setFarmerRequests(reqs);
    } catch (e) {
      console.warn('Failed to load inquiries for facility:', e);
    }
  };

  const handleLiveCapacitySave = async (e) => {
    e.preventDefault();
    if (!selectedFacility) return;
    setSaving(true);
    setSaveSuccess(false);

    try {
      const updated = await coldStorageService.updateLiveCapacity(selectedFacility.id, {
        availableCapacityMT: Number(availableCapacityMT),
        temperatureZones
      });

      setSelectedFacility(updated.facility);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      alert(`Update failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleChamberUpdate = (idx, newAvail) => {
    const nextZones = [...temperatureZones];
    nextZones[idx].availableMT = Number(newAvail);
    setTemperatureZones(nextZones);

    // Sum up total available
    const totalAvail = nextZones.reduce((sum, z) => sum + Number(z.availableMT), 0);
    setAvailableCapacityMT(totalAvail);
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

  const totalCap = selectedFacility?.totalCapacityMT || 8500;
  const occupiedCap = totalCap - availableCapacityMT;
  const occupancyPct = Math.round((occupiedCap / totalCap) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-900 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-lg">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider border border-blue-400/30">
            <Building className="w-3.5 h-3.5" />
            <span>Storage Operator Control Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Live Warehouse Capacity Updater
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Update live chamber vacancies in real time. Changes are instantly published across the Andhra Pradesh spatial GIS grid.
          </p>
        </div>

        {/* Facility Selector */}
        <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 space-y-1 text-xs">
          <label className="text-[11px] text-slate-400 font-semibold uppercase block">Operating Facility</label>
          <select
            value={selectedFacility?.id}
            onChange={(e) => {
              const fac = facilities.find(f => f.id === e.target.value);
              if (fac) handleFacilitySelect(fac);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-600 text-white font-semibold text-xs focus:ring-2 focus:ring-blue-500"
          >
            {facilities.map(f => (
              <option key={f.id} value={f.id}>
                {f.facilityName} ({f.district})
              </option>
            ))}
          </select>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong>Live capacity updated successfully!</strong> The new vacancy of <strong>{availableCapacityMT} MT</strong> is now live on the AP Map and Farmer Recommendation engine.
            </span>
          </div>
          <span className="text-[11px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">
            sourceType: Owner Provided
          </span>
        </div>
      )}

      {/* Main Grid: Capacity Updater on Left, Incoming Farmer Inquiries on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Live Capacity & Chamber Management */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Facility Telemetry & Capacity Adjustment
                </h2>
                <p className="text-xs text-slate-500">
                  {selectedFacility?.facilityName} • Reg: {selectedFacility?.registrationNumber}
                </p>
              </div>

              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                selectedFacility?.operatingStatus === 'Active' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {selectedFacility?.operatingStatus}
              </span>
            </div>

            {/* Quick Live Capacity Slider / Form */}
            <form onSubmit={handleLiveCapacitySave} className="space-y-6">
              <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">
                      Live Available Capacity (MT)
                    </span>
                    <p className="text-[11px] text-blue-700">Total vacant volume available for immediate booking</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max={totalCap}
                      value={availableCapacityMT}
                      onChange={(e) => setAvailableCapacityMT(Number(e.target.value))}
                      className="w-32 px-3 py-1.5 rounded-xl border border-blue-300 bg-white text-blue-950 font-extrabold text-base text-right focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-xs font-bold text-blue-900">MT</span>
                  </div>
                </div>

                {/* Range Slider */}
                <div>
                  <input
                    type="range"
                    min="0"
                    max={totalCap}
                    step="50"
                    value={availableCapacityMT}
                    onChange={(e) => setAvailableCapacityMT(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer h-2 bg-blue-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-blue-600 pt-1 font-medium">
                    <span>0 MT (100% Full)</span>
                    <span>{(totalCap / 2).toLocaleString()} MT (50%)</span>
                    <span>{totalCap.toLocaleString()} MT (Vacant)</span>
                  </div>
                </div>

                {/* Visual Occupancy Gauge */}
                <div className="pt-2 border-t border-blue-200/80 grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 text-[11px]">Total Licensed:</span>
                    <p className="font-bold text-slate-900">{totalCap.toLocaleString()} MT</p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px]">Occupied MT:</span>
                    <p className="font-bold text-slate-900">{occupiedCap.toLocaleString()} MT ({occupancyPct}%)</p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px]">Vacant MT:</span>
                    <p className="font-bold text-emerald-700">{availableCapacityMT.toLocaleString()} MT</p>
                  </div>
                </div>
              </div>

              {/* Chamber-by-Chamber Breakdown */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Chamber Inventory Breakdown
                </h3>

                <div className="space-y-3">
                  {temperatureZones.map((zone, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div>
                          <span className="font-bold text-slate-900">{zone.name}</span>
                          <span className="text-[11px] text-blue-700 bg-blue-100 px-2 py-0.5 rounded ml-2 font-medium">
                            {zone.tempRange}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500">Free MT:</span>
                          <input
                            type="number"
                            min="0"
                            max={zone.capacityMT}
                            value={zone.availableMT}
                            onChange={(e) => handleChamberUpdate(idx, e.target.value)}
                            className="w-24 px-2 py-1 rounded-lg border border-slate-300 bg-white font-bold text-right"
                          />
                          <span className="text-slate-400">/ {zone.capacityMT} MT</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-500">
                        Compatible Produce: <strong>{zone.suitableCommodities.join(', ')}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Broadcast Action Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <DataBadge
                  source="Live Owner Stream"
                  sourceType="Owner Provided"
                  sourceLastUpdated={selectedFacility?.sourceLastUpdated}
                />

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Publishing Updates...' : 'Broadcast Live Capacity'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Col: Incoming Farmer Requests */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Farmer Inquiries</h3>
                <p className="text-xs text-slate-500">Pending & accepted space reservations</p>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                {farmerRequests.length} Total
              </span>
            </div>

            {farmerRequests.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                No active farmer reservation inquiries right now.
              </div>
            ) : (
              <div className="space-y-3">
                {farmerRequests.map((req) => (
                  <div key={req.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-bold text-slate-900 block">{req.farmerName}</span>
                        <span className="text-[11px] text-slate-500">{req.phone}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        req.status === 'Accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : req.status === 'Rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {req.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] p-2 bg-white rounded-lg border border-slate-100">
                      <div>
                        <span className="text-slate-400">Commodity:</span>
                        <p className="font-semibold text-slate-800">{req.crop}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Quantity:</span>
                        <p className="font-bold text-emerald-700">{req.quantityMT} MT</p>
                      </div>
                    </div>

                    {req.status === 'Pending' && (
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => handleUpdateRequestStatus(req.id, 'Accepted')}
                          className="flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center justify-center gap-1"
                        >
                          <Check className="w-3 h-3" /> Accept
                        </button>
                        <button
                          onClick={() => handleUpdateRequestStatus(req.id, 'Rejected')}
                          className="flex-1 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-bold text-[11px] flex items-center justify-center gap-1"
                        >
                          <X className="w-3 h-3" /> Decline
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
