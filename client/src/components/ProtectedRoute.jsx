import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home, Warehouse, BarChart3, Sprout, ShieldCheck } from 'lucide-react';
import authService from '../services/authService';
import { ROLE_LABELS, ROLES } from '../config/roles';

export default function ProtectedRoute({ allowedRoles = [], children }) {
  const location = useLocation();
  const currentUser = authService.getCurrentUser();

  // If not logged in, redirect to login page (or dedicated /admin-login if targeting admin routes)
  if (!currentUser) {
    const isAdminRoute = location.pathname.startsWith('/admin') || (allowedRoles.length === 1 && allowedRoles.includes(ROLES.ADMIN));
    const targetUrl = isAdminRoute ? '/admin-login' : '/login';
    return <Navigate to={`${targetUrl}?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Check if role is authorized
  const isAuthorized = allowedRoles.length === 0 || allowedRoles.includes(currentUser.role);

  if (!isAuthorized) {
    const userRoleLabel = ROLE_LABELS[currentUser.role] || currentUser.role;
    const allowedLabels = allowedRoles.map(r => ROLE_LABELS[r] || r).join(', ');

    const getRoleDashboardPath = (role) => {
      switch (role) {
        case ROLES.OWNER: return '/owner-dashboard';
        case ROLES.PLANNER: return '/planner-dashboard';
        case ROLES.ADMIN: return '/admin-dashboard';
        default: return '/farmer-search';
      }
    };

    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-rose-100 shadow-xl p-6 sm:p-8 text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200">
              HTTP 403 • Access Restricted
            </span>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Role Permission Denied
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              This module requires authorization not granted to your current active persona.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-1.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-medium">Your Active Persona:</span>
              <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                {userRoleLabel}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-medium">Required Persona:</span>
              <span className="font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                {allowedLabels}
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <Link
              to={getRoleDashboardPath(currentUser.role)}
              className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Back to My Portal</span>
            </Link>
            <Link
              to="/"
              className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Platform Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
