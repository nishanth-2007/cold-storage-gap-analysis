import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Warehouse, Lock, Mail, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { authService } from '../services/authService';

export default function OwnerLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('owner@ap.gov.in');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authService.login(email, password);
      navigate('/owner-dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('password123');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
          <Warehouse className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Cold Storage Operator Portal</h1>
        <p className="text-xs text-slate-500">
          Secure check-in for facility managers to update live chamber capacities and process farmer reservations.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Official Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                placeholder="operator@ap.gov.in"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Access Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Quick Demo Credentials Autofill */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center">
            One-Click Demo Accounts
          </p>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <button
              onClick={() => handleFillDemo('owner@ap.gov.in')}
              className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 font-medium text-left border border-blue-200 transition-colors"
            >
              <div className="font-bold">Storage Owner</div>
              <div className="text-[10px] text-blue-700">owner@ap.gov.in</div>
            </button>

            <button
              onClick={() => handleFillDemo('planner@ap.gov.in')}
              className="p-2 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 font-medium text-left border border-purple-200 transition-colors"
            >
              <div className="font-bold">Govt. Planner</div>
              <div className="text-[10px] text-purple-700">planner@ap.gov.in</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
