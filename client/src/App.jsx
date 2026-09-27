import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import FarmerSearchPage from './pages/FarmerSearchPage';
import InteractiveMapPage from './pages/InteractiveMapPage';
import ColdStorageDetailPage from './pages/ColdStorageDetailPage';
import GapAnalysisPage from './pages/GapAnalysisPage';
import PotentialLocationsPage from './pages/PotentialLocationsPage';
import MarketInsightsPage from './pages/MarketInsightsPage';
import OwnerLoginPage from './pages/OwnerLoginPage';
import OwnerDashboardPage from './pages/OwnerDashboardPage';
import PlannerDashboardPage from './pages/PlannerDashboardPage';
import DataSourcesPage from './pages/DataSourcesPage';
import MethodologyPage from './pages/MethodologyPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-200">
        <Navbar />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/farmer-search" element={<FarmerSearchPage />} />
            <Route path="/map" element={<InteractiveMapPage />} />
            <Route path="/cold-storage/:id" element={<ColdStorageDetailPage />} />
            <Route path="/gap-analysis" element={<GapAnalysisPage />} />
            <Route path="/potential-locations" element={<PotentialLocationsPage />} />
            <Route path="/market-insights" element={<MarketInsightsPage />} />
            <Route path="/owner-login" element={<OwnerLoginPage />} />
            <Route path="/owner-dashboard" element={<OwnerDashboardPage />} />
            <Route path="/planner-dashboard" element={<PlannerDashboardPage />} />
            <Route path="/data-sources" element={<DataSourcesPage />} />
            <Route path="/methodology" element={<MethodologyPage />} />
            <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
