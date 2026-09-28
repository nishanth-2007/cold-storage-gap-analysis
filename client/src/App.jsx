import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { ROLES } from './config/roles';

// Pages
import LandingPage from './pages/LandingPage';
import FarmerSearchPage from './pages/FarmerSearchPage';
import FarmerDashboardPage from './pages/FarmerDashboardPage';
import FarmerRequestsPage from './pages/FarmerRequestsPage';
import InteractiveMapPage from './pages/InteractiveMapPage';
import ColdStorageDetailPage from './pages/ColdStorageDetailPage';
import GapAnalysisPage from './pages/GapAnalysisPage';
import PotentialLocationsPage from './pages/PotentialLocationsPage';
import MarketInsightsPage from './pages/MarketInsightsPage';
import LoginPage from './pages/LoginPage';
import OwnerDashboardPage from './pages/OwnerDashboardPage';
import PlannerDashboardPage from './pages/PlannerDashboardPage';
import DataSourcesPage from './pages/DataSourcesPage';
import MethodologyPage from './pages/MethodologyPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminLoginPage from './pages/AdminLoginPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-200">
        <Navbar />
        
        <main className="flex-1">
          <Routes>
            {/* Public & Discovery Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/farmer-search" element={<FarmerSearchPage />} />
            <Route path="/map" element={<InteractiveMapPage />} />
            <Route path="/cold-storage/:id" element={<ColdStorageDetailPage />} />
            <Route path="/market-insights" element={<MarketInsightsPage />} />
            <Route path="/methodology" element={<MethodologyPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/owner-login" element={<LoginPage defaultRole="owner" />} />

            {/* Dedicated Particular URL for Admin Login Only */}
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin-portal-login" element={<AdminLoginPage />} />

            {/* Farmer Specific Routes */}
            <Route 
              path="/farmer-dashboard" 
              element={
                <ProtectedRoute allowedRoles={[ROLES.FARMER, ROLES.ADMIN]}>
                  <FarmerDashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/farmer-requests" 
              element={
                <ProtectedRoute allowedRoles={[ROLES.FARMER, ROLES.ADMIN]}>
                  <FarmerRequestsPage />
                </ProtectedRoute>
              } 
            />

            {/* Owner Specific Routes */}
            <Route 
              path="/owner-dashboard" 
              element={
                <ProtectedRoute allowedRoles={[ROLES.OWNER, ROLES.ADMIN]}>
                  <OwnerDashboardPage />
                </ProtectedRoute>
              } 
            />

            {/* Analytical & Planning Routes (Owner, Planner, Admin) */}
            <Route 
              path="/gap-analysis" 
              element={
                <ProtectedRoute allowedRoles={[ROLES.OWNER, ROLES.PLANNER, ROLES.ADMIN]}>
                  <GapAnalysisPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/potential-locations" 
              element={
                <ProtectedRoute allowedRoles={[ROLES.OWNER, ROLES.PLANNER, ROLES.ADMIN]}>
                  <PotentialLocationsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/planner-dashboard" 
              element={
                <ProtectedRoute allowedRoles={[ROLES.PLANNER, ROLES.ADMIN]}>
                  <PlannerDashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/data-sources" 
              element={
                <ProtectedRoute allowedRoles={[ROLES.PLANNER, ROLES.ADMIN]}>
                  <DataSourcesPage />
                </ProtectedRoute>
              } 
            />

            {/* Administrator Console & Direct URL Protection (Admin only - Section 31) */}
            <Route 
              path="/admin-dashboard" 
              element={
                <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                  <AdminDashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                  <AdminDashboardPage initialTab="users" />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/data-import" 
              element={
                <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                  <AdminDashboardPage initialTab="imports" />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                  <AdminDashboardPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
