import React from 'react';
import { Link } from 'react-router-dom';
import { Warehouse, ShieldCheck, Database, ExternalLink, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Platform Overview */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Warehouse className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-base">Cold Storage Gap Mapping</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Integrated spatial logistics and infrastructure deficit analysis platform dedicated exclusively to 
              <strong className="text-emerald-400 font-semibold"> Andhra Pradesh, India</strong>. Empowering farmers, warehouse operators, and policymakers.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1.5 rounded-lg w-fit">
              <MapPin className="w-3.5 h-3.5" />
              <span>Scope: 26 Districts of Andhra Pradesh</span>
            </div>
          </div>

          {/* Col 2: Farmer & Operator Tools */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-100 mb-3">Farmer & Trade Tools</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/farmer-search" className="hover:text-emerald-400 transition-colors">Find Nearby Cold Storage</Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-emerald-400 transition-colors">Interactive AP GIS Map</Link>
              </li>
              <li>
                <Link to="/market-insights" className="hover:text-emerald-400 transition-colors">Mandi Arrivals & Storage ROI</Link>
              </li>
              <li>
                <Link to="/owner-login" className="hover:text-emerald-400 transition-colors">Storage Owner Live Portal</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Research & Planning */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-100 mb-3">Planning & Policy</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/gap-analysis" className="hover:text-emerald-400 transition-colors">District Storage Gap Analysis</Link>
              </li>
              <li>
                <Link to="/potential-locations" className="hover:text-emerald-400 transition-colors">Potential New Storage Zones</Link>
              </li>
              <li>
                <Link to="/planner-dashboard" className="hover:text-emerald-400 transition-colors">Government Planner Command Desk</Link>
              </li>
              <li>
                <Link to="/methodology" className="hover:text-emerald-400 transition-colors">GIS & Deficit Formula Methodology</Link>
              </li>
              <li>
                <Link to="/data-sources" className="hover:text-emerald-400 transition-colors">Authoritative Data Provenance</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Data Governance & Institutional Citations */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-100 mb-3">Data Governance</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Spatial layers calibrated against Department of Horticulture (Govt. of AP), NCCD Cold Storage Census, and APAMB e-NAM Mandis.
            </p>
            <div className="space-y-1.5 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Strict Provenance Tagging</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-blue-400" />
                <span>Live Owner Check-ins & Audit Logs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 Cold Storage Gap Mapping Platform for Horticulture Produce — Andhra Pradesh.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <Link to="/methodology" className="hover:text-slate-200">Methodology</Link>
            <Link to="/data-sources" className="hover:text-slate-200">Data Sources</Link>
            <Link to="/admin-dashboard" className="hover:text-slate-200">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
