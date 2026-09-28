import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ROUTE_TITLES = {
  '/': 'AP Cold Storage | Geospatial Gap Analysis & Planning Portal',
  '/farmer-search': 'Find Cold Storage Near You | AP Farmer Portal',
  '/map': 'Interactive GIS Map & Facility Registry | AP Cold Storage',
  '/market-insights': 'Agri-Market Insights & Price Intelligence | AP Cold Storage',
  '/methodology': 'Spatial Gap Analysis Methodology | AP Cold Storage',
  '/login': 'User Sign In | AP Cold Storage Platform',
  '/owner-login': 'Cold Storage Owner Portal | AP Cold Storage',
  '/admin-login': 'Security Portal | System Administrator Login',
  '/admin/login': 'Security Portal | System Administrator Login',
  '/admin-portal-login': 'Security Portal | System Administrator Login',
  '/farmer-dashboard': 'Farmer Dashboard | AP Cold Storage',
  '/farmer-requests': 'Storage Booking Requests | AP Farmer Portal',
  '/owner-dashboard': 'Owner Facility Management Console | AP Cold Storage',
  '/gap-analysis': 'Geospatial Gap Analysis & Cold Chain Deficit | AP Cold Storage',
  '/potential-locations': 'Recommended Potential Locations & AI Clusters | AP Cold Storage',
  '/planner-dashboard': 'Regional Infrastructure Planner Console | AP Cold Storage',
  '/data-sources': 'Government GIS Datasets & Spatial Registry | AP Cold Storage',
  '/admin-dashboard': 'System Administrator Console | AP Cold Storage',
  '/admin/users': 'User Governance & Roles | Admin Console',
  '/admin/data-import': 'Spatial Data Pipeline & Import | Admin Console',
};

export default function PageTitleTracker() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    // Check exact path match
    if (ROUTE_TITLES[path]) {
      document.title = ROUTE_TITLES[path];
      return;
    }

    // Specific route prefixes
    if (path.startsWith('/cold-storage/')) {
      document.title = 'Cold Storage Facility Details | AP Cold Storage';
      return;
    }

    if (path.startsWith('/admin')) {
      document.title = 'System Administrator Console | AP Cold Storage';
      return;
    }

    // General fallback
    document.title = 'AP Cold Storage | Geospatial Gap Analysis & Planning Portal';
  }, [location.pathname]);

  return null;
}
