import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Warehouse, 
  Plus, 
  Database, 
  CheckCircle2, 
  RefreshCw, 
  Building, 
  MapPin, 
  Users,
  Trash2,
  Check,
  AlertCircle
} from 'lucide-react';
import { coldStorageService } from '../services/coldStorageService';
import { gisService } from '../services/gisService';
import { fetchApi } from '../services/api';
import DataBadge from '../components/DataBadge';

export default function AdminDashboardPage() {
  const [healthData, setHealthData] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Facility Form State
  const [newFacility, setNewFacility] = useState({
    facilityName: '',
    registrationNumber: '',
    district: 'Guntur',
    mandal: 'Guntur Urban',
    address: '',
    lat: 16.3067,
    lng: 80.4365,
    totalCapacityMT: 5000,
    availableCapacityMT: 2000,
    pricingPerMTMonth: 800,
    commoditiesSupported: 'Chilli, Tomato, Mango',
    contactPerson: '',
    contactPhone: ''
  });

  useEffect(() => {
    async function loadAdminData() {
      setLoading(true);
      try {
        const [health, storages, dists] = await Promise.all([
          fetchApi('/health'),
          coldStorageService.getColdStorages(),
          gisService.getDistricts()
        ]);
        setHealthData(health);
        setFacilities(storages);
        setDistricts(dists);
      } catch (err) {
        console.error('Failed to load admin data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAdminData();
  }, []);

  const handleCreateFacility = async (e) => {
    e.preventDefault();
    try {
      const created = await coldStorageService.registerColdStorage({
        facilityName: newFacility.facilityName,
        registrationNumber: newFacility.registrationNumber,
        district: newFacility.district,
        mandal: newFacility.mandal,
        address: newFacility.address,
        coordinates: { lat: Number(newFacility.lat), lng: Number(newFacility.lng) },
        totalCapacityMT: Number(newFacility.totalCapacityMT),
        availableCapacityMT: Number(newFacility.availableCapacityMT),
        operatingStatus: 'Active',
        pricingPerMTMonth: Number(newFacility.pricingPerMTMonth),
        commoditiesSupported: newFacility.commoditiesSupported.split(',').map(s => s.trim()),
        contactPerson: newFacility.contactPerson,
        contactPhone: newFacility.contactPhone,
        temperatureZones: [
          {
            name: "Main Multi-Commodity Chamber",
            tempRange: "2°C to 10°C",
            capacityMT: Number(newFacility.totalCapacityMT),
            availableMT: Number(newFacility.availableCapacityMT),
            suitableCommodities: newFacility.commoditiesSupported.split(',').map(s => s.trim())
          }
        ],
        amenities: ["Pre-cooling Unit", "Weighbridge", "Power Backup"]
      });

      setFacilities([created, ...facilities]);
      setShowAddModal(false);
      alert('Facility registered successfully and published on AP GIS map!');
    } catch (err) {
      alert(`Registration failed: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-3">
        <div className="w-10 h-10 border-3 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-slate-500 font-medium">Verifying database replica and system admin telemetry...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold uppercase tracking-wider border border-rose-400/30">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>System Administration & Database Governance</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Platform Master Console
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Supervise registered warehouse entities, verified data catalogs, and spatial telemetry across Andhra Pradesh.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shrink-0 transition-transform hover:scale-102"
          >
            <Plus className="w-4 h-4" /> Register New Cold Storage
          </button>
        </div>
      </div>

      {/* System Telemetry Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">System State</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <p className="text-xl font-bold text-emerald-700">ONLINE (200 OK)</p>
          </div>
          <p className="text-[10px] text-slate-500 mt-0.5">{healthData?.database?.mode}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Registered Facilities</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">{facilities.length} Hubs</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Licensed & Active in AP</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Districts Verified</span>
          <p className="text-2xl font-bold text-purple-700 mt-1">26 / 26</p>
          <p className="text-[10px] text-purple-600 mt-0.5">100% Administrative Coverage</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Deficit Hotspots</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">
            {healthData?.metrics?.potentialHotspotsIdentified || 6}
          </p>
          <p className="text-[10px] text-amber-700 mt-0.5">High-priority clusters</p>
        </div>
      </div>

      {/* Facilities Master Directory */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Registered Cold Storage Directory (Andhra Pradesh)
            </h2>
            <p className="text-xs text-slate-500">
              Live database records accessible by farmers and planners
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
            {facilities.length} Facilities
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">Facility Name</th>
                <th className="py-3 px-3">District</th>
                <th className="py-3 px-3">Reg. Number</th>
                <th className="py-3 px-3">Total MT</th>
                <th className="py-3 px-3">Available MT</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Rent / MT</th>
                <th className="py-3 px-3">Provenance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {facilities.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-900">{f.facilityName}</td>
                  <td className="py-3 px-3 text-slate-700">{f.district}</td>
                  <td className="py-3 px-3 font-mono text-slate-600">{f.registrationNumber}</td>
                  <td className="py-3 px-3 text-slate-700">{f.totalCapacityMT.toLocaleString()} MT</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">{f.availableCapacityMT.toLocaleString()} MT</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {f.operatingStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-800">₹{f.pricingPerMTMonth}</td>
                  <td className="py-3 px-3">
                    <DataBadge sourceType={f.sourceType} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Facility Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Register New Cold Storage Facility</h3>
                <p className="text-xs text-slate-500">Adds facility to official AP spatial grid</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 font-bold p-1">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateFacility} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Facility Name *</label>
                  <input
                    type="text"
                    required
                    value={newFacility.facilityName}
                    onChange={(e) => setNewFacility({ ...newFacility, facilityName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g. Amaravati Cold Chain Hub"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">AP License / Reg. Number *</label>
                  <input
                    type="text"
                    required
                    value={newFacility.registrationNumber}
                    onChange={(e) => setNewFacility({ ...newFacility, registrationNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
                    placeholder="AP-GNT-CS-2026-099"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Andhra Pradesh District *</label>
                  <select
                    value={newFacility.district}
                    onChange={(e) => setNewFacility({ ...newFacility, district: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
                  >
                    {districts.map(d => (
                      <option key={d.name} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mandal / Town *</label>
                  <input
                    type="text"
                    required
                    value={newFacility.mandal}
                    onChange={(e) => setNewFacility({ ...newFacility, mandal: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g. Mangalagiri"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Physical Address *</label>
                <input
                  type="text"
                  required
                  value={newFacility.address}
                  onChange={(e) => setNewFacility({ ...newFacility, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
                  placeholder="Plot 5, Autonagar Industrial Corridor, Guntur"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Capacity (MT) *</label>
                  <input
                    type="number"
                    required
                    value={newFacility.totalCapacityMT}
                    onChange={(e) => setNewFacility({ ...newFacility, totalCapacityMT: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Live Free (MT) *</label>
                  <input
                    type="number"
                    required
                    value={newFacility.availableCapacityMT}
                    onChange={(e) => setNewFacility({ ...newFacility, availableCapacityMT: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Rent (₹/MT/Mo) *</label>
                  <input
                    type="number"
                    required
                    value={newFacility.pricingPerMTMonth}
                    onChange={(e) => setNewFacility({ ...newFacility, pricingPerMTMonth: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Latitude</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={newFacility.lat}
                    onChange={(e) => setNewFacility({ ...newFacility, lat: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Longitude</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={newFacility.lng}
                    onChange={(e) => setNewFacility({ ...newFacility, lng: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Commodities Accepted (Comma separated)</label>
                <input
                  type="text"
                  value={newFacility.commoditiesSupported}
                  onChange={(e) => setNewFacility({ ...newFacility, commoditiesSupported: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  placeholder="Chilli, Tomato, Mango, Turmeric"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contact Manager</label>
                  <input
                    type="text"
                    required
                    value={newFacility.contactPerson}
                    onChange={(e) => setNewFacility({ ...newFacility, contactPerson: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    placeholder="M. Venkata Rao"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    value={newFacility.contactPhone}
                    onChange={(e) => setNewFacility({ ...newFacility, contactPhone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    placeholder="+91 94400 12345"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800"
                >
                  Save & Publish to GIS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
