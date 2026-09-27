import React, { useState, useEffect } from 'react';
import { 
  Database, 
  ShieldCheck, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  Building, 
  AlertTriangle,
  FileCheck,
  Search,
  Filter
} from 'lucide-react';
import { dataSourceService } from '../services/dataSourceService';
import DataBadge from '../components/DataBadge';

export default function DataSourcesPage() {
  const [data, setData] = useState(null);
  const [filterType, setFilterType] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSources() {
      setLoading(true);
      try {
        const res = await dataSourceService.getSummary();
        setData(res);
      } catch (err) {
        console.error('Failed to load data sources:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSources();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-3">
        <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-slate-500 font-medium">Fetching dataset provenance catalogs...</p>
      </div>
    );
  }

  let sources = data?.sources || [];
  if (filterType !== 'ALL') {
    sources = sources.filter(s => s.sourceType === filterType);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 sm:p-8 rounded-3xl text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider border border-emerald-400/30">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Full Academic & Administrative Provenance</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Data Sources & Provenance Registry
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Every spatial polygon, warehouse occupancy metric, crop harvest yield, and mandi price is rigorously tagged with issuing agency provenance, verification protocols, and synchronization timestamps.
        </p>
      </div>

      {/* Provenance Distribution Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold text-slate-700 uppercase">Government</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{data?.countByType?.['Government'] || 3}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">AP Horticulture, NCCD, e-NAM</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-xs font-bold text-slate-700 uppercase">Owner Provided</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{data?.countByType?.['Owner Provided'] || 1}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Live warehouse operator logs</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <span className="text-xs font-bold text-slate-700 uppercase">Platform Calculated</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{data?.countByType?.['Platform Calculated'] || 1}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">GIS spatial Haversine model</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-xs font-bold text-slate-700 uppercase">Demo Data</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{data?.countByType?.['Demo Data'] || 1}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Explicitly labeled simulation</p>
        </div>
      </div>

      {/* Main Datasets Listing */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Registered Datasets & Issuing Authorities</h2>
            <p className="text-xs text-slate-500">Cross-verified against Andhra Pradesh state standards</p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-600">Filter Provenance:</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500"
            >
              <option value="ALL">All Provenance Types</option>
              <option value="Government">Government</option>
              <option value="Owner Provided">Owner Provided</option>
              <option value="Platform Calculated">Platform Calculated</option>
              <option value="Demo Data">Demo Data</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {sources.map((src) => (
            <div
              key={src.id}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 hover:border-emerald-300 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <DataBadge sourceType={src.sourceType} />
                  <span className="text-xs font-bold text-slate-400">Score: {src.reliabilityScore}</span>
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Cadence: <strong>{src.updateFrequency}</strong></span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">{src.datasetName}</h3>
                <p className="text-xs text-emerald-800 font-medium mt-0.5">{src.issuingAgency}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-white rounded-xl border border-slate-100 text-xs">
                <div>
                  <span className="text-[11px] text-slate-400 font-medium">Official Portal / Register:</span>
                  <p className="text-blue-700 font-medium truncate mt-0.5">{src.officialPortal}</p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-medium">Geographic Scope:</span>
                  <p className="text-slate-800 font-medium mt-0.5">{src.coverage}</p>
                </div>
              </div>

              <div className="text-xs text-slate-600 flex items-start gap-2 pt-1">
                <FileCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Verification Protocol:</strong> {src.verificationProtocol}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
