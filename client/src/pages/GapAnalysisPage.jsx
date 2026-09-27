import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingDown, 
  AlertTriangle, 
  ShieldCheck, 
  Filter, 
  ArrowRight,
  PieChart as PieChartIcon,
  Info,
  Layers,
  Database
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { gapAnalysisService } from '../services/gapAnalysisService';
import DataBadge from '../components/DataBadge';

export default function GapAnalysisPage() {
  const [gapData, setGapData] = useState(null);
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await gapAnalysisService.getGapAnalysis();
        setGapData(data);
      } catch (err) {
        console.error('Failed to load gap analysis:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-3">
        <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-slate-500 font-medium">Aggregating district horticulture deficit models...</p>
      </div>
    );
  }

  const summary = gapData?.summary || {};
  let districts = gapData?.districts || [];

  if (selectedSeverity !== 'ALL') {
    districts = districts.filter(d => d.gapSeverityIndex === selectedSeverity);
  }

  // Chart 1 Data: Demand vs Existing Capacity
  const chartData = districts.map(d => ({
    name: d.district,
    StorageDemand: Math.round(d.annualStorageDemandMT / 1000), // in '000 MT
    ExistingCapacity: Math.round(d.existingColdStorageCapacityMT / 1000), // in '000 MT
    GapMT: Math.round(d.netStorageGapMT / 1000),
    GapPct: d.gapPercentage
  }));

  // Pie chart data: Severity distribution
  const pieData = [
    { name: 'Critical Deficit (>95%)', value: summary.severityCounts?.critical || 2, color: '#ef4444' },
    { name: 'High Deficit (80-95%)', value: summary.severityCounts?.high || 6, color: '#f97316' },
    { name: 'Moderate Deficit (30-80%)', value: summary.severityCounts?.moderate || 3, color: '#eab308' },
    { name: 'Adequate / Surplus', value: summary.severityCounts?.adequate || 1, color: '#10b981' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-semibold mb-2 border border-purple-200">
            <BarChart3 className="w-3.5 h-3.5 text-purple-600" />
            <span>Statewide Infrastructure Deficit Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Horticulture Cold Storage Gap Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            Quantitative assessment of Andhra Pradesh perishable crop yields against licensed cold chain infrastructure. Identifies district-level post-harvest deficit bottlenecks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/potential-locations"
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-all"
          >
            Explore New Facility Hotspots →
          </Link>
        </div>
      </div>

      {/* Statewide Macro Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Annual Production</span>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            {(summary.totalProductionMT / 1000000).toFixed(2)}M <span className="text-xs font-normal text-slate-500">MT</span>
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">Fruits, Vegetables, Spices</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Perishable Storage Demand</span>
          <p className="text-xl sm:text-2xl font-bold text-blue-700 mt-1">
            {(summary.totalStorageDemandMT / 1000000).toFixed(2)}M <span className="text-xs font-normal text-slate-500">MT</span>
          </p>
          <p className="text-[10px] text-blue-600 mt-0.5">Standard 40% surplus factor</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Licensed Cold Capacity</span>
          <p className="text-xl sm:text-2xl font-bold text-emerald-700 mt-1">
            {(summary.totalExistingCapacityMT / 1000).toFixed(0)}k <span className="text-xs font-normal text-slate-500">MT</span>
          </p>
          <p className="text-[10px] text-emerald-600 mt-0.5">Concentrated in 3 coastal hubs</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Net Cold Storage Deficit</span>
          <p className="text-xl sm:text-2xl font-bold text-red-600 mt-1">
            {(summary.totalNetStorageGapMT / 1000000).toFixed(2)}M <span className="text-xs font-normal text-slate-500">MT</span>
          </p>
          <p className="text-[10px] text-red-500 mt-0.5">Critical Rayalaseema deficit</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs col-span-2 lg:col-span-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Statewide Gap Index</span>
          <p className="text-xl sm:text-2xl font-bold text-amber-600 mt-1">
            {summary.overallGapPercentage}%
          </p>
          <p className="text-[10px] text-amber-700 mt-0.5">Unmet seasonal requirement</p>
        </div>
      </div>

      {/* Visual Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Bar Chart: Storage Demand vs Existing Capacity */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Storage Demand vs Existing Capacity by District ('000 MT)
              </h3>
              <p className="text-xs text-slate-500">
                Highlights the extreme disparity between Rayalaseema production and coastal warehouse concentration.
              </p>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip 
                  formatter={(val, name) => [`${val.toLocaleString()}k MT`, name === 'StorageDemand' ? 'Storage Demand' : 'Existing Capacity']}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="StorageDemand" name="Storage Demand ('000 MT)" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ExistingCapacity" name="Existing Capacity ('000 MT)" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Severity Distribution Pie Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Deficit Severity Classification</h3>
            <p className="text-xs text-slate-500">Breakdown of surveyed AP districts</p>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs pt-2 border-t border-slate-100">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <strong className="text-slate-900">{item.value} Districts</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter and Detailed District Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              District Deficit Ranking & Sizing Recommendations
            </h3>
            <p className="text-xs text-slate-500">
              Sorted by deficit severity index and post-harvest produce exposure.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-600">Filter Severity:</span>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500"
            >
              <option value="ALL">All Severity Levels</option>
              <option value="Critical Deficit">Critical Deficit</option>
              <option value="High Deficit">High Deficit</option>
              <option value="Moderate Deficit">Moderate Deficit</option>
              <option value="Adequate / Surplus">Adequate / Surplus</option>
            </select>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">District</th>
                <th className="py-3 px-3">Production (MT)</th>
                <th className="py-3 px-3">Storage Demand (MT)</th>
                <th className="py-3 px-3">Existing Cap. (MT)</th>
                <th className="py-3 px-3">Net Deficit (MT)</th>
                <th className="py-3 px-3">Deficit %</th>
                <th className="py-3 px-3">Severity Index</th>
                <th className="py-3 px-3">Vulnerable Crops</th>
                <th className="py-3 px-3">Rec. Addition (MT)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {districts.map((d) => {
                let badgeClass = "bg-emerald-100 text-emerald-800";
                if (d.gapSeverityIndex === 'Critical Deficit') badgeClass = "bg-red-100 text-red-800 font-bold";
                else if (d.gapSeverityIndex === 'High Deficit') badgeClass = "bg-orange-100 text-orange-800 font-bold";
                else if (d.gapSeverityIndex === 'Moderate Deficit') badgeClass = "bg-yellow-100 text-yellow-800 font-medium";

                return (
                  <tr key={d.district} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-900">{d.district}</td>
                    <td className="py-3 px-3 text-slate-700">{d.totalHorticultureProductionMT.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-3 text-slate-700">{d.annualStorageDemandMT.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-3 text-slate-700">{d.existingColdStorageCapacityMT.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-3 font-bold text-red-600">{d.netStorageGapMT.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-3 font-bold text-slate-800">{d.gapPercentage}%</td>
                    <td className="py-3 px-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] inline-block ${badgeClass}`}>
                        {d.gapSeverityIndex}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      {d.primaryVulnerableCrops.join(', ')}
                    </td>
                    <td className="py-3 px-3 font-bold text-emerald-700">
                      +{d.recommendedNewCapacityMT.toLocaleString('en-IN')} MT
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500">
          <DataBadge
            source="AP Directorate of Horticulture & NCCD Benchmark Model"
            sourceType="Platform Calculated"
            sourceLastUpdated="2026-09-27"
          />
          <Link to="/methodology" className="text-emerald-700 hover:underline font-semibold">
            View Gap Calculation Formula & Assumptions →
          </Link>
        </div>
      </div>
    </div>
  );
}
