import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { 
  Warehouse, 
  Lock, 
  Mail, 
  Phone,
  User, 
  ArrowRight, 
  ShieldCheck, 
  Building, 
  MapPin, 
  Sprout, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  Info,
  Layers,
  BarChart3
} from 'lucide-react';
import { authService } from '../services/authService';

const AP_DISTRICTS = [
  "Alluri Sitharama Raju", "Anakapalli", "Ananthapuramu", "Annamayya", "Bapatla", 
  "Chittoor", "Dr. B.R. Ambedkar Konaseema", "East Godavari", "Eluru", "Guntur", 
  "Kakinada", "Krishna", "Kurnool", "Nandyal", "NTR", "Palnadu", 
  "Parvathipuram Manyam", "Prakasam", "Sri Potti Sriramulu Nellore", "Sri Sathya Sai", 
  "Srikakulam", "Tirupati", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"
];

const AP_CROPS = [
  "Fresh Chilli",
  "Tomato",
  "Mango",
  "Banana",
  "Sweet Orange",
  "Turmeric",
  "Papaya",
  "Lime / Citrus",
  "Cashew",
  "Vegetables (Mixed)"
];

const ROLE_CONFIGS = {
  farmer: {
    key: 'farmer',
    label: 'Farmer / FPO',
    badge: 'Rythu & FPO Portal',
    title: 'Farmer & FPO Producer Portal',
    subtitle: 'Find suitable nearby cold storages, negotiate storage rates, view live vacancy, and prevent distress sales.',
    icon: Sprout,
    themeColor: 'emerald',
    bannerBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-800',
    accentBtn: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    demoUser: {
      email: 'farmer@ap.gov.in',
      name: 'Srinivasa Rao',
      org: 'Guntur Fresh Chilli Rythu Mithra FPO',
      district: 'Guntur'
    },
    defaultRedirect: '/farmer-search',
    allowSignUp: true
  },
  owner: {
    key: 'owner',
    label: 'Cold Storage Owner',
    badge: 'Facility Operator Portal',
    title: 'Cold Storage Operator Portal',
    subtitle: 'Update live chamber capacities, manage multi-commodity temperature zones, and accept farmer reservations.',
    icon: Warehouse,
    themeColor: 'blue',
    bannerBg: 'bg-blue-500/10 border-blue-500/20 text-blue-800',
    accentBtn: 'bg-blue-600 hover:bg-blue-700 text-white',
    demoUser: {
      email: 'owner@ap.gov.in',
      name: 'Venkat Reddy',
      org: 'Krishna Godavari Cold Chain Logistics Ltd',
      district: 'Guntur'
    },
    defaultRedirect: '/owner-dashboard',
    allowSignUp: true
  },
  planner: {
    key: 'planner',
    label: 'Govt. / Planner',
    badge: 'Policy & Infra Planning Desk',
    title: 'Government & Planning Analytics Portal',
    subtitle: 'Horticulture production demand analytics, NCCD storage deficit models, and cold-chain infrastructure planning.',
    icon: BarChart3,
    themeColor: 'purple',
    bannerBg: 'bg-purple-500/10 border-purple-500/20 text-purple-800',
    accentBtn: 'bg-purple-600 hover:bg-purple-700 text-white',
    demoUser: {
      email: 'planner@ap.gov.in',
      name: 'Dr. K. Lakshmi Narayana',
      org: 'AP Directorate of Horticulture & Agri Infra Mission',
      district: 'NTR'
    },
    defaultRedirect: '/planner-dashboard',
    allowSignUp: false // User rule: Do not add sign up for Govt
  },
  admin: {
    key: 'admin',
    label: 'System Admin',
    badge: 'Central GIS Administration',
    title: 'System Administrator Console',
    subtitle: 'Manage cold storage facilities, audit verified capacities, and update district GIS boundary datasets.',
    icon: ShieldCheck,
    themeColor: 'rose',
    bannerBg: 'bg-rose-500/10 border-rose-500/20 text-rose-800',
    accentBtn: 'bg-rose-600 hover:bg-rose-700 text-white',
    demoUser: {
      email: 'admin@ap.gov.in',
      name: 'System Administrator',
      org: 'AP AgTech GIS Data Management Center',
      district: 'Guntur'
    },
    defaultRedirect: '/admin-dashboard',
    allowSignUp: false // User rule: Do not add sign up for Admin
  }
};

export default function LoginPage({ defaultRole }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active Role determination
  const roleParam = searchParams.get('role');
  const [activeRole, setActiveRole] = useState(
    roleParam && ROLE_CONFIGS[roleParam] ? roleParam : (defaultRole || 'farmer')
  );

  // Tab: 'login' or 'signup'
  const [authMode, setAuthMode] = useState('login');

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  // Registration Form State (Farmer or Owner)
  const [regData, setRegData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    district: 'Guntur',
    mandal: '',
    village: '',
    organization: '',
    primaryCrop: 'Fresh Chilli',
    // Owner specific
    facilityName: '',
    regNumber: '',
    totalCapacityMT: 5000
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Synchronize with URL search params
  useEffect(() => {
    if (roleParam && ROLE_CONFIGS[roleParam]) {
      setActiveRole(roleParam);
      // Pre-fill demo email for convenience
      setEmail(ROLE_CONFIGS[roleParam].demoUser.email);
      setPassword('password123');
      setError(null);
      setSuccessMsg(null);
      // If switched to admin or planner, force login mode since signup is disabled
      if (!ROLE_CONFIGS[roleParam].allowSignUp) {
        setAuthMode('login');
      }
    }
  }, [roleParam]);

  // When active role changes internally
  const handleRoleChange = (roleKey) => {
    setActiveRole(roleKey);
    setSearchParams({ role: roleKey });
    setEmail(ROLE_CONFIGS[roleKey].demoUser.email);
    setPassword('password123');
    setError(null);
    setSuccessMsg(null);
    if (!ROLE_CONFIGS[roleKey].allowSignUp) {
      setAuthMode('login');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const data = await authService.login(email.trim(), password);
      // Dispatch custom event for immediate Navbar synchronization
      window.dispatchEvent(new Event('authChange'));
      
      const config = ROLE_CONFIGS[activeRole];
      const targetPath = config ? config.defaultRedirect : '/';
      navigate(targetPath);
    } catch (err) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (regData.password !== regData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (regData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: regData.name.trim(),
        email: regData.email.trim(),
        phone: regData.phone.trim(),
        password: regData.password,
        role: activeRole,
        district: regData.district,
        mandal: regData.mandal.trim(),
        village: regData.village.trim(),
        organization: activeRole === 'farmer' 
          ? (regData.organization || `${regData.name}'s Farm`) 
          : regData.facilityName,
        facilityName: regData.facilityName,
        totalCapacityMT: Number(regData.totalCapacityMT) || 5000,
        primaryCrop: regData.primaryCrop
      };

      const result = await authService.register(payload);
      window.dispatchEvent(new Event('authChange'));

      setSuccessMsg('Account registered successfully! Redirecting...');
      setTimeout(() => {
        const config = ROLE_CONFIGS[activeRole];
        navigate(config ? config.defaultRedirect : '/');
      }, 1000);
    } catch (err) {
      setError(err.message || 'Registration failed. Please check inputs.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoFill = () => {
    const config = ROLE_CONFIGS[activeRole];
    if (config) {
      setEmail(config.demoUser.email);
      setPassword('password123');
      setError(null);
    }
  };

  const currentConfig = ROLE_CONFIGS[activeRole] || ROLE_CONFIGS.farmer;
  const RoleIcon = currentConfig.icon;

  return (
    <div className="min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-100/80 via-white to-slate-50 flex flex-col justify-center">
      <div className="max-w-xl mx-auto w-full space-y-6">

        {/* Role Persona Switcher Tabs */}
        <div className="bg-white p-1.5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between gap-1 overflow-x-auto">
          {Object.values(ROLE_CONFIGS).map((item) => {
            const Icon = item.icon;
            const isSelected = activeRole === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleRoleChange(item.key)}
                className={`flex-1 min-w-[105px] py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                  isSelected
                    ? `${item.accentBtn} shadow-sm ring-1 ring-black/5`
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Card Header & Description */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className={`p-6 sm:p-7 border-b border-slate-100 transition-colors ${currentConfig.bannerBg}`}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-200/60 flex items-center justify-center text-slate-800 shrink-0">
                <RoleIcon className="w-6 h-6 text-slate-700" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/80 border border-slate-200/60">
                  {currentConfig.badge}
                </span>
                <h1 className="text-xl font-bold text-slate-900 mt-1">
                  {currentConfig.title}
                </h1>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              {currentConfig.subtitle}
            </p>
          </div>

          {/* Mode Switcher (Sign In vs Create Account) */}
          {currentConfig.allowSignUp && (
            <div className="flex border-b border-slate-100 bg-slate-50/60 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-3 text-center transition-all ${
                  authMode === 'login'
                    ? 'bg-white text-slate-900 border-b-2 border-emerald-600 font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Sign In to Account
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-3 text-center transition-all ${
                  authMode === 'signup'
                    ? 'bg-white text-slate-900 border-b-2 border-emerald-600 font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                + Create New Account
              </button>
            </div>
          )}

          {/* Card Body */}
          <div className="p-6 sm:p-8 space-y-5">
            {/* Feedback Messages */}
            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}
            {successMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Special Notice for Government / Planner (No Sign-Up) */}
            {activeRole === 'planner' && (
              <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 text-xs text-purple-900 space-y-2">
                <div className="flex items-center gap-2 font-bold text-purple-800">
                  <Info className="w-4 h-4 shrink-0 text-purple-600" />
                  <span>Open Public & Official Access Policy</span>
                </div>
                <p className="text-[11px] leading-relaxed text-purple-800/90">
                  The Andhra Pradesh Horticulture Storage Gap Analytics platform is accessible for public researchers, agricultural planners, and department officials. <strong>Self-registration is not required.</strong> You can access directly using the official planning credentials below.
                </p>
              </div>
            )}

            {/* Special Notice for System Admin (No Sign-Up) */}
            {activeRole === 'admin' && (
              <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 text-xs text-rose-900 space-y-2">
                <div className="flex items-center gap-2 font-bold text-rose-800">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>Restricted Administrator Console</span>
                </div>
                <p className="text-[11px] leading-relaxed text-rose-800/90">
                  System administrative authority is strictly delegated to designated personnel at the AP AgTech GIS Data Management Center. <strong>Public account self-registration is disabled.</strong>
                </p>
              </div>
            )}

            {/* SIGN IN FORM */}
            {authMode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {activeRole === 'farmer' ? 'Email Address or Registered Phone' : 'Official Email Address'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={currentConfig.demoUser.email}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-bold text-slate-700">Access Password</label>
                    <span className="text-[11px] text-slate-400">Demo: password123</span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 ${currentConfig.accentBtn}`}
                >
                  {loading ? 'Authenticating...' : `Sign In to ${currentConfig.label} Desk`}
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Pre-filled One-Click Demo Credentials Quick Autofill */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Configured User Profile
                      </p>
                      <p className="text-xs font-bold text-slate-800">{currentConfig.demoUser.name}</p>
                      <p className="text-[11px] text-slate-500">{currentConfig.demoUser.org}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleQuickDemoFill}
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-bold shadow-2xs transition-all flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Autofill
                    </button>
                  </div>
                </div>

                {/* Create Account link for Farmer and Owner */}
                {currentConfig.allowSignUp && (
                  <div className="text-center pt-2">
                    <p className="text-xs text-slate-500">
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setAuthMode('signup')}
                        className="font-bold text-emerald-700 hover:underline"
                      >
                        Create a new {currentConfig.label} account
                      </button>
                    </p>
                  </div>
                )}
              </form>
            ) : (
              /* CREATE ACCOUNT / REGISTRATION FORM (Farmers and Owners) */
              <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {activeRole === 'farmer' ? 'Farmer / Representative Name' : 'Facility Operator Name'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={regData.name}
                      onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                      placeholder="e.g. Ramesh Naidu"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mobile Contact Phone *</label>
                    <input
                      type="tel"
                      required
                      value={regData.phone}
                      onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                      placeholder="+91 94400 12345"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={regData.email}
                    onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                    placeholder={activeRole === 'farmer' ? 'farmer@domain.com' : 'operator@coldchain.com'}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Role Specific Fields */}
                {activeRole === 'farmer' ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Andhra Pradesh District *</label>
                        <select
                          value={regData.district}
                          onChange={(e) => setRegData({ ...regData, district: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
                        >
                          {AP_DISTRICTS.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Primary Produce Crop *</label>
                        <select
                          value={regData.primaryCrop}
                          onChange={(e) => setRegData({ ...regData, primaryCrop: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
                        >
                          {AP_CROPS.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Mandal / Tehsil</label>
                        <input
                          type="text"
                          value={regData.mandal}
                          onChange={(e) => setRegData({ ...regData, mandal: e.target.value })}
                          placeholder="e.g. Duggirala"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Village / FPO Organization</label>
                        <input
                          type="text"
                          value={regData.organization}
                          onChange={(e) => setRegData({ ...regData, organization: e.target.value })}
                          placeholder="e.g. Rythu Mithra FPO"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  /* Owner Specific Fields */
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Cold Storage Facility Name *</label>
                        <input
                          type="text"
                          required
                          value={regData.facilityName}
                          onChange={(e) => setRegData({ ...regData, facilityName: e.target.value })}
                          placeholder="e.g. Amaravati Agro Cold Hub"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Total Capacity (MT) *</label>
                        <input
                          type="number"
                          required
                          min="100"
                          max="50000"
                          value={regData.totalCapacityMT}
                          onChange={(e) => setRegData({ ...regData, totalCapacityMT: e.target.value })}
                          placeholder="5000"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Andhra Pradesh District *</label>
                        <select
                          value={regData.district}
                          onChange={(e) => setRegData({ ...regData, district: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-blue-500"
                        >
                          {AP_DISTRICTS.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Mandal / City *</label>
                        <input
                          type="text"
                          required
                          value={regData.mandal}
                          onChange={(e) => setRegData({ ...regData, mandal: e.target.value })}
                          placeholder="e.g. Guntur Urban"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Create Password *</label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={regData.password}
                      onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                      placeholder="At least 6 characters"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Confirm Password *</label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={regData.confirmPassword}
                      onChange={(e) => setRegData({ ...regData, confirmPassword: e.target.value })}
                      placeholder="Repeat password"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 ${currentConfig.accentBtn}`}
                >
                  {loading ? 'Creating Account...' : `Register & Enter ${currentConfig.label} Portal`}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center pt-2">
                  <p className="text-xs text-slate-500">
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className="font-bold text-emerald-700 hover:underline"
                    >
                      Sign In with your credentials
                    </button>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Security & Data Integrity Footer */}
        <div className="text-center text-[11px] text-slate-400 space-y-1">
          <p>Andhra Pradesh State Cold Chain Management Information System</p>
          <p>Integrated with NHB • AP AgTech GIS • NCCD Cold Chain Benchmarks</p>
        </div>
      </div>
    </div>
  );
}
