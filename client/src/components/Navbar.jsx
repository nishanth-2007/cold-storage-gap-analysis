import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Warehouse, 
  Map, 
  Search, 
  BarChart3, 
  MapPin, 
  TrendingUp, 
  Database, 
  BookOpen, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  Check, 
  Sparkles,
  LogOut,
  ArrowRight,
  Home,
  Sprout,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';
import authService from '../services/authService';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const refreshUser = () => {
    const user = authService.getCurrentUser();
    setCurrentUser(user || null);
  };

  useEffect(() => {
    refreshUser();
    window.addEventListener('authChange', refreshUser);
    window.addEventListener('storage', refreshUser);
    return () => {
      window.removeEventListener('authChange', refreshUser);
      window.removeEventListener('storage', refreshUser);
    };
  }, [location.pathname]);

  useEffect(() => {
    // Close dropdowns on route changes
    setRoleDropdownOpen(false);
    setLoginDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // When switching a role:
  // If clicking on the same user they are already logged in as, navigate to home page ('/')
  // Only land on login page when clicking on another user other than the one already logged in
  const handleRoleSwitch = (newRole) => {
    setRoleDropdownOpen(false);
    setLoginDropdownOpen(false);
    setMobileMenuOpen(false);

    if (currentUser && currentUser.role === newRole) {
      navigate('/');
      return;
    }

    navigate(`/login?role=${newRole}`);
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    window.dispatchEvent(new Event('authChange'));
    setRoleDropdownOpen(false);
    setLoginDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/'); // Always land on home page upon logging out
  };

  const navLinks = [
    { to: '/', label: 'Home', icon: Warehouse },
    { to: '/farmer-search', label: 'Find Storage', icon: Search },
    { to: '/map', label: 'Gap Map', icon: Map },
    { to: '/gap-analysis', label: 'Gap Analysis', icon: BarChart3 },
    { to: '/potential-locations', label: 'New Locations', icon: MapPin },
    { to: '/market-insights', label: 'Market ROI', icon: TrendingUp },
    { to: '/data-sources', label: 'Data Sources', icon: Database },
    { to: '/methodology', label: 'Methodology', icon: BookOpen },
  ];

  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'owner':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planner':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'admin':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'owner': return 'Facility Owner';
      case 'planner': return 'Govt. Planner';
      case 'admin': return 'Administrator';
      default: return 'Farmer / FPO';
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner: Geographic Scope Lock */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
          <span className="flex items-center gap-1.5 font-medium text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            GEOGRAPHIC SCOPE: ANDHRA PRADESH (26 Districts)
          </span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline text-[11px]">
            Authoritative Horticulture & Cold-Chain Spatial Grid • Govt. of AP Standards
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Platform Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Warehouse className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight">
                  Cold Storage Gap Mapping
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                  AP GIS
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Horticulture Produce Logistics</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Login Button (when logged out) OR Role Switcher & Portal (when logged in) */}
          <div className="hidden md:flex items-center gap-2.5">
            {!currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Login</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${loginDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {loginDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3.5 py-2 border-b border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Select User Type</p>
                      <p className="text-xs font-semibold text-slate-700 mt-0.5">Choose persona to log in</p>
                    </div>

                    <div className="py-1 px-1.5 space-y-1">
                      {[
                        { role: 'farmer', label: 'Farmer / FPO', desc: 'Find storage, check mandi rates', icon: Sprout, color: 'text-emerald-700 bg-emerald-50' },
                        { role: 'owner', label: 'Cold Storage Owner', desc: 'Update live chamber capacity', icon: Warehouse, color: 'text-blue-700 bg-blue-50' },
                        { role: 'planner', label: 'Govt. / Planner', desc: 'Statewide gap analytics', icon: BarChart3, color: 'text-purple-700 bg-purple-50' },
                        { role: 'admin', label: 'System Admin', desc: 'Manage facilities & records', icon: ShieldCheck, color: 'text-rose-700 bg-rose-50' },
                      ].map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.role}
                            onClick={() => {
                              setLoginDropdownOpen(false);
                              navigate(`/login?role=${item.role}`);
                            }}
                            className="w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.color}`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{item.label}</p>
                                <p className="text-[11px] text-slate-400">{item.desc}</p>
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* When Logged In: Role Switcher & Quick Portal Link */
              <>
                <div className="relative">
                  <button
                    onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${getRoleBadgeStyle(
                      currentUser?.role
                    )}`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Role: <strong className="font-semibold">{getRoleLabel(currentUser?.role)}</strong></span>
                    <ChevronDown className="w-3 h-3 opacity-60" />
                  </button>

                  {roleDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                      <div className="px-3 py-2 border-b border-slate-100 bg-slate-50/60">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Session</p>
                        <p className="text-xs font-bold text-slate-800 mt-0.5 truncate">{currentUser?.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{currentUser?.organization || currentUser?.email}</p>
                      </div>

                      <div className="px-3 pt-2 pb-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Switch Persona (Go to Login)</p>
                      </div>

                      <div className="py-1">
                        {[
                          { role: 'farmer', label: 'Farmer / FPO', desc: 'Find storage, check mandi rates' },
                          { role: 'owner', label: 'Cold Storage Owner', desc: 'Update live chamber capacity' },
                          { role: 'planner', label: 'Govt. / Planner', desc: 'Statewide gap analytics' },
                          { role: 'admin', label: 'System Admin', desc: 'Manage facilities & records' },
                        ].map((item) => {
                          const isCurrent = currentUser?.role === item.role;
                          return (
                            <button
                              key={item.role}
                              onClick={() => handleRoleSwitch(item.role)}
                              className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                                isCurrent ? 'bg-emerald-50 text-emerald-900 font-semibold' : 'text-slate-700'
                              }`}
                            >
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <p className="font-semibold">{item.label}</p>
                                  {isCurrent && (
                                    <span className="text-[9px] px-1.5 py-0.5 bg-emerald-600 text-white rounded font-bold">
                                      Current (Home)
                                    </span>
                                  )}
                                </div>
                                <p className="text-[10px] text-slate-400 font-normal">
                                  {isCurrent ? 'Already logged in • Click to go to Home Page' : item.desc}
                                </p>
                              </div>
                              {isCurrent ? (
                                <Home className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      <div className="px-3 pt-2 border-t border-slate-100 flex justify-between items-center text-[11px]">
                        <Link
                          to="/"
                          onClick={() => setRoleDropdownOpen(false)}
                          className="text-emerald-700 hover:underline font-bold flex items-center gap-1"
                        >
                          <Home className="w-3 h-3" />
                          Home Page
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <LogOut className="w-3 h-3" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Contextual Dashboard Link */}
                {currentUser?.role === 'owner' && (
                  <Link
                    to="/owner-dashboard"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 shadow-xs"
                  >
                    Owner Portal
                  </Link>
                )}
                {currentUser?.role === 'planner' && (
                  <Link
                    to="/planner-dashboard"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-semibold hover:bg-purple-700 shadow-xs"
                  >
                    Planner Desk
                  </Link>
                )}
                {currentUser?.role === 'admin' && (
                  <Link
                    to="/admin-dashboard"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-semibold hover:bg-rose-700 shadow-xs"
                  >
                    Admin Desk
                  </Link>
                )}
                {currentUser?.role === 'farmer' && (
                  <Link
                    to="/farmer-search"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 shadow-xs"
                  >
                    Find Storage
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          {/* If NOT logged in: Show Login & Select Persona */}
          {!currentUser ? (
            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-2">
              <p className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider">Login / Select User Type</p>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { role: 'farmer', label: 'Farmer / FPO' },
                  { role: 'owner', label: 'Cold Storage Owner' },
                  { role: 'planner', label: 'Govt. / Planner' },
                  { role: 'admin', label: 'System Admin' }
                ].map((item) => (
                  <button
                    key={item.role}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate(`/login?role=${item.role}`);
                    }}
                    className="px-2.5 py-2 rounded-lg text-xs font-bold bg-white text-slate-800 border border-emerald-200 hover:bg-emerald-100 text-center shadow-2xs cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* If Logged in: Show Active persona & Switch/Sign out */
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Logged In Session</p>
                  <p className="text-xs font-bold text-slate-800 truncate">{currentUser?.name}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-[11px] font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 px-2 py-1 bg-white rounded-lg border border-rose-200 shadow-2xs cursor-pointer"
                >
                  <LogOut className="w-3 h-3" />
                  Sign Out
                </button>
              </div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider pt-1 border-t border-slate-200">
                Switch Persona
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {['farmer', 'owner', 'planner', 'admin'].map((role) => {
                  const isCurrent = currentUser?.role === role;
                  return (
                    <button
                      key={role}
                      onClick={() => {
                        handleRoleSwitch(role);
                        setMobileMenuOpen(false);
                      }}
                      className={`px-2 py-1.5 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                        isCurrent ? getRoleBadgeStyle(role) : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div>{getRoleLabel(role)}</div>
                      {isCurrent && <div className="text-[9px] font-bold text-emerald-700">(Active - Home)</div>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold ${
                    isActive ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-emerald-600" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
