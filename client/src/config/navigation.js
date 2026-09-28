// Central Navigation Configuration for Role-Based User Experience
// Strictly respects Section 1, 2, 8, 15, 21, 24, 28 of specifications

import { 
  Warehouse, 
  Search, 
  ClipboardList, 
  TrendingUp, 
  Map, 
  BarChart3, 
  MapPin, 
  Database, 
  BookOpen, 
  FileText, 
  Layers, 
  Users, 
  ShieldCheck, 
  Building, 
  Cpu, 
  FileDown, 
  Settings, 
  FileSpreadsheet, 
  History,
  Home,
  Sliders,
  CheckSquare
} from 'lucide-react';
import { ROLES } from './roles';

// 1. Farmer / FPO Navigation
// Primary purpose: "Where can I store my crop and quantity?"
// Strictly minimal, no complex GIS/infrastructure planning analytics.
export const farmerNavigation = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/farmer-search', label: 'Find Storage', icon: Search },
  { to: '/farmer-requests', label: 'My Requests', icon: ClipboardList },
  { to: '/market-insights', label: 'Market Rates', icon: TrendingUp },
  { to: '/map', label: 'Nearby Map', icon: Map, isOptional: true }
];

// 2. Cold Storage Owner Navigation
// Primary purpose: "How is my facility performing, how much capacity is available, and where is nearby demand / new expansion areas?"
export const ownerNavigation = [
  { to: '/owner-dashboard', label: 'Dashboard', icon: Warehouse },
  { to: '/owner-dashboard?tab=facility', label: 'My Facility', icon: Building },
  { to: '/owner-dashboard?tab=capacity', label: 'Live Capacity', icon: Sliders },
  { to: '/owner-dashboard?tab=demand', label: 'Nearby Demand', icon: BarChart3 },
  { to: '/map', label: 'Gap Map', icon: Map },
  { to: '/owner-dashboard?tab=gap-analysis', label: 'Gap Analysis', icon: MapPin },
  { to: '/market-insights', label: 'Market / ROI', icon: TrendingUp },
  { to: '/owner-dashboard?tab=expansion', label: 'Expansion Opportunities', icon: Layers }
];

// 3. Government / Planner Navigation
// Primary purpose: "Where is storage infrastructure insufficient, and where might new infrastructure be needed?"
export const plannerNavigation = [
  { to: '/planner-dashboard', label: 'Dashboard', icon: BarChart3 },
  { to: '/map', label: 'Gap Map', icon: Map },
  { to: '/gap-analysis', label: 'Gap Analysis', icon: BarChart3 },
  { to: '/potential-locations', label: 'New Locations', icon: MapPin },
  { to: '/market-insights', label: 'Market Insights', icon: TrendingUp },
  { to: '/data-sources', label: 'Data Sources', icon: Database },
  { to: '/methodology', label: 'Methodology', icon: BookOpen },
  { to: '/planner-dashboard?tab=reports', label: 'Reports', icon: FileText }
];

// 4. System Admin Navigation
// Primary purpose: System administration and data management.
export const adminNavigation = [
  { to: '/admin-dashboard', label: 'Dashboard', icon: ShieldCheck },
  { to: '/admin-dashboard?tab=users', label: 'Users', icon: Users },
  { to: '/admin-dashboard?tab=facilities', label: 'Facilities', icon: Warehouse },
  { to: '/admin-dashboard?tab=verification', label: 'Verification', icon: CheckSquare },
  { to: '/admin-dashboard?tab=inventory', label: 'Inventory', icon: Sliders },
  { to: '/admin-dashboard?tab=crops', label: 'Crops', icon: BarChart3 },
  { to: '/admin-dashboard?tab=govt-data', label: 'Govt Data', icon: Database },
  { to: '/admin-dashboard?tab=gis', label: 'GIS Data', icon: Map },
  { to: '/admin-dashboard?tab=imports', label: 'Imports', icon: FileSpreadsheet },
  { to: '/admin-dashboard?tab=settings', label: 'Settings', icon: Settings },
  { to: '/admin-dashboard?tab=audit', label: 'Audit', icon: History }
];

// 5. Public Navigation (when visitor is logged out)
export const publicNavigation = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/farmer-search', label: 'Find Storage', icon: Search },
  { to: '/market-insights', label: 'Market Rates', icon: TrendingUp },
  { to: '/methodology', label: 'Methodology', icon: BookOpen }
];

export function getNavigationForRole(role) {
  switch (role) {
    case ROLES.FARMER:
      return farmerNavigation;
    case ROLES.OWNER:
      return ownerNavigation;
    case ROLES.PLANNER:
      return plannerNavigation;
    case ROLES.ADMIN:
      return adminNavigation;
    default:
      return publicNavigation;
  }
}

export default {
  farmerNavigation,
  ownerNavigation,
  plannerNavigation,
  adminNavigation,
  publicNavigation,
  getNavigationForRole
};
