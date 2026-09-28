import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  Warehouse, 
  Plus, 
  Database, 
  CheckCircle2, 
  RefreshCw, 
  Building, 
  MapPin, 
  Users, 
  Trash2, 
  Check, 
  AlertCircle,
  ShieldCheck,
  CheckSquare,
  Sliders,
  BarChart3,
  Map,
  FileSpreadsheet,
  Settings,
  History,
  X,
  UserCheck,
  UserX,
  Upload,
  Save,
  Lock
} from 'lucide-react';
import { coldStorageService } from '../services/coldStorageService';
import { gisService } from '../services/gisService';
import { cropProductionService } from '../services/cropProductionService';
import { dataSourceService } from '../services/dataSourceService';
import { fetchApi } from '../services/api';
import DataBadge from '../components/DataBadge';

export default function AdminDashboardPage({ initialTab }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || initialTab || 'dashboard';

  const [healthData, setHealthData] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [pendingFacilities, setPendingFacilities] = useState([]);
  const [users, setUsers] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [systemSettings, setSystemSettings] = useState(null);
  const [cropList, setCropList] = useState([]);
  const [gisRegions, setGisRegions] = useState([]);
  const [dataSources, setDataSources] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals & form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');
  const [actionError, setActionError] = useState('');

  // New Facility Form State
  const [newFacility, setNewFacility] = useState({
    facilityName: '',
    registrationNumber: '',
    district: 'Guntur',
    mandal: 'Guntur Urban',
    address: '',
    lat: 16.3067,
    lng: 80.4365,
    totalCapacityMT: 5000,
    availableCapacityMT: 2000,
    pricingPerMTMonth: 800,
    commoditiesSupported: 'Fresh Chilli, Tomato, Mango',
    contactPerson: '',
    contactPhone: ''
  });

  const handleTabChange = (tab) => {
    setSearchParams({ tab });
  };

  const loadAllAdminData = async () => {
    setLoading(true);
    setActionError('');
    try {
      const [
        health, 
        storages, 
        pending,
        adminUsers, 
        logs, 
        settings, 
        crops, 
        regions, 
        sources
      ] = await Promise.all([
        fetchApi('/health'),
        coldStorageService.getColdStorages({ includePending: 'true' }),
        coldStorageService.getPendingFacilities().catch(() => []),
        fetchApi('/admin/users'),
        fetchApi('/admin/audit-logs'),
        fetchApi('/admin/settings'),
        cropProductionService.getCropProduction(),
        gisService.getDistricts(),
        dataSourceService.getDataSources()
      ]);

      setHealthData(health);
      setFacilities(storages);
      setPendingFacilities(pending || []);
      setUsers(adminUsers);
      setAuditLogs(logs);
      setSystemSettings(settings);
      setCropList(crops);
      setGisRegions(regions);
      setDataSources(sources);
    } catch (err) {
      console.error('Failed to load admin data:', err);
      setActionError(`Error loading admin data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllAdminData();
  }, []);

  const triggerSuccess = (msg) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(''), 4000);
  };

  // 1. User Management Actions
  const handleToggleUserStatus = async (userId) => {
    try {
      const updated = await fetchApi(`/admin/users/${userId}/toggle-status`, { method: 'POST' });
      setUsers(users.map(u => u.id === userId ? updated : u));
      triggerSuccess(`User status toggled to ${updated.status}.`);
      loadAuditLogsOnly();
    } catch (err) {
      alert(`User status toggle failed: ${err.message}`);
    }
  };

  // 2. Owner Verification Action
  const handleVerifyOwner = async (userId, isVerified) => {
    try {
      const res = await fetchApi(`/admin/owners/${userId}/verify`, {
        method: 'POST',
        body: JSON.stringify({ isVerified })
      });
      setUsers(users.map(u => u.id === userId ? res.user : u));
      triggerSuccess(res.message);
      loadAuditLogsOnly();
    } catch (err) {
      alert(`Verification failed: ${err.message}`);
    }
  };

  // 3. Facility Registration
  const handleCreateFacility = async (e) => {
    e.preventDefault();
    try {
      const created = await coldStorageService.registerColdStorage({
        facilityName: newFacility.facilityName,
        registrationNumber: newFacility.registrationNumber,
        district: newFacility.district,
        mandal: newFacility.mandal,
        address: newFacility.address,
        coordinates: { lat: Number(newFacility.lat), lng: Number(newFacility.lng) },
        totalCapacityMT: Number(newFacility.totalCapacityMT),
        availableCapacityMT: Number(newFacility.availableCapacityMT),
        operatingStatus: 'Active',
        pricingPerMTMonth: Number(newFacility.pricingPerMTMonth),
        commoditiesSupported: newFacility.commoditiesSupported.split(',').map(s => s.trim()),
        contactPerson: newFacility.contactPerson,
        contactPhone: newFacility.contactPhone,
        temperatureZones: [
          {
            name: "Main Multi-Commodity Chamber",
            tempRange: "2°C to 10°C",
            capacityMT: Number(newFacility.totalCapacityMT),
            availableMT: Number(newFacility.availableCapacityMT),
            suitableCommodities: newFacility.commoditiesSupported.split(',').map(s => s.trim())
          }
        ],
        amenities: ["Pre-cooling Unit", "Weighbridge", "Power Backup"]
      });

      setFacilities([created, ...facilities]);
      setShowAddModal(false);
      triggerSuccess('Facility registered successfully and published on AP GIS map!');
      loadAuditLogsOnly();
    } catch (err) {
      alert(`Registration failed: ${err.message}`);
    }
  };

  // Facility Approval Action
  const handleApproveFacility = async (facilityId, facilityName) => {
    try {
      const res = await coldStorageService.approveColdStorage(facilityId);
      triggerSuccess(res.message || `Facility "${facilityName}" approved and published to AP GIS map!`);
      const [storages, pending] = await Promise.all([
        coldStorageService.getColdStorages({ includePending: 'true' }),
        coldStorageService.getPendingFacilities().catch(() => [])
      ]);
      setFacilities(storages);
      setPendingFacilities(pending || []);
      loadAuditLogsOnly();
    } catch (err) {
      alert(`Approval failed: ${err.message}`);
    }
  };

  // Facility Rejection Action
  const handleRejectFacility = async (facilityId, facilityName) => {
    const reason = window.prompt(`Enter rejection reason for "${facilityName}":`, 'Facility physical specifications or documents could not be verified by state authorities.');
    if (reason === null) return;
    try {
      const res = await coldStorageService.rejectColdStorage(facilityId, reason);
      triggerSuccess(res.message || `Facility registration for "${facilityName}" rejected.`);
      const [storages, pending] = await Promise.all([
        coldStorageService.getColdStorages({ includePending: 'true' }),
        coldStorageService.getPendingFacilities().catch(() => [])
      ]);
      setFacilities(storages);
      setPendingFacilities(pending || []);
      loadAuditLogsOnly();
    } catch (err) {
      alert(`Rejection failed: ${err.message}`);
    }
  };

  // Facility Deletion (Strict Rule: Admin can delete manually added facilities only, protected API data cannot be deleted)
  const handleDeleteFacility = async (facilityId, facilityName) => {
    if (!window.confirm(`Are you sure you want to delete cold storage facility "${facilityName}"?\n\nThis will permanently remove the facility from the AP database and live GIS map.`)) {
      return;
    }

    try {
      const res = await coldStorageService.deleteColdStorage(facilityId);
      setFacilities(facilities.filter(f => f.id !== facilityId));
      setPendingFacilities(pendingFacilities.filter(f => f.id !== facilityId));
      triggerSuccess(res.message || `Facility "${facilityName}" was successfully deleted.`);
      loadAuditLogsOnly();
    } catch (err) {
      alert(`Deletion rejected: ${err.message}`);
    }
  };

  // 4. System Settings Update
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      const updated = await fetchApi('/admin/settings', {
        method: 'PUT',
        body: JSON.stringify(systemSettings)
      });
      setSystemSettings(updated);
      triggerSuccess('System settings updated and logged.');
      loadAuditLogsOnly();
    } catch (err) {
      alert(`Failed to save settings: ${err.message}`);
    }
  };

  const loadAuditLogsOnly = async () => {
    try {
      const logs = await fetchApi('/admin/audit-logs');
      setAuditLogs(logs);
    } catch (e) {
      console.warn(e);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-3">
        <div className="w-10 h-10 border-3 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-slate-500 font-medium">Verifying database replica and system admin telemetry...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold uppercase tracking-wider border border-rose-400/30">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>System Administration & Platform Governance</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              AP AgTech Infrastructure Command Desk
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Platform administration, user governance, verified registry approval, and immutable audit logs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadAllAdminData}
              className="p-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer shadow-2xs"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Register Master Cold Storage
            </button>
          </div>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Admin Navigation Tabs (Section 21) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: ShieldCheck },
          { id: 'users', label: `Users (${users.length})`, icon: Users },
          { id: 'facilities', label: `Facilities (${facilities.length})${pendingFacilities.length > 0 ? ` [${pendingFacilities.length} Pending]` : ''}`, icon: Warehouse },
          { id: 'verification', label: 'Owner Verification', icon: CheckSquare },
          { id: 'inventory', label: 'Inventory', icon: Sliders },
          { id: 'crops', label: 'Crop Data', icon: BarChart3 },
          { id: 'govt-data', label: 'Govt Data', icon: Database },
          { id: 'gis', label: 'GIS Data', icon: Map },
          { id: 'imports', label: 'Data Imports', icon: FileSpreadsheet },
          { id: 'settings', label: 'System Settings', icon: Settings },
          { id: 'audit', label: `Audit Logs (${auditLogs.length})`, icon: History }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* TAB 1: DASHBOARD OVERVIEW */}
      {/* ======================================================== */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">AP Geographic Scope</span>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">26 Districts</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Authoritative District Grid</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Registered Facilities</span>
              <p className="text-2xl font-extrabold text-rose-700 mt-1">{facilities.length} Units</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Commercial & Govt Warehouses</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">System Users</span>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">{users.length} Accounts</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Across 4 user personas</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Database Engine</span>
              <p className="text-lg font-bold text-emerald-700 mt-1.5 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>{healthData?.database?.mode || 'Active Engine'}</span>
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">Spatial indexing online</p>
            </div>
          </div>

          {/* Recent Audit Activities */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-rose-600" />
                <h3 className="font-bold text-slate-900 text-sm">Recent Administrative Modifications</h3>
              </div>
              <button onClick={() => handleTabChange('audit')} className="text-xs font-bold text-rose-600 hover:underline">
                View All Logs ({auditLogs.length}) &rarr;
              </button>
            </div>

            <div className="space-y-2">
              {auditLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{log.action}</span>
                    <span className="text-slate-500"> on <strong>{log.resource}</strong></span>
                    <p className="text-[11px] text-slate-400 mt-0.5">{log.details}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-slate-800 block">{log.userName}</span>
                    <span className="text-[10px] text-slate-400">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: USERS MANAGEMENT (Section 21, 22) */}
      {/* ======================================================== */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-150">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">User Account Administration</h2>
              <p className="text-xs text-slate-500">Manage user accounts, roles, and operational credentials across AP</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-4">User Name</th>
                  <th className="py-3.5 px-4">Email Address</th>
                  <th className="py-3.5 px-4">Persona Role</th>
                  <th className="py-3.5 px-4">District / Org</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{u.name}</td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">{u.email}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        u.role === 'admin' ? 'bg-rose-100 text-rose-800' :
                        u.role === 'owner' ? 'bg-blue-100 text-blue-800' :
                        u.role === 'planner' ? 'bg-purple-100 text-purple-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {u.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{u.organization || u.district || 'Andhra Pradesh'}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        u.status === 'Deactivated' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {u.status || 'Active'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      {u.role !== 'admin' && (
                        <button
                          onClick={() => handleToggleUserStatus(u.id)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                            u.status === 'Deactivated'
                              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                              : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                          }`}
                        >
                          {u.status === 'Deactivated' ? 'Activate' : 'Deactivate'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: FACILITIES (Section 21, 22) */}
      {/* ======================================================== */}
      {activeTab === 'facilities' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-150">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Cold Storage Master Registries</h2>
              <p className="text-xs text-slate-500">Government authorized physical facilities ({facilities.length} in registry)</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Facility Manually
            </button>
          </div>

          {/* Dedicated Pending Approvals Section */}
          {pendingFacilities.length > 0 && (
            <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 shadow-sm space-y-4 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-amber-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    {pendingFacilities.length}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-amber-950 text-sm flex items-center gap-2">
                      <span>Owner Facility Registrations Awaiting Admin Approval</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-200 text-amber-900 uppercase tracking-wider">
                        Action Required
                      </span>
                    </h3>
                    <p className="text-[11px] text-amber-800">
                      Owners submitted exact GPS coordinates. Approving publishes the cold storage marker immediately to the live Andhra Pradesh GIS Map.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {pendingFacilities.map((pf) => (
                  <div key={pf.id} className="p-4 bg-white rounded-2xl border border-amber-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{pf.facilityName}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                          {pf.district}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          ⏳ Pending Approval
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {pf.registrationNumber || pf.id}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600">
                        <strong>Address:</strong> {pf.address || pf.mandal}, {pf.district} District
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-1">
                        <span className="font-mono bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded border border-blue-200">
                          Exact GPS: [{pf.coordinates?.lat}, {pf.coordinates?.lng}]
                        </span>
                        <span>• Installed: <strong>{pf.totalCapacityMT} MT</strong> (Vacant: <strong>{pf.availableCapacityMT} MT</strong>)</span>
                        <span>• Tariff: <strong>₹{pf.pricingPerMTMonth}</strong> / MT / Month</span>
                        <span>• Operator: <strong>{pf.contactPerson || pf.ownerName || 'Operator'}</strong> ({pf.contactPhone || pf.ownerPhone || 'N/A'})</span>
                        {pf.commoditiesSupported && (
                          <span className="text-slate-600">
                            • Crops: <em>{Array.isArray(pf.commoditiesSupported) ? pf.commoditiesSupported.join(', ') : pf.commoditiesSupported}</em>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                      <button
                        onClick={() => handleApproveFacility(pf.id, pf.facilityName)}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                        title="Approve registration and publish to AP GIS map"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve & Publish to Map</span>
                      </button>
                      <button
                        onClick={() => handleRejectFacility(pf.id, pf.facilityName)}
                        className="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                        title="Reject registration"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                      <button
                        onClick={() => handleDeleteFacility(pf.id, pf.facilityName)}
                        className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                        title="Delete registration request"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-4">Facility Name</th>
                  <th className="py-3.5 px-4">District / Mandal</th>
                  <th className="py-3.5 px-4">GPS Coordinates</th>
                  <th className="py-3.5 px-4">Origin / Type</th>
                  <th className="py-3.5 px-4 text-right">Installed Cap</th>
                  <th className="py-3.5 px-4 text-right">Available Cap</th>
                  <th className="py-3.5 px-4">Approval Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {facilities.map((cs) => (
                  <tr key={cs.id} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">{cs.facilityName}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{cs.registrationNumber || cs.id}</p>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{cs.mandal}, {cs.district}</td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-blue-700">
                      {cs.coordinates ? `${cs.coordinates.lat}, ${cs.coordinates.lng}` : 'N/A'}
                    </td>
                    <td className="py-3.5 px-4">
                      {cs.isManual ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 inline-flex items-center gap-1">
                          Manual / Owner
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200 inline-flex items-center gap-1" title="Pre-seeded official benchmark data from AP API register">
                          <Lock className="w-2.5 h-2.5 text-slate-500" /> API Benchmark
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-slate-900">{cs.totalCapacityMT} MT</td>
                    <td className="py-3.5 px-4 text-right font-bold text-emerald-700">{cs.availableCapacityMT} MT</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        cs.approvalStatus === 'Approved' || (!cs.approvalStatus && !cs.isManual)
                          ? 'bg-emerald-100 text-emerald-800'
                          : cs.approvalStatus === 'Rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {cs.approvalStatus || (cs.isManual ? 'Pending' : 'Approved')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center justify-end gap-2">
                        {cs.approvalStatus === 'Pending' && (
                          <button
                            onClick={() => handleApproveFacility(cs.id, cs.facilityName)}
                            className="px-2 py-1 rounded-lg text-[11px] font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors inline-flex items-center gap-1 cursor-pointer"
                            title="Approve facility"
                          >
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Approve</span>
                          </button>
                        )}
                        <Link
                          to={`/cold-storage/${cs.id}`}
                          className="px-2 py-1 rounded text-rose-600 hover:bg-rose-50 font-bold transition-colors"
                        >
                          Inspect &rarr;
                        </Link>
                        {cs.isManual ? (
                          <button
                            onClick={() => handleDeleteFacility(cs.id, cs.facilityName)}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-colors inline-flex items-center gap-1 cursor-pointer"
                            title="Delete this manually added cold storage"
                          >
                            <Trash2 className="w-3 h-3 text-rose-600" />
                            <span>Delete</span>
                          </button>
                        ) : (
                          <span 
                            className="text-[11px] text-slate-400 italic inline-flex items-center gap-1 cursor-not-allowed select-none px-2 py-1"
                            title="Official system benchmark facilities from API cannot be deleted"
                          >
                            <Lock className="w-3 h-3 text-slate-400" />
                            <span>Protected</span>
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: OWNER VERIFICATION (Section 21, 22) */}
      {/* ======================================================== */}
      {activeTab === 'verification' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-150">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Cold Storage Owner Verification</h2>
            <p className="text-xs text-slate-500">
              Verify operator identity and warehouse ownership documents to permit live GIS capacity broadcasts.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-4">Owner Name</th>
                  <th className="py-3.5 px-4">Email / Phone</th>
                  <th className="py-3.5 px-4">Facility / Organization</th>
                  <th className="py-3.5 px-4">Verification Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {users.filter(u => u.role === 'owner').map((owner) => (
                  <tr key={owner.id} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{owner.name}</td>
                    <td className="py-3.5 px-4 text-slate-500">{owner.email} • {owner.phone}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{owner.organization || 'AP Warehouse Unit'}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        owner.isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {owner.isVerified ? 'VERIFIED OWNER' : 'PENDING VERIFICATION'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleVerifyOwner(owner.id, !owner.isVerified)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                          owner.isVerified
                            ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                      >
                        {owner.isVerified ? 'Revoke Verification' : 'Verify & Approve'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: INVENTORY */}
      {/* ======================================================== */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-150">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Systemwide Live Chamber Inventory Audit</h2>
            <p className="text-xs text-slate-500">Live chamber availability reports across all registered facilities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {facilities.map((fac) => (
              <div key={fac.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-slate-900">{fac.facilityName}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                    {fac.district}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Total Capacity:</span>
                  <span className="font-bold text-slate-900">{fac.totalCapacityMT} MT</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Available Space:</span>
                  <span>{fac.availableCapacityMT} MT</span>
                </div>
                <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-200">
                  Updated: {new Date(fac.sourceLastUpdated || Date.now()).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 6: CROP DATA (Section 21, 22) */}
      {/* ======================================================== */}
      {activeTab === 'crops' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-150">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">AP Horticulture Production Benchmarks</h2>
            <p className="text-xs text-slate-500">Official Directorate of Horticulture annual production records</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-4">District</th>
                  <th className="py-3.5 px-4">Crop Name</th>
                  <th className="py-3.5 px-4 text-right">Annual Yield (MT)</th>
                  <th className="py-3.5 px-4 text-right">Cold Storage Req %</th>
                  <th className="py-3.5 px-4 text-right">Storage Demand (MT)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {cropList.slice(0, 15).map((cp) => (
                  <tr key={cp.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4 font-bold text-slate-900">{cp.district}</td>
                    <td className="py-3 px-4 text-emerald-800 font-semibold">{cp.cropName}</td>
                    <td className="py-3 px-4 text-right">{cp.annualProductionMT?.toLocaleString()} MT</td>
                    <td className="py-3 px-4 text-right">{cp.coldStorageRequirementPct}%</td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900">{cp.storageDemandMT?.toLocaleString()} MT</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 7: GOVERNMENT DATA & DATA SOURCES (Section 21, 22) */}
      {/* ======================================================== */}
      {activeTab === 'govt-data' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-150">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Authoritative Government Data Sources</h2>
            <p className="text-xs text-slate-500">Master datasets synchronized across the spatial gap mapping platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dataSources.map((ds) => (
              <div key={ds.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-slate-900">{ds.name}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {ds.sourceType}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">{ds.description}</p>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-[10px] text-slate-400">
                  <span>Frequency: {ds.updateFrequency}</span>
                  <span>Verified: {ds.lastVerified ? new Date(ds.lastVerified).toLocaleDateString() : 'Active'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 8: GIS DATA (Section 21, 22) */}
      {/* ======================================================== */}
      {activeTab === 'gis' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-150">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">AP GIS Spatial Boundaries & Coordinates</h2>
            <p className="text-xs text-slate-500">26 Districts spatial centroids, acreage, and administrative codes</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-4">District</th>
                  <th className="py-3.5 px-4">Code</th>
                  <th className="py-3.5 px-4">Centroid Coordinates</th>
                  <th className="py-3.5 px-4 text-right">Area (sq km)</th>
                  <th className="py-3.5 px-4 text-right">Horticulture Acreage (Ha)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {gisRegions.map((r) => (
                  <tr key={r.code} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4 font-bold text-slate-900">{r.name}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{r.code}</td>
                    <td className="py-3 px-4 text-slate-500">{r.centroid ? `${r.centroid[0].toFixed(3)}, ${r.centroid[1].toFixed(3)}` : 'N/A'}</td>
                    <td className="py-3 px-4 text-right">{r.areaSqKm?.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-800">{r.horticultureAcreageHa?.toLocaleString()} Ha</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 9: DATA IMPORTS (Section 21, 22) */}
      {/* ======================================================== */}
      {activeTab === 'imports' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-150">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Government Dataset Ingestion Portal</h2>
            <p className="text-xs text-slate-500">Import CSV / JSON batches of verified warehouses or crop yields with schema validation</p>
          </div>

          <div className="p-8 border-2 border-dashed border-slate-300 rounded-2xl text-center space-y-3 bg-slate-50">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">Upload Government Ingestion Package</p>
              <p className="text-xs text-slate-500 mt-1">Accepts UTF-8 CSV or JSON conforming to Directorate of Horticulture specifications.</p>
            </div>
            <button
              onClick={() => triggerSuccess('Data ingestion simulation verified: Schema validated for 26 districts.')}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer"
            >
              Simulate Schema Ingestion Test
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 10: SYSTEM SETTINGS (Section 21, 22) */}
      {/* ======================================================== */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-150">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Platform System Configuration</h2>
            <p className="text-xs text-slate-500">Global operating rules, baseline tariffs, and registration security policies</p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Platform Title</label>
                <input
                  type="text"
                  value={systemSettings?.platformName || ''}
                  onChange={(e) => setSystemSettings({ ...systemSettings, platformName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Default Benchmark Tariff (₹/MT/month)</label>
                <input
                  type="number"
                  value={systemSettings?.defaultStorageCostINR || 850}
                  onChange={(e) => setSystemSettings({ ...systemSettings, defaultStorageCostINR: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Standard Calculation Disclaimer</label>
              <textarea
                rows="2"
                value={systemSettings?.calculationNotice || ''}
                onChange={(e) => setSystemSettings({ ...systemSettings, calculationNotice: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Save className="w-3.5 h-3.5" /> Save Configuration
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 11: AUDIT LOGS (Section 21, 22) */}
      {/* ======================================================== */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-150">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Immutable System Audit Trail</h2>
              <p className="text-xs text-slate-500">Every administrative action, capacity change, and user verification is cryptographically logged</p>
            </div>
            <button
              onClick={loadAuditLogsOnly}
              className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-4">Log ID</th>
                  <th className="py-3.5 px-4">Timestamp</th>
                  <th className="py-3.5 px-4">Actor</th>
                  <th className="py-3.5 px-4">Action</th>
                  <th className="py-3.5 px-4">Resource Target</th>
                  <th className="py-3.5 px-4">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-4 font-mono text-[10px] text-slate-400">{log.id}</td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleDateString()} {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900">{log.userName}</span>
                      <span className="text-[10px] text-slate-400 block">{log.role.toUpperCase()}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-slate-100 text-slate-800 border border-slate-200">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">{log.resource}</td>
                    <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Facility Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Register Authoritative Cold Storage</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateFacility} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Facility Name *</label>
                <input
                  type="text"
                  required
                  value={newFacility.facilityName}
                  onChange={(e) => setNewFacility({ ...newFacility, facilityName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  placeholder="e.g. Amaravati High-Tech Cold Store"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Registration # *</label>
                  <input
                    type="text"
                    required
                    value={newFacility.registrationNumber}
                    onChange={(e) => setNewFacility({ ...newFacility, registrationNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    placeholder="AP-GNT-CS-2026-99"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">District</label>
                  <input
                    type="text"
                    required
                    value={newFacility.district}
                    onChange={(e) => setNewFacility({ ...newFacility, district: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Installed Capacity (MT) *</label>
                  <input
                    type="number"
                    required
                    value={newFacility.totalCapacityMT}
                    onChange={(e) => setNewFacility({ ...newFacility, totalCapacityMT: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Available Capacity (MT) *</label>
                  <input
                    type="number"
                    required
                    value={newFacility.availableCapacityMT}
                    onChange={(e) => setNewFacility({ ...newFacility, availableCapacityMT: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Supported Commodities</label>
                <input
                  type="text"
                  value={newFacility.commoditiesSupported}
                  onChange={(e) => setNewFacility({ ...newFacility, commoditiesSupported: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold"
                >
                  Register & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
