import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Store, 
  Calculator, 
  ArrowRight, 
  IndianRupee, 
  ShieldCheck, 
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  BarChart3,
  AlertCircle,
  Sprout,
  Warehouse
} from 'lucide-react';
import { marketService } from '../services/marketService';
import authService from '../services/authService';
import DataBadge from '../components/DataBadge';

export default function MarketInsightsPage() {
  const [markets, setMarkets] = useState([]);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = authService.getCurrentUser();

  // Filters for Farmer View
  const [selectedDistrict, setSelectedDistrict] = useState(currentUser?.district || 'ALL');
  const [selectedCrop, setSelectedCrop] = useState('ALL');

  // ROI Calculator State (for Owner / Planner / Admin)
  const [calcCrop, setCalcCrop] = useState('Fresh Chilli');
  const [calcQuantity, setCalcQuantity] = useState(15);
  const [calcMonths, setCalcMonths] = useState(4);
  const [calcRent, setCalcRent] = useState(850);
  const [roiResult, setRoiResult] = useState(null);
  const [calcLoading, setCalcLoading] = useState(false);

  const isFarmer = currentUser?.role === 'farmer';
  const isOwner = currentUser?.role === 'owner';

  useEffect(() => {
    async function loadMarketData() {
      setLoading(true);
      try {
        const [mkts, prcs] = await Promise.all([
          marketService.getMarkets(),
          marketService.getMarketPrices()
        ]);
        setMarkets(mkts);
        setPrices(prcs);
      } catch (err) {
        console.error('Failed to load market data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadMarketData();
  }, []);

  // Compute ROI on changes (only if not farmer)
  useEffect(() => {
    if (isFarmer) return;

    async function runCalc() {
      setCalcLoading(true);
      try {
        const res = await marketService.calculateRoi({
          commodity: calcCrop,
          quantityMT: Number(calcQuantity),
          durationMonths: Number(calcMonths),
          coldStorageRentPerMonth: Number(calcRent)
        });
        setRoiResult(res);
      } catch (err) {
        console.error('ROI calculation error:', err);
      } finally {
        setCalcLoading(false);
      }
    }
    runCalc();
  }, [calcCrop, calcQuantity, calcMonths, calcRent, isFarmer]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-3">
        <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-slate-500 font-medium">Fetching APMC daily price bulletins and mandi arrivals...</p>
      </div>
    );
  }

  // Filter prices for farmer
  const filteredPrices = prices.filter(p => {
    const matchesDistrict = selectedDistrict === 'ALL' || p.district.toLowerCase() === selectedDistrict.toLowerCase();
    const matchesCrop = selectedCrop === 'ALL' || p.commodity.toLowerCase().includes(selectedCrop.toLowerCase());
    return matchesDistrict && matchesCrop;
  });

  const uniqueDistricts = ['ALL', ...new Set(prices.map(p => p.district))];
  const uniqueCrops = ['ALL', ...new Set(prices.map(p => p.commodity))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner - Role Customized */}
      <div className="bg-gradient-to-r from-teal-800 to-sky-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
          {isFarmer ? <Sprout className="w-3.5 h-3.5" /> : <Store className="w-3.5 h-3.5" />}
          <span>
            {isFarmer 
              ? 'AP Mandi Wholesale Rates • Rythu Information Service' 
              : isOwner
              ? 'Cold Chain Business Intelligence & Demand Analysis'
              : 'APMC Mandis • e-NAM Andhra Pradesh'}
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          {isFarmer ? 'Horticulture Market Rates' : 'Horticulture Market Prices & Cold Storage ROI'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed">
          {isFarmer 
            ? 'Official wholesale modal, minimum, and maximum rates from physical APMC yards across Andhra Pradesh.'
            : 'Daily modal prices and mandi arrivals combined with platform financial and demand feasibility estimates.'}
        </p>
      </div>

      {/* FARMER VIEW (Section 7): Simple task-oriented rate sheet without complex ROI */}
      {isFarmer ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          {/* Simple Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-slate-800">Filter Rates:</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-500 font-medium">District:</span>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                >
                  {uniqueDistricts.map(d => (
                    <option key={d} value={d}>{d === 'ALL' ? 'All Districts' : d}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-500 font-medium">Crop:</span>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                >
                  {uniqueCrops.map(c => (
                    <option key={c} value={c}>{c === 'ALL' ? 'All Crops' : c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Simple Farmer Rates Table (Section 7) */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-4">Market Yard</th>
                  <th className="py-3.5 px-4">District</th>
                  <th className="py-3.5 px-4">Crop</th>
                  <th className="py-3.5 px-4 text-right">Min Price</th>
                  <th className="py-3.5 px-4 text-right">Modal Price</th>
                  <th className="py-3.5 px-4 text-right">Max Price</th>
                  <th className="py-3.5 px-4 text-right">Arrival Quantity</th>
                  <th className="py-3.5 px-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredPrices.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {p.marketName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {p.district}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-emerald-800">{p.commodity}</span>
                      <span className="text-[10px] text-slate-400 block">{p.variety}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-600">
                      ₹{p.minPricePerQuintal.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-right font-extrabold text-emerald-700 text-sm">
                      ₹{p.modalPricePerQuintal.toLocaleString('en-IN')}
                      <span className="text-[9px] font-normal text-slate-400 block">/ Quintal</span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-600">
                      ₹{p.maxPricePerQuintal.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-slate-800">
                      {p.dailyArrivalQuintals || 120} Qtl
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-400 text-[11px]">
                      {p.reportedDate || 'Today'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <DataBadge
              source="Andhra Pradesh Agricultural Marketing Board (APAMB) & e-NAM"
              sourceType="Government"
              sourceLastUpdated="2026-09-27"
            />
            <span className="text-[11px]">1 Quintal = 100 kg • Electronic e-NAM Bulletin</span>
          </div>
        </div>
      ) : (
        /* OWNER, PLANNER & ADMIN VIEW (Section 13) */
        <div className="space-y-6">
          {/* Disclaimer Banner (Section 13) */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Platform Estimate:</strong> Financial calculations and cold storage ROI metrics are analytical platform simulations for business and feasibility guidance. Revenue or payback is not guaranteed.
              </span>
            </div>
            <span className="px-2 py-0.5 rounded bg-amber-200/60 font-bold text-[10px] text-amber-900 shrink-0">
              Platform Estimate
            </span>
          </div>

          {/* Main Grid: Mandi Modal Prices on Left, ROI Calculator on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Live Mandi Modal Prices */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Daily APMC Market Arrivals & Modal Prices
                    </h2>
                    <p className="text-xs text-slate-500">
                      Direct physical trading yard electronic logs (Quintal = 100 kg)
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 w-fit">
                    Live Trading Session
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {prices.map((p) => {
                    const benefitPct = Math.round((p.coldStorageBenefitMultiplier - 1) * 100);
                    return (
                      <div
                        key={p.id}
                        className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition-colors space-y-3"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                              {p.district} Dist
                            </span>
                            <h3 className="text-base font-bold text-slate-900 mt-1.5">{p.commodity}</h3>
                            <p className="text-[11px] text-slate-500">{p.variety}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-slate-400 font-medium">Modal Price</span>
                            <p className="text-lg font-extrabold text-emerald-700">
                              ₹{p.modalPricePerQuintal.toLocaleString('en-IN')}
                            </p>
                            <span className="text-[10px] text-slate-500">/ Quintal</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200/80">
                          <div>
                            <span className="text-[10px] text-slate-400">Min - Max Price:</span>
                            <p className="font-semibold text-slate-700">
                              ₹{p.minPricePerQuintal.toLocaleString()} - ₹{p.maxPricePerQuintal.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400">Est. Cold Store Premium:</span>
                            <p className="font-bold text-blue-700">+{benefitPct}% off-season</p>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Store className="w-3 h-3 text-slate-400" />
                          <span className="truncate">{p.marketName}</span>
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                  <DataBadge
                    source="Andhra Pradesh Agricultural Marketing Board (APAMB) & e-NAM"
                    sourceType="Government"
                    sourceLastUpdated="2026-09-27"
                  />
                  <span className="text-[11px]">Updated every trading day at 11:00 AM IST</span>
                </div>
              </div>
            </div>

            {/* Right Col: Cold Storage ROI Calculator (Section 13) */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
                <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-emerald-600" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">Storage ROI Calculator</h3>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                        Platform Estimate
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">Analytical model of post-harvest preservation gain</p>
                  </div>
                </div>

                {/* Inputs */}
                <div className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Select Crop</label>
                    <select
                      value={calcCrop}
                      onChange={(e) => setCalcCrop(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Fresh Chilli">Fresh Chilli (Guntur Teja)</option>
                      <option value="Tomato">Tomato (Madanapalle Hybrid)</option>
                      <option value="Mango">Mango (Banganapalle)</option>
                      <option value="Banana">Banana (Grand Naine)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Quantity (MT)</label>
                      <input
                        type="number"
                        min="1"
                        max="500"
                        value={calcQuantity}
                        onChange={(e) => setCalcQuantity(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Hold Duration</label>
                      <select
                        value={calcMonths}
                        onChange={(e) => setCalcMonths(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="1">1 Month</option>
                        <option value="2">2 Months</option>
                        <option value="3">3 Months</option>
                        <option value="4">4 Months</option>
                        <option value="6">6 Months</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Storage Tariff (₹/MT/month)</label>
                    <input
                      type="number"
                      min="500"
                      max="2000"
                      value={calcRent}
                      onChange={(e) => setCalcRent(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Calculated Results Box */}
                {roiResult && (
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 space-y-3 text-xs">
                    <div className="flex items-center justify-between border-b border-emerald-200/80 pb-2">
                      <span className="text-slate-600 font-semibold">Immediate Field Sale:</span>
                      <span className="font-bold text-slate-800">
                        ₹{roiResult.totalHarvestRevenueINR.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-emerald-200/80 pb-2">
                      <span className="text-slate-600 font-semibold">Projected Off-Season Sale:</span>
                      <span className="font-bold text-emerald-800">
                        ₹{roiResult.totalOffSeasonRevenueINR.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-600">
                      <span>Storage & Transit Costs:</span>
                      <span className="font-semibold text-slate-700">
                        -₹{(roiResult.totalStorageCostINR + roiResult.totalTransitCostINR).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-emerald-300/80 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-emerald-950 text-sm">Net Additional Gain:</p>
                        <p className="text-[10px] text-emerald-700">Platform estimate after all cost deductions</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-extrabold text-emerald-700">
                          +₹{roiResult.netGainFromColdStorageINR.toLocaleString('en-IN')}
                        </p>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                          +{roiResult.returnOnInvestmentPct}% Est. ROI
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
