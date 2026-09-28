import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ClipboardList, 
  Search, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Warehouse, 
  MapPin, 
  Calendar, 
  Sprout, 
  Phone, 
  Info, 
  ArrowRight,
  RefreshCw,
  X
} from 'lucide-react';
import { fetchApi } from '../services/api';
import authService from '../services/authService';

export default function FarmerRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const currentUser = authService.getCurrentUser();

  const loadRequests = async () => {
    setLoading(true);
    try {
      // Backend automatically filters by farmer identity if authenticated as farmer
      const data = await fetchApi('/farmer-requests');
      setRequests(data);
    } catch (err) {
      console.error('Failed to load farmer requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Accepted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" /> Accepted
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
            <XCircle className="w-3.5 h-3.5" /> Rejected
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3.5 h-3.5" /> Pending Review
          </span>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-2">
            <Sprout className="w-3.5 h-3.5" />
            <span>Farmer / FPO Storage Booking Tracker</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            My Storage Reservations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track chamber space requests submitted to Andhra Pradesh licensed cold storage facilities.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadRequests}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer shadow-2xs"
            title="Refresh requests"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <Link
            to="/farmer-search"
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Find Cold Storage</span>
          </Link>
        </div>
      </div>

      {/* Requests Table / Cards */}
      {loading ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
          <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-medium">Retrieving your cold chain requests...</p>
        </div>
      ) : requests.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <ClipboardList className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">No Storage Requests Submitted Yet</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Select your crop, quantity, and location in Andhra Pradesh to find suitable cold storage and submit an inquiry.
            </p>
          </div>
          <Link
            to="/farmer-search"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            Find Storage Now
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800">
              Active & Historic Bookings ({requests.length})
            </h2>
            <span className="text-[11px] text-slate-400">
              Identity: {currentUser?.name || 'Authorized Farmer'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Request ID</th>
                  <th className="py-3.5 px-6">Cold Storage</th>
                  <th className="py-3.5 px-6">Crop & Quantity</th>
                  <th className="py-3.5 px-6">Requested Date</th>
                  <th className="py-3.5 px-6">Expected Storage Date</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6 font-mono text-[11px] font-bold text-slate-900">
                      {req.id}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Warehouse className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-900 truncate max-w-[200px]">
                            {req.targetColdStorageName || req.targetColdStorageId}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {req.district ? `${req.district}, AP` : 'Andhra Pradesh'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-slate-900">{req.quantityMT} MT</span>
                      <span className="text-slate-400 text-[11px] block">{req.crop || 'Horticulture'}</span>
                    </td>
                    <td className="py-4 px-6 text-slate-500 text-[11px]">
                      {new Date(req.requestedAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="py-4 px-6 text-slate-500 text-[11px]">
                      {req.requiredFromDate ? (
                        new Date(req.requiredFromDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })
                      ) : (
                        'Immediate'
                      )}
                      <span className="text-[10px] text-slate-400 block">{req.durationMonths || 3} months</span>
                    </td>
                    <td className="py-4 px-6">
                      {getStatusBadge(req.status)}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setSelectedRequest(req)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs cursor-pointer transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-base">Request Details</h3>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-medium">Status</span>
                <div>{getStatusBadge(selectedRequest.status)}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-0.5">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Request ID</span>
                  <p className="font-mono font-bold text-slate-800">{selectedRequest.id}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-0.5">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Crop & Quantity</span>
                  <p className="font-bold text-slate-800">{selectedRequest.quantityMT} MT • {selectedRequest.crop}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Target Facility</span>
                <p className="font-bold text-slate-900 text-sm">
                  {selectedRequest.targetColdStorageName || selectedRequest.targetColdStorageId}
                </p>
                <p className="text-slate-500 text-[11px]">
                  {selectedRequest.district ? `${selectedRequest.district} District, Andhra Pradesh` : 'Andhra Pradesh'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-0.5">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Submission Date</span>
                  <p className="text-slate-700 font-semibold">
                    {new Date(selectedRequest.requestedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-0.5">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Expected Storage Date</span>
                  <p className="text-slate-700 font-semibold">
                    {selectedRequest.requiredFromDate || 'Immediate'}
                  </p>
                </div>
              </div>

              {selectedRequest.estimatedMonthlyCostINR > 0 && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex justify-between items-center">
                  <span className="text-emerald-800 font-semibold">Estimated Monthly Storage Fee:</span>
                  <span className="text-base font-extrabold text-emerald-900">
                    ₹{selectedRequest.estimatedMonthlyCostINR.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              {selectedRequest.lastStatusUpdate && (
                <p className="text-[10px] text-slate-400 text-center">
                  Last status update: {new Date(selectedRequest.lastStatusUpdate).toLocaleString()}
                </p>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedRequest(null)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
