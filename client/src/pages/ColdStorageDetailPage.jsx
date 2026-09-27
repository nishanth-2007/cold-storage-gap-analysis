import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Warehouse, 
  MapPin, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  Thermometer, 
  IndianRupee, 
  ShieldCheck, 
  Clock, 
  ArrowLeft,
  Layers,
  Award,
  Truck,
  Box,
  Share2
} from 'lucide-react';
import { coldStorageService } from '../services/coldStorageService';
import { fetchApi } from '../services/api';
import DataBadge from '../components/DataBadge';

export default function ColdStorageDetailPage() {
  const { id } = useParams();
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Booking Form State
  const [bookingFormData, setBookingFormData] = useState({
    farmerName: '',
    phone: '',
    crop: '',
    quantityMT: 20,
    durationMonths: 3,
    notes: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    async function loadFacility() {
      setLoading(true);
      try {
        const data = await coldStorageService.getColdStorageById(id);
        setFacility(data);
        if (data.commoditiesSupported && data.commoditiesSupported.length > 0) {
          setBookingFormData(prev => ({ ...prev, crop: data.commoditiesSupported[0] }));
        }
      } catch (err) {
        setError(err.message || 'Facility not found');
      } finally {
        setLoading(false);
      }
    }
    loadFacility();
  }, [id]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    try {
      await fetchApi('/farmer-requests', {
        method: 'POST',
        body: JSON.stringify({
          farmerName: bookingFormData.farmerName,
          phone: bookingFormData.phone,
          district: facility.district,
          mandal: facility.mandal,
          village: facility.village,
          crop: bookingFormData.crop,
          quantityMT: Number(bookingFormData.quantityMT),
          durationMonths: Number(bookingFormData.durationMonths),
          targetColdStorageId: facility.id,
          targetColdStorageName: facility.facilityName,
          estimatedMonthlyCostINR: Number(facility.pricingPerMTMonth) * Number(bookingFormData.quantityMT)
        })
      });
      setBookingSuccess(true);
    } catch (err) {
      alert(`Booking request failed: ${err.message}`);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-slate-500 font-medium">Loading cold storage facility data...</p>
      </div>
    );
  }

  if (error || !facility) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <Warehouse className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">Facility Not Found</h2>
        <p className="text-sm text-slate-500">{error || 'The requested cold storage does not exist.'}</p>
        <Link to="/farmer-search" className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Search
        </Link>
      </div>
    );
  }

  const totalCap = facility.totalCapacityMT;
  const availCap = facility.availableCapacityMT;
  const occupiedCap = totalCap - availCap;
  const occupancyPct = Math.round((occupiedCap / totalCap) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-emerald-700">Home</Link>
        <span>/</span>
        <Link to="/farmer-search" className="hover:text-emerald-700">Cold Storages</Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold">{facility.district} District</span>
        <span>/</span>
        <span className="text-slate-400 truncate">{facility.facilityName}</span>
      </div>

      {/* Facility Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                {facility.operatingStatus}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                Reg: {facility.registrationNumber}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                State: Andhra Pradesh
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {facility.facilityName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{facility.address} ({facility.mandal} Mandal, {facility.district} Dist)</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-slate-400">Monthly Storage Rate</p>
              <p className="text-2xl font-bold text-slate-900">
                ₹{facility.pricingPerMTMonth} <span className="text-xs font-normal text-slate-500">/ MT / Month</span>
              </p>
            </div>
          </div>
        </div>

        {/* Live Capacity Bar Gauge */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <Warehouse className="w-4 h-4 text-emerald-700" />
              Live Warehouse Occupancy Gauge
            </span>
            <span className="font-bold text-slate-900">{occupancyPct}% Utilized</span>
          </div>

          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex">
            <div 
              style={{ width: `${occupancyPct}%` }}
              className={`h-full ${occupancyPct > 90 ? 'bg-red-500' : occupancyPct > 75 ? 'bg-amber-500' : 'bg-emerald-500'} transition-all duration-500`}
            />
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs pt-1">
            <div>
              <p className="text-slate-400 text-[11px]">Total Licensed</p>
              <p className="font-bold text-slate-900 text-sm">{totalCap.toLocaleString('en-IN')} MT</p>
            </div>
            <div>
              <p className="text-slate-400 text-[11px]">Occupied Capacity</p>
              <p className="font-bold text-slate-700 text-sm">{occupiedCap.toLocaleString('en-IN')} MT</p>
            </div>
            <div>
              <p className="text-slate-400 text-[11px]">Live Available Space</p>
              <p className="font-bold text-emerald-700 text-sm">{availCap.toLocaleString('en-IN')} MT</p>
            </div>
          </div>
        </div>

        {/* Data Provenance Header Tag */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <DataBadge
            source={facility.source}
            sourceType={facility.sourceType}
            sourceLastUpdated={facility.sourceLastUpdated}
            lastVerified={facility.lastVerified}
          />
          <div className="flex items-center gap-2 text-slate-500 text-xs">
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>Facility Desk: <strong className="text-slate-800">{facility.contactPhone}</strong> ({facility.contactPerson})</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Chambers, Amenities, and Direct Reservation Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Chambers & Specifications */}
        <div className="lg:col-span-2 space-y-6">
          {/* Temperature Zones & Chambers */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Thermometer className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900">
                Temperature Zones & Chamber Specifications
              </h2>
            </div>

            <div className="space-y-3">
              {facility.temperatureZones && facility.temperatureZones.map((zone, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-bold text-slate-900 text-sm">{zone.name}</span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 w-fit">
                      {zone.tempRange}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs pt-1">
                    <div>
                      <span className="text-slate-400">Total Chamber Size:</span>
                      <p className="font-semibold text-slate-800">{zone.capacityMT} MT</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Current Free Space:</span>
                      <p className="font-bold text-emerald-700">{zone.availableMT} MT Available</p>
                    </div>
                  </div>

                  <div className="pt-1">
                    <span className="text-[11px] text-slate-400">Supported Produce:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {zone.suitableCommodities && zone.suitableCommodities.map(c => (
                        <span key={c} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 text-[11px] font-medium">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Infrastructure & Equipment Amenities */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Award className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900">
                Facility Amenities & Post-Harvest Equipment
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {facility.amenities && facility.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100 text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Instant Booking / Reservation Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 sticky top-24">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Direct Farmer Reservation</h3>
              <p className="text-xs text-slate-500 mt-0.5">Submit immediate space booking inquiry to gate operator</p>
            </div>

            {bookingSuccess ? (
              <div className="p-6 text-center space-y-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">Reservation Transmitted!</h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Operator <strong>{facility.contactPerson}</strong> has been notified. You will receive gate pass details on <strong>{bookingFormData.phone}</strong>.
                </p>
                <button
                  onClick={() => setBookingSuccess(false)}
                  className="px-4 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-bold"
                >
                  Book Another Lot
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Farmer / FPO Name *</label>
                  <input
                    type="text"
                    required
                    value={bookingFormData.farmerName}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, farmerName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={bookingFormData.phone}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
                    placeholder="+91 98480 12345"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Commodity *</label>
                    <select
                      value={bookingFormData.crop}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, crop: e.target.value })}
                      className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
                    >
                      {facility.commoditiesSupported && facility.commoditiesSupported.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Quantity (MT) *</label>
                    <input
                      type="number"
                      min="1"
                      max={facility.availableCapacityMT}
                      required
                      value={bookingFormData.quantityMT}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, quantityMT: e.target.value })}
                      className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duration (Months)</label>
                  <select
                    value={bookingFormData.durationMonths}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, durationMonths: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="1">1 Month</option>
                    <option value="3">3 Months</option>
                    <option value="6">6 Months</option>
                    <option value="9">9 Months</option>
                  </select>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between text-slate-600">
                    <span>Est. Monthly Rent:</span>
                    <span className="font-bold text-slate-900">
                      ₹{(facility.pricingPerMTMonth * Number(bookingFormData.quantityMT || 0)).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">Payment made on monthly basis upon warehouse receipt.</p>
                </div>

                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all disabled:opacity-50"
                >
                  {bookingLoading ? 'Sending...' : 'Confirm Space Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
