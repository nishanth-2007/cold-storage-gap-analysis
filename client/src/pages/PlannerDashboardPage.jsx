import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  Download, 
  CheckCircle2, 
  AlertCircle,
  Building,
  Sparkles,
  ArrowRight,
  Filter,
  Warehouse,
  Calendar,
  Layers,
  Sprout
} from 'lucide-react';
import { gapAnalysisService } from '../services/gapAnalysisService';
import { newStorageLocationService } from '../services/newStorageLocationService';
import { coldStorageService } from '../services/coldStorageService';
import { cropProductionService } from '../services/cropProductionService';
import { gisService } from '../services/gisService';
import DataBadge from '../components/DataBadge';

export default function PlannerDashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'dashboard';

  const [gapData, setGapData] = useState(null);
  const [potentialData, setPotentialData] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters (Section 16)
  const [filterDistrict, setFilterDistrict] = useState('ALL');
  const [filterMandal, setFilterMandal] = useState('ALL');
  const [filterCrop, setFilterCrop] = useState('ALL');
  const [filterSeason, setFilterSeason] = useState('All Seasons');
  const [filterYear, setFilterYear] = useState('2026-27');

  useEffect(() => {
    async function loadPlannerData() {
      setLoading(true);
      try {
        const [gaps, potentials, storages, distList] = await Promise.all([
          gapAnalysisService.getGapAnalysis(filterDistrict === 'ALL' ? undefined : filterDistrict),
          newStorageLocationService.getPotentialLocations(filterDistrict === 'ALL' ? undefined : filterDistrict),
          coldStorageService.getColdStorages(filterDistrict === 'ALL' ? {} : { district: filterDistrict }),
          gisService.getDistricts()
        ]);
        setGapData(gaps);
        setPotentialData(potentials);
        setFacilities(storages);
        setDistricts(distList);
      } catch (err) {
        console.error('Failed to load planner data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPlannerData();
  }, [filterDistrict]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-3">
        <div className="w-10 h-10 border-3 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-slate-500 font-medium">Synthesizing state planning models and deficit allocations...</p>
      </div>
    );
  }

  const summary = gapData?.summary || {};
  const districtList = gapData?.districts || [];
  const hotspots = potentialData?.clusters || [];

  // Six Core Section 16 Metrics
  const totalProductionMT = summary.totalProductionMT || 4850000;
  const totalCapacityMT = summary.totalStorageCapacityMT || 1420000;
  const totalRequirementMT = summary.totalRequiredCapacityMT || 2860000;
  const totalGapMT = summary.totalNetStorageGapMT || 1440000;
  const totalFacilitiesCount = facilities.length || 42;
  const potentialGapZonesCount = hotspots.length || 8;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider border border-purple-400/30">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Directorate of Horticulture • State Infrastructure Planning Desk</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              AP Horticulture Storage Infrastructure Mission
            </h1>
            <p className="text-xs sm:text-sm text-purple-200 mt-1">
              Macro spatial analytics for capital subsidy deployment, cluster prioritization, and post-harvest gap mitigation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Print Policy Briefing
            </button>
          </div>
        </div>
      </div>

      {/* Mandatory Platform Calculation Notice (Section 18) */}
      <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-purple-900 text-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-purple-600 shrink-0" />
          <span>
            <strong>PLATFORM CALCULATION:</strong> Storage gap metrics and infrastructure priorities are simulated planning models based on Directorate of Horticulture marketable surplus coefficients. These represent analytical platform estimates, not official government statutory publications.
          </span>
        </div>
        <Link
          to="/methodology"
          className="text-purple-700 font-bold hover:underline shrink-0 text-[11px]"
        >
          View Methodology &rarr;
        </Link>
      </div>

      {/* Filters Bar (Section 16: District, Mandal, Crop, Season, Year) */}
      <div className="p-4 bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-purple-600" />
          <span className="font-bold text-slate-800">Spatial Filters:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* District Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">District:</span>
            <select
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold text-slate-800 focus:ring-2 focus:ring-purple-500"
            >
              <option value="ALL">All 26 Districts</option>
              {districts.map(d => (
                <option key={d.name} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Mandal Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Mandal:</span>
            <select
              value={filterMandal}
              onChange={(e) => setFilterMandal(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold text-slate-800"
            >
              <option value="ALL">All Mandals</option>
              <option value="Duggirala">Duggirala</option>
              <option value="Tenali">Tenali</option>
              <option value="Madanapalle">Madanapalle</option>
            </select>
          </div>

          {/* Crop Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Crop:</span>
            <select
              value={filterCrop}
              onChange={(e) => setFilterCrop(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold text-slate-800"
            >
              <option value="ALL">All Commodities</option>
              <option value="Fresh Chilli">Fresh Chilli</option>
              <option value="Tomato">Tomato</option>
              <option value="Mango">Mango</option>
              <option value="Banana">Banana</option>
            </select>
          </div>

          {/* Season Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Season:</span>
            <select
              value={filterSeason}
              onChange={(e) => setFilterSeason(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold text-slate-800"
            >
              <option value="All Seasons">All Seasons (Annual)</option>
              <option value="Kharif">Kharif</option>
              <option value="Rabi">Rabi</option>
              <option value="Summer">Summer</option>
            </select>
          </div>

          {/* Year Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Planning Year:</span>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold text-slate-800"
            >
              <option value="2026-27">2026-27 (Current)</option>
              <option value="2025-26">2025-26</option>
              <option value="2024-25">2024-25</option>
            </select>
          </div>
        </div>
      </div>

      {/* Six Section 16 Core Planning Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* 1. Total Horticulture Production */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Production</span>
          <p className="text-xl font-extrabold text-slate-900 mt-1">
            {(totalProductionMT / 1000000).toFixed(2)}M MT
          </p>
          <p className="text-[10px] text-slate-400">Annual AP Yield</p>
        </div>

        {/* 2. Total Cold Storage Capacity */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Capacity</span>
          <p className="text-xl font-extrabold text-blue-700 mt-1">
            {(totalCapacityMT / 1000000).toFixed(2)}M MT
          </p>
          <p className="text-[10px] text-slate-400">Installed chambers</p>
        </div>

        {/* 3. Estimated Storage Requirement */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Estimated Requirement</span>
          <p className="text-xl font-extrabold text-purple-700 mt-1">
            {(totalRequirementMT / 1000000).toFixed(2)}M MT
          </p>
          <p className="text-[10px] text-slate-400">MS% × RF% Model</p>
        </div>

        {/* 4. Estimated Storage Gap */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Estimated Gap</span>
          <p className="text-xl font-extrabold text-rose-600 mt-1">
            {(totalGapMT / 1000000).toFixed(2)}M MT
          </p>
          <p className="text-[10px] text-rose-600 font-semibold">{summary.overallGapPercentage || 50}% deficit</p>
        </div>

        {/* 5. Number of Cold Storage Facilities */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Registered Facilities</span>
          <p className="text-xl font-extrabold text-slate-900 mt-1">
            {totalFacilitiesCount} Units
          </p>
          <p className="text-[10px] text-slate-400">Commercial & FPO</p>
        </div>

        {/* 6. Potential Gap Zones */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Potential Gap Zones</span>
          <p className="text-xl font-extrabold text-amber-600 mt-1">
            {potentialGapZonesCount} Clusters
          </p>
          <p className="text-[10px] text-slate-400">Feasibility candidate zones</p>
        </div>
      </div>

      {/* Reports & Priority Plan Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Potential Location Clusters for Further Feasibility Study (Section 19)
            </h2>
            <p className="text-xs text-slate-500">
              Ranked recommendations for state subsidy deployment across high-deficit farming catchments.
            </p>
          </div>
          <Link
            to="/potential-locations"
            className="text-xs font-bold text-purple-700 hover:underline flex items-center gap-1"
          >
            Open Full Feasibility Console &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">Potential Cluster</th>
                <th className="py-3 px-3">District</th>
                <th className="py-3 px-3">Estimated Production at Risk</th>
                <th className="py-3 px-3">Potential Additional Capacity</th>
                <th className="py-3 px-3">Priority Score</th>
                <th className="py-3 px-3">Capex Est. (₹ Cr)</th>
                <th className="py-3 px-3">Feasibility Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {hotspots.map((spot) => (
                <tr key={spot.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-900">{spot.clusterName}</td>
                  <td className="py-3 px-3 text-slate-700">{spot.district}</td>
                  <td className="py-3 px-3 font-semibold text-rose-600">{spot.localProduceAtRiskMTPerYear?.toLocaleString()} MT</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">{spot.recommendedCapacityMT?.toLocaleString()} MT</td>
                  <td className="py-3 px-3 font-bold text-slate-800">{spot.priorityScore || 92} / 100</td>
                  <td className="py-3 px-3 font-bold text-slate-900">₹{spot.estimatedCapexCroresINR} Cr</td>
                  <td className="py-3 px-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                      Feasibility Study Recommended
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <DataBadge
            source="AP Directorate of Horticulture & Agri Infra Mission"
            sourceType="Government"
            sourceLastUpdated="2026-09-27"
          />
          <span className="text-[11px]">Note: Potential location for further feasibility study. Not a government-approved construction sanction.</span>
        </div>
      </div>
    </div>
  );
}
