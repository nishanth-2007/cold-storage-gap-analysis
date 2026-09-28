import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sprout, 
  Search, 
  ClipboardList, 
  TrendingUp, 
  Warehouse, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Boxes
} from 'lucide-react';
import { coldStorageService } from '../services/coldStorageService';
import { fetchApi } from '../services/api';
import authService from '../services/authService';

export default function FarmerDashboardPage() {
  const [storages, setStorages] = useState([]);
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = authService.getCurrentUser();

  const userDistrict = currentUser?.district || 'Guntur';

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [allStorages, requests] = await Promise.all([
          coldStorageService.getColdStorages({ district: userDistrict }),
          fetchApi('/farmer-requests')
        ]);
        setStorages(allStorages);
        setRecentRequests(requests.slice(0, 3));
      } catch (err) {
        console.error('Failed to load farmer dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [userDistrict]);

  const totalNearbyCapacityMT = storages.reduce((sum, s) => sum + (Number(s.availableCapacityMT) || 0), 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Card & Primary Persona Purpose */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/60 text-emerald-200 text-xs font-bold border border-emerald-500/40">
          <Sprout className="w-3.5 h-3.5" />
          <span>Andhra Pradesh Rythu Portal • Task-Oriented Farmer Desk</span>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome, {currentUser?.name || 'Farmer / FPO'}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200 max-w-2xl">
            {currentUser?.organization ? `${currentUser.organization} • ` : ''}{userDistrict} District. 
            Find verified cold storage facilities, check available chamber space, and track booking requests.
          </p>
        </div>

        {/* Quick Actions (Section 3) */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            to="/farmer-search"
            className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-emerald-800 flex items-center justify-center font-bold shadow-xs">
                <Search className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="font-extrabold text-sm block">Find Cold Storage</span>
                <span className="text-[11px] text-emerald-200">Search by crop & mandal</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/farmer-requests"
            className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-emerald-800 flex items-center justify-center font-bold shadow-xs">
                <ClipboardList className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="font-extrabold text-sm block">My Requests</span>
                <span className="text-[11px] text-emerald-200">Track chamber bookings</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/market-insights"
            className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-emerald-800 flex items-center justify-center font-bold shadow-xs">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="font-extrabold text-sm block">Market Rates</span>
                <span className="text-[11px] text-emerald-200">AP Mandi wholesale rates</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Useful Summary Metrics (Simple & Action-Oriented) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Nearby Available Capacity</span>
          <p className="text-2xl font-extrabold text-emerald-700">
            {loading ? '...' : `${totalNearbyCapacityMT.toLocaleString('en-IN')} MT`}
          </p>
          <p className="text-[11px] text-slate-500">Live chamber space in {userDistrict} area</p>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">My Active Requests</span>
          <p className="text-2xl font-extrabold text-slate-900">
            {loading ? '...' : recentRequests.length}
          </p>
          <p className="text-[11px] text-slate-500">Inquiry status tracked in realtime</p>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Selected District</span>
          <p className="text-2xl font-extrabold text-slate-900">
            {userDistrict}
          </p>
          <p className="text-[11px] text-slate-500">AP State Horticulture Grid</p>
        </div>
      </div>

      {/* Two Column Section: Recent Requests & Nearby Available Storage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Storage Requests */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-emerald-600" />
              <h2 className="text-sm font-bold text-slate-900">Recent Storage Requests</h2>
            </div>
            <Link
              to="/farmer-requests"
              className="text-xs text-emerald-700 font-bold hover:underline flex items-center gap-0.5"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <p className="text-xs text-slate-400 py-6 text-center">Loading requests...</p>
          ) : recentRequests.length === 0 ? (
            <div className="text-center py-8 space-y-2">
              <p className="text-xs font-semibold text-slate-600">No requests submitted yet.</p>
              <Link
                to="/farmer-search"
                className="inline-block text-xs font-bold text-emerald-600 hover:underline"
              >
                Search available cold storage &rarr;
              </Link>
            </div>
          ) : (
            <div className="space-y-2.5">
              {recentRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <p className="font-bold text-slate-900">
                      {req.targetColdStorageName || 'Cold Storage Facility'}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {req.crop} • {req.quantityMT} MT • {new Date(req.requestedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                    req.status === 'Accepted'
                      ? 'bg-emerald-100 text-emerald-800'
                      : req.status === 'Rejected'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Nearby Available Cold Storage */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Warehouse className="w-5 h-5 text-emerald-600" />
              <h2 className="text-sm font-bold text-slate-900">Nearby Facilities in {userDistrict}</h2>
            </div>
            <Link
              to="/farmer-search"
              className="text-xs text-emerald-700 font-bold hover:underline flex items-center gap-0.5"
            >
              <span>Explore All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <p className="text-xs text-slate-400 py-6 text-center">Loading facilities...</p>
          ) : storages.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No facilities found in this district.</p>
          ) : (
            <div className="space-y-2.5">
              {storages.slice(0, 3).map((cs) => (
                <div
                  key={cs.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 truncate max-w-[220px]">
                      {cs.facilityName}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {cs.mandal}, {cs.district} • ₹{cs.pricingPerMTMonth || 850}/MT/mo
                    </p>
                    <p className="text-[10px] text-emerald-700 font-semibold">
                      Supports: {Array.isArray(cs.commoditiesSupported) ? cs.commoditiesSupported.slice(0, 3).join(', ') : 'Fresh Chilli, Tomato'}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-emerald-700 block text-sm">
                      {cs.availableCapacityMT} MT
                    </span>
                    <span className="text-[10px] text-slate-400">Available</span>
                    <Link
                      to={`/cold-storage/${cs.id}`}
                      className="block mt-1 text-[11px] text-emerald-600 hover:underline font-bold"
                    >
                      Book &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
