import React from 'react';
import { 
  BookOpen, 
  Calculator, 
  MapPin, 
  Thermometer, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  FileText,
  Activity,
  Compass
} from 'lucide-react';
import { AP_HORTICULTURE_CROPS } from '../../../server/data/andhraPradeshData.js';
import DataBadge from '../components/DataBadge';

export default function MethodologyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider border border-emerald-400/30">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Scientific & Analytical Framework</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Spatial GIS & Storage Gap Methodology
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Comprehensive documentation of mathematical models, GIS buffering parameters, perishability decay curves, and cold storage sizing algorithms applied to Andhra Pradesh.
        </p>
      </div>

      {/* Section 1: Mathematical Formulas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Formula 1 */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-emerald-700">
            <Calculator className="w-5 h-5" />
            <h2 className="text-base font-bold text-slate-900">
              1. Horticulture Cold Storage Demand Formula
            </h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Calibrated based on National Centre for Cold-chain Development (NCCD) cold chain census benchmarks:
          </p>
          <div className="p-4 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs overflow-x-auto">
            <code>Storage Demand (MT) = Production (MT) × MS% × RF% × Df</code>
          </div>
          <div className="space-y-1 text-xs text-slate-600">
            <p><strong>MS% (Marketable Surplus):</strong> 80% to 92% of gross yield after farm retention.</p>
            <p><strong>RF% (Cold Storage Requirement Factor):</strong> 30% for bananas up to 60% for fresh chillies.</p>
            <p><strong>Df (Seasonal Duration Factor):</strong> Harvest concentration peak index.</p>
          </div>
        </div>

        {/* Formula 2 */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-blue-700">
            <Compass className="w-5 h-5" />
            <h2 className="text-base font-bold text-slate-900">
              2. Road Network Haversine Curvature Model
            </h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Converts GPS geodesic centroids into true vehicular transit distances across AP highway networks:
          </p>
          <div className="p-4 rounded-xl bg-slate-900 text-blue-300 font-mono text-xs overflow-x-auto">
            <code>Road Distance (km) = 2R × arcsin(√(a)) × 1.25</code>
          </div>
          <div className="space-y-1 text-xs text-slate-600">
            <p><strong>R:</strong> Earth radius (6,371 km).</p>
            <p><strong>1.25x Curvature Factor:</strong> Calibrated against OpenStreetMap route benchmarks for National Highways (NH-16, NH-44, NH-71) and State corridors in AP.</p>
          </div>
        </div>
      </div>

      {/* Section 2: Deficit Severity Classification Thresholds */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Storage Deficit Severity Index Classification
        </h2>
        <p className="text-xs text-slate-600">
          Net storage gap is evaluated by comparing annual perishable storage demand against operational licensed capacity:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-2">
            <span className="text-xs font-bold text-red-800 uppercase px-2 py-0.5 rounded bg-red-100">
              Critical Deficit
            </span>
            <p className="text-xl font-bold text-red-700">&gt; 95% Gap</p>
            <p className="text-xs text-red-900 leading-relaxed">
              Acute lack of facilities causing severe farm-gate distress sales. E.g. Annamayya tomato belt (98.7% deficit) & Western Kurnool horticulture belt (96.8% deficit).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 space-y-2">
            <span className="text-xs font-bold text-orange-800 uppercase px-2 py-0.5 rounded bg-orange-100">
              High Deficit
            </span>
            <p className="text-xl font-bold text-orange-700">80% - 95% Gap</p>
            <p className="text-xs text-orange-900 leading-relaxed">
              Severe seasonal overflow where available capacity exhausts within first 20 days of peak harvest. E.g. Palnadu, Ananthapuramu, Kadapa, Chittoor.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-yellow-50 border border-yellow-200 space-y-2">
            <span className="text-xs font-bold text-yellow-800 uppercase px-2 py-0.5 rounded bg-yellow-100">
              Moderate Deficit
            </span>
            <p className="text-xl font-bold text-yellow-700">30% - 80% Gap</p>
            <p className="text-xs text-yellow-900 leading-relaxed">
              Substantial existing facilities but requiring modern multi-commodity expansion. E.g. Guntur fresh chilli corridor (38.9% gap) and NTR mango belt.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
            <span className="text-xs font-bold text-emerald-800 uppercase px-2 py-0.5 rounded bg-emerald-100">
              Adequate / Surplus
            </span>
            <p className="text-xl font-bold text-emerald-700">&lt; 30% Gap</p>
            <p className="text-xs text-emerald-900 leading-relaxed">
              Sufficient operational capacity relative to local agricultural acreage. E.g. Visakhapatnam coastal industrial cold chain (12.4% deficit).
            </p>
          </div>
        </div>
      </div>

      {/* Section 3: Recommended Cold Chain Storage Guidelines */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Andhra Pradesh Horticulture Preservation Guidelines
        </h2>
        <p className="text-xs text-slate-600">
          Optimal temperature and humidity envelopes per National Horticulture Board (NHB) specifications:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {[
            { crop: 'Fresh Chilli (Green/Ripened)', temp: '7°C to 10°C', rh: '90% - 95%', days: '28 days', dist: 'Guntur, Palnadu, Kurnool' },
            { crop: 'Tomato (Fresh)', temp: '10°C to 13°C', rh: '85% - 90%', days: '14 days', dist: 'Annamayya, Kurnool' },
            { crop: 'Mango (Benishan)', temp: '10°C to 13°C', rh: '85% - 90%', days: '28 days', dist: 'Krishna, NTR, Chittoor' },
            { crop: 'Banana (Grand Naine)', temp: '13°C to 15°C', rh: '90% - 95%', days: '21 days', dist: 'YSR Kadapa, Anantapur' },
            { crop: 'Sweet Orange (Mosambi)', temp: '5°C to 8°C', rh: '85% - 90%', days: '60 days', dist: 'Ananthapuramu, Nandyal' },
            { crop: 'Turmeric (Raw Rhizome)', temp: '10°C to 12°C', rh: '85% - 90%', days: '90 days', dist: 'Duggirala, Guntur' }
          ].map(c => (
            <div key={c.crop} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <span className="font-bold text-slate-900 block text-sm">{c.crop}</span>
              <p className="text-slate-600">Optimal Temp: <strong className="text-blue-700">{c.temp}</strong></p>
              <p className="text-slate-600">Relative Humidity: <strong className="text-slate-800">{c.rh}</strong></p>
              <p className="text-slate-600">Shelf Life Extension: <strong className="text-emerald-700">{c.days}</strong></p>
              <p className="text-[11px] text-slate-400">Primary Hubs: {c.dist}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
