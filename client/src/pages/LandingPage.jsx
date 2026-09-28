import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Warehouse, 
  Map, 
  Search, 
  BarChart3, 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Activity,
  Layers,
  ChevronRight,
  Sparkles,
  Users,
  CheckCircle2,
  AlertCircle,
  ClipboardList,
  Sprout,
  Sliders,
  History
} from 'lucide-react';
import { fetchApi } from '../services/api';
import authService from '../services/authService';
import DataBadge from '../components/DataBadge';

export default function LandingPage() {
  const [healthData, setHealthData] = useState(null);
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleAuth = () => setCurrentUser(authService.getCurrentUser());
    window.addEventListener('authChange', handleAuth);
    window.addEventListener('storage', handleAuth);
    return () => {
      window.removeEventListener('authChange', handleAuth);
      window.removeEventListener('storage', handleAuth);
    };
  }, []);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await fetchApi('/health');
        setHealthData(data);
      } catch (err) {
        console.warn('Could not fetch health data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const workflowSteps = [
    { number: "01", title: "Government Data", desc: "Horticulture production & registered warehouse registers" },
    { number: "02", title: "Data Processing", desc: "Perishability factors, harvest cycles & marketable surplus" },
    { number: "03", title: "GIS Analysis", desc: "Spatial Haversine road matrix across 26 AP districts" },
    { number: "04", title: "Storage Gap Analysis", desc: "Production volume vs existing cold storage capacity" },
    { number: "05", title: "Live Capacity", desc: "Owner-updated chamber temperatures & available MT" },
    { number: "06", title: "Farmer Recommendation", desc: "Optimal proximity, commodity fit & cost estimates" },
    { number: "07", title: "Potential New Storage Zones", desc: "High-priority investment clusters for unserved farming belts" }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-slate-900 to-slate-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          {/* AP Scope Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Dedicated to Andhra Pradesh, India
          </div>

          {/* Hero Title Required */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Cold Storage Gap Mapping <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
              for Horticulture Produce
            </span>
          </h1>

          {/* Subtitle Required */}
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Find nearby cold-storage capacity, identify infrastructure gaps, and discover potential areas for new cold-storage infrastructure.
          </p>

          {/* Role-Specific Primary Actions (Section 1, 2, 8, 15, 21) */}
          <div className="pt-4">
            {currentUser?.role === 'farmer' ? (
              <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 backdrop-blur-md max-w-2xl mx-auto space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-emerald-300 font-semibold">
                    Active Session: <strong className="text-white">{currentUser.name} (Farmer / FPO)</strong>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-600/80 text-white font-bold">
                    {currentUser.district} Dist
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    to="/farmer-search"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all hover:scale-102"
                  >
                    <Search className="w-4 h-4" />
                    Find Cold Storage
                  </Link>
                  <Link
                    to="/farmer-requests"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs border border-white/20 transition-all hover:scale-102"
                  >
                    <ClipboardList className="w-4 h-4 text-emerald-300" />
                    My Requests
                  </Link>
                  <Link
                    to="/market-insights"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs border border-white/20 transition-all hover:scale-102"
                  >
                    <TrendingUp className="w-4 h-4 text-emerald-300" />
                    Market Rates
                  </Link>
                  <Link
                    to="/farmer-dashboard"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all hover:scale-102"
                  >
                    <Sprout className="w-4 h-4" />
                    Farmer Desk
                  </Link>
                </div>
              </div>
            ) : currentUser?.role === 'owner' ? (
              <div className="p-5 rounded-2xl bg-blue-950/60 border border-blue-500/40 backdrop-blur-md max-w-2xl mx-auto space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-200 font-semibold">
                    Active Session: <strong className="text-white">{currentUser.name} (Storage Owner)</strong>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-600/80 text-white font-bold">
                    {currentUser.district} Dist
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    to="/owner-dashboard"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs shadow-md transition-all hover:scale-102"
                  >
                    <Warehouse className="w-4 h-4" />
                    Owner Dashboard
                  </Link>
                  <Link
                    to="/map"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-md transition-all hover:scale-102"
                  >
                    <Map className="w-4 h-4" />
                    Explore Gap Map
                  </Link>
                  <Link
                    to="/owner-dashboard?tab=capacity"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs border border-white/20 transition-all hover:scale-102"
                  >
                    <Sliders className="w-4 h-4 text-blue-300" />
                    Update Live Capacity
                  </Link>
                  <Link
                    to="/owner-dashboard?tab=demand"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs border border-white/20 transition-all hover:scale-102"
                  >
                    <BarChart3 className="w-4 h-4 text-blue-300" />
                    Nearby Demand
                  </Link>
                </div>
              </div>
            ) : currentUser?.role === 'planner' ? (
              <div className="p-5 rounded-2xl bg-purple-950/60 border border-purple-500/40 backdrop-blur-md max-w-2xl mx-auto space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-purple-200 font-semibold">
                    Active Session: <strong className="text-white">{currentUser.name} (Govt. Planner)</strong>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-600/80 text-white font-bold">
                    Statewide Planning Desk
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    to="/planner-dashboard"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs shadow-md transition-all hover:scale-102"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Planner Dashboard
                  </Link>
                  <Link
                    to="/map"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs border border-white/20 transition-all hover:scale-102"
                  >
                    <Map className="w-4 h-4 text-purple-300" />
                    Gap Map
                  </Link>
                  <Link
                    to="/potential-locations"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all hover:scale-102"
                  >
                    <MapPin className="w-4 h-4" />
                    New Locations
                  </Link>
                </div>
              </div>
            ) : currentUser?.role === 'admin' ? (
              <div className="p-5 rounded-2xl bg-rose-950/60 border border-rose-500/40 backdrop-blur-md max-w-2xl mx-auto space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-rose-200 font-semibold">
                    Active Session: <strong className="text-white">{currentUser.name} (Administrator)</strong>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-rose-600/80 text-white font-bold">
                    Full Platform Access
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    to="/admin-dashboard"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs shadow-md transition-all hover:scale-102"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Admin Desk
                  </Link>
                  <Link
                    to="/admin-dashboard?tab=users"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs border border-white/20 transition-all hover:scale-102"
                  >
                    <Users className="w-4 h-4 text-rose-300" />
                    User Accounts
                  </Link>
                  <Link
                    to="/admin-dashboard?tab=audit"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs border border-white/20 transition-all hover:scale-102"
                  >
                    <History className="w-4 h-4 text-rose-300" />
                    Audit Logs
                  </Link>
                </div>
              </div>
            ) : (
              /* Public / Logged Out Visitor Actions */
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/farmer-search"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/30 transition-all hover:scale-102"
                >
                  <Search className="w-4 h-4" />
                  Find Cold Storage
                </Link>

                <Link
                  to="/map"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-lg shadow-sky-600/30 transition-all hover:scale-102"
                >
                  <Map className="w-4 h-4" />
                  Explore Storage Grid
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-600 shadow-md transition-all hover:scale-102"
                >
                  <Users className="w-4 h-4 text-emerald-400" />
                  Login to Portal
                </Link>
              </div>
            )}
          </div>

          {/* Live Data Badge */}
          <div className="pt-2 flex justify-center">
            <DataBadge
              source="Directorate of Horticulture & AP State Warehouse Registry"
              sourceType="Government"
              className="text-slate-300 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700"
            />
          </div>
        </div>

        {/* Live AP State Metrics Ribbon */}
        <div className="relative max-w-6xl mx-auto mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/80 backdrop-blur-md">
            <p className="text-xs text-slate-400 font-medium">Districts Covered</p>
            <p className="text-2xl font-bold text-white mt-1">26 Districts</p>
            <p className="text-[11px] text-emerald-400 mt-0.5">100% Andhra Pradesh</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/80 backdrop-blur-md">
            <p className="text-xs text-slate-400 font-medium">Mapped Cold Storages</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">
              {healthData?.metrics?.registeredFacilitiesAP || 10}+ Hubs
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Live Occupancy Monitored</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/80 backdrop-blur-md">
            <p className="text-xs text-slate-400 font-medium">Statewide Storage Gap</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">2.4+ Million MT</p>
            <p className="text-[11px] text-amber-300 mt-0.5">Critical Deficit in 8 Districts</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/80 backdrop-blur-md">
            <p className="text-xs text-slate-400 font-medium">Identified New Clusters</p>
            <p className="text-2xl font-bold text-sky-400 mt-1">
              {healthData?.metrics?.potentialHotspotsIdentified || 6} Zones
            </p>
            <p className="text-[11px] text-sky-300 mt-0.5">High Spoilage Risk Catchments</p>
          </div>
        </div>
      </section>

      {/* Four Main Persona Feature Cards Required */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Multi-Stakeholder Platform</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Tailored Tools for the Entire Horticulture Supply Chain
          </h2>
          <p className="text-sm text-slate-600">
            Connecting ground-level farmers, private cold-chain operators, and state planners through transparent spatial intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: FOR FARMERS */}
          <div className="group p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  FOR FARMERS / FPOs
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">Find Suitable Nearby Cold Storage</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Select your AP district, mandal, village, and crop. Instantly discover facilities with live available space, road distances, and estimated storage costs.
                </p>
              </div>
            </div>
            <Link
              to="/farmer-search"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
            >
              Search Storage Now <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: FOR STORAGE OWNERS */}
          <div className="group p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Warehouse className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  FOR STORAGE OWNERS
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">Update Live Storage Availability</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Log in to adjust real-time occupied vs available capacity across chambers. Broadcast vacancies directly to farmers and receive reservation inquiries.
                </p>
              </div>
            </div>
            <Link
              to="/owner-login"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800"
            >
              Access Owner Portal <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: FOR PLANNERS */}
          <div className="group p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  FOR PLANNERS
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">Analyze Production vs Storage</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Explore district-level horticulture yields against operational cold storage capacity. View deficit rankings and perishable crop vulnerability indices.
                </p>
              </div>
            </div>
            <Link
              to="/gap-analysis"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-800"
            >
              View Gap Analysis <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4: FOR INFRASTRUCTURE PLANNING */}
          <div className="group p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  FOR INFRASTRUCTURE PLANNING
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">Identify Potential New Storage Zones</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Algorithmic spatial identification of underserved production belts with high produce at risk, recommended MT sizing, capex estimates, and payback years.
                </p>
              </div>
            </div>
            <Link
              to="/potential-locations"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800"
            >
              Explore New Zones <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Required Workflow Pipeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mb-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">End-to-End Methodology</span>
            <h2 className="text-2xl sm:text-3xl font-bold">The Platform Analytical Workflow</h2>
            <p className="text-sm text-slate-400">
              How authoritative government data transforms into actionable farmer recommendations and infrastructure investment decisions.
            </p>
          </div>

          {/* Workflow Steps Horizontal Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
            {workflowSteps.map((step, idx) => (
              <div 
                key={step.number} 
                className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between hover:border-emerald-500/50 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-emerald-400 font-mono">{step.number}</span>
                    {idx < workflowSteps.length - 1 && (
                      <span className="hidden lg:inline text-slate-500 text-xs">→</span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-100 leading-snug">{step.title}</h4>
                </div>
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Calibrated against NCCD Benchmark Guidelines & AP Horticulture DES Statistics</span>
            </div>
            <Link to="/methodology" className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1">
              Read Mathematical Formulas & Buffer Specifications <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Interactive GIS Preview CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border border-emerald-100 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
              <Map className="w-3.5 h-3.5" />
              <span>Full Spatial AP GIS Engine</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Explore All 26 Districts on the Interactive Leaflet Gap Map
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Visualize live occupancy markers, district deficit heat zones, market yard nodes, and new facility radar hotspots in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/map"
              className="px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
            >
              Launch Interactive Map <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
