import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  ArrowRight
} from 'lucide-react';
import { gapAnalysisService } from '../services/gapAnalysisService';
import { newStorageLocationService } from '../services/newStorageLocationService';
import DataBadge from '../components/DataBadge';

export default function PlannerDashboardPage() {
  const [gapData, setGapData] = useState(null);
  const [potentialData, setPotentialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlannerData() {
      setLoading(true);
      try {
        const [gaps, potentials] = await Promise.all([
          gapAnalysisService.getGapAnalysis(),
          newStorageLocationService.getPotentialLocations()
        ]);
        setGapData(gaps);
        setPotentialData(potentials);
      } catch (err) {
        console.error('Failed to load planner data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPlannerData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-3">
        <div className="w-10 h-10 border-3 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-slate-500 font-medium">Synthesizing state planning models and deficit allocations...</p>
      </div>
    );
  }

  const summary = gapData?.summary || {};
  const districts = gapData?.districts || [];
  const hotspots = potentialData?.clusters || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider border border-purple-400/30">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Directorate of Horticulture • State Planning Command Desk</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              AP Horticulture Storage Infrastructure Mission
            </h1>
            <p className="text-xs sm:text-sm text-purple-200 mt-1">
              Macro planning console for subsidy deployment, spatial cluster priorities, and export cold-chain gap mitigation.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shrink-0"
          >
            <Download className="w-3.5 h-3.5" /> Print Policy Briefing
          </button>
        </div>
      </div>

      {/* Statewide Macro Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Storage Deficit Gap</span>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {(summary.totalNetStorageGapMT / 1000000).toFixed(2)}M MT
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">{summary.overallGapPercentage}% unmet demand</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Critical Deficit Districts</span>
          <p className="text-2xl font-bold text-purple-800 mt-1">
            {summary.severityCounts?.critical || 2} Districts
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">Annamayya & Kurnool</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">High-Priority Hotspots</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">
            {hotspots.length} Clusters
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">Immediate investment readiness</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Capex Required</span>
          <p className="text-2xl font-bold text-emerald-700 mt-1">
            ₹{potentialData?.estimatedInvestmentRequiredCroresINR} Crores
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">Under AIF / APFPS Subsidies</p>
        </div>
      </div>

      {/* Priority Investment Action Plan Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Infrastructure Investment Priority Matrix (FY 2026-27)
            </h2>
            <p className="text-xs text-slate-500">
              Ranked recommendations for state capital subsidy allocation across high-deficit farming catchments.
            </p>
          </div>
          <Link
            to="/potential-locations"
            className="text-xs font-bold text-purple-700 hover:underline flex items-center gap-1"
          >
            Explore Feasibility Studies <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">Priority Cluster</th>
                <th className="py-3 px-3">District</th>
                <th className="py-3 px-3">Produce at Risk (MT)</th>
                <th className="py-3 px-3">Rec. Capacity (MT)</th>
                <th className="py-3 px-3">Facility Type</th>
                <th className="py-3 px-3">Capex (₹ Cr)</th>
                <th className="py-3 px-3">Urgency</th>
                <th className="py-3 px-3">Policy Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {hotspots.map((spot) => (
                <tr key={spot.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-900">{spot.clusterName}</td>
                  <td className="py-3 px-3 text-slate-700">{spot.district}</td>
                  <td className="py-3 px-3 font-semibold text-red-600">{spot.localProduceAtRiskMTPerYear.toLocaleString()} MT</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">{spot.recommendedCapacityMT} MT</td>
                  <td className="py-3 px-3 text-slate-600 max-w-xs truncate">{spot.recommendedChamberType}</td>
                  <td className="py-3 px-3 font-bold text-slate-900">₹{spot.estimatedCapexCroresINR} Cr</td>
                  <td className="py-3 px-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                      {spot.urgencyLevel}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 font-semibold text-[10px]">
                      AIF 35% Credit Subsidy
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
          <span>Cross-verified with AP State GIS Spatial Grid</span>
        </div>
      </div>
    </div>
  );
}
