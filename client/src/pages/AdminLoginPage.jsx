import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Building, 
  AlertCircle, 
  CheckCircle2, 
  ArrowLeft,
  KeyRound
} from 'lucide-react';
import { authService } from '../services/authService';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/admin-dashboard';

  const [email, setEmail] = useState('admin@ap.gov.in');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // If already logged in as admin, redirect to admin dashboard immediately
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user && user.role === 'admin') {
      navigate('/admin-dashboard', { replace: true });
    }
  }, [navigate]);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const data = await authService.login(email.trim(), password);
      
      // Strict role verification: only admin allowed through this particular portal
      if (!data.user || data.user.role !== 'admin') {
        authService.logout();
        throw new Error('Access Denied: The provided account does not have System Administrator privileges.');
      }

      window.dispatchEvent(new Event('authChange'));
      setSuccessMsg('Administrative authentication verified! Accessing secure console...');

      setTimeout(() => {
        navigate(redirectTarget, { replace: true });
      }, 1000);
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check administrator credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoFill = () => {
    setEmail('admin@ap.gov.in');
    setPassword('password123');
    setError('');
  };

  return (
    <div className="min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 flex flex-col justify-center items-center">
      <div className="max-w-md w-full space-y-6">
        {/* Top Restricted Badge */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider border border-rose-500/30 shadow-lg">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Restricted Gateway • Authorized Officials Only</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Central Administrative Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Government of Andhra Pradesh • Cold Storage & GIS Registry Control
          </p>
        </div>

        {/* Security Warning Notice */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/80 text-xs text-slate-300 shadow-xl space-y-1">
          <div className="font-bold text-slate-200 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-rose-400" />
            <span>Dedicated Administrative URL Authentication</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            This portal is isolated from public user authentication. Public users, cold storage operators, and farmers should use the standard citizen portal.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-900">Administrator Sign In</h2>
                <p className="text-[11px] text-slate-500">Provide official government credentials</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="text-[10px] font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1.5 rounded-lg border border-rose-200 transition-colors cursor-pointer"
              title="Auto-fill default admin credentials"
            >
              Fill Demo Admin
            </button>
          </div>

          {/* Success Banner */}
          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2.5 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">{successMsg}</span>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-start gap-2.5 shadow-2xs">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5 flex-1">
                <p className="font-bold">Authentication Refused</p>
                <p className="text-[11px] text-rose-800">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            {/* Admin Email */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">
                Administrator Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="admin@ap.gov.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <span className="text-[10px] text-slate-400">Default administrative email: admin@ap.gov.in</span>
            </div>

            {/* Admin Password */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">
                Security Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter administrator password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-rose-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Administrative Authority...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Authorize & Access Admin Console</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Return Link */}
          <div className="pt-3 border-t border-slate-100 text-center">
            <Link
              to="/login"
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public User Login (Farmer / Owner / Planner)</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
