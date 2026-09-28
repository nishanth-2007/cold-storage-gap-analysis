// Central Client Role & Permission Definitions
// Cold Storage Gap Mapping - Andhra Pradesh

export const ROLES = {
  FARMER: 'farmer',
  OWNER: 'owner',
  PLANNER: 'planner',
  ADMIN: 'admin'
};

export const ROLE_LABELS = {
  [ROLES.FARMER]: 'Farmer / FPO',
  [ROLES.OWNER]: 'Cold Storage Owner',
  [ROLES.PLANNER]: 'Government / Planner / Researcher',
  [ROLES.ADMIN]: 'System Admin'
};

export const PERMISSIONS = {
  // Public & Discovery
  FIND_STORAGE: 'find_storage',
  STORAGE_DETAILS: 'storage_details',
  REQUEST_STORAGE: 'request_storage',
  MY_REQUESTS: 'my_requests',
  
  // Owner Operations
  LIVE_CAPACITY_UPDATE: 'live_capacity_update',
  OWNER_FACILITY_MANAGEMENT: 'owner_facility_management',
  NEARBY_DEMAND: 'nearby_demand',
  
  // Planning & Analytics
  GAP_ANALYSIS: 'gap_analysis',
  GAP_MAP: 'gap_map',
  NEW_STORAGE_LOCATIONS: 'new_storage_locations',
  MARKET_RATES: 'market_rates',
  MARKET_ROI: 'market_roi',
  
  // Government & Admin
  GOVERNMENT_DATA: 'government_data',
  DATA_IMPORT: 'data_import',
  GIS_DATA_MANAGEMENT: 'gis_data_management',
  USER_MANAGEMENT: 'user_management',
  SYSTEM_SETTINGS: 'system_settings',
  AUDIT_LOGS: 'audit_logs'
};

export const ROLE_PERMISSIONS = {
  [ROLES.FARMER]: [
    PERMISSIONS.FIND_STORAGE,
    PERMISSIONS.STORAGE_DETAILS,
    PERMISSIONS.REQUEST_STORAGE,
    PERMISSIONS.MY_REQUESTS,
    PERMISSIONS.MARKET_RATES
  ],
  [ROLES.OWNER]: [
    PERMISSIONS.FIND_STORAGE,
    PERMISSIONS.STORAGE_DETAILS,
    PERMISSIONS.REQUEST_STORAGE,
    PERMISSIONS.LIVE_CAPACITY_UPDATE,
    PERMISSIONS.OWNER_FACILITY_MANAGEMENT,
    PERMISSIONS.NEARBY_DEMAND,
    PERMISSIONS.GAP_ANALYSIS,
    PERMISSIONS.GAP_MAP,
    PERMISSIONS.NEW_STORAGE_LOCATIONS,
    PERMISSIONS.MARKET_RATES,
    PERMISSIONS.MARKET_ROI
  ],
  [ROLES.PLANNER]: [
    PERMISSIONS.FIND_STORAGE,
    PERMISSIONS.STORAGE_DETAILS,
    PERMISSIONS.NEARBY_DEMAND,
    PERMISSIONS.GAP_ANALYSIS,
    PERMISSIONS.GAP_MAP,
    PERMISSIONS.NEW_STORAGE_LOCATIONS,
    PERMISSIONS.MARKET_RATES,
    PERMISSIONS.MARKET_ROI,
    PERMISSIONS.GOVERNMENT_DATA
  ],
  [ROLES.ADMIN]: [
    PERMISSIONS.FIND_STORAGE,
    PERMISSIONS.STORAGE_DETAILS,
    PERMISSIONS.REQUEST_STORAGE,
    PERMISSIONS.MY_REQUESTS,
    PERMISSIONS.LIVE_CAPACITY_UPDATE,
    PERMISSIONS.OWNER_FACILITY_MANAGEMENT,
    PERMISSIONS.NEARBY_DEMAND,
    PERMISSIONS.GAP_ANALYSIS,
    PERMISSIONS.GAP_MAP,
    PERMISSIONS.NEW_STORAGE_LOCATIONS,
    PERMISSIONS.MARKET_RATES,
    PERMISSIONS.MARKET_ROI,
    PERMISSIONS.GOVERNMENT_DATA,
    PERMISSIONS.DATA_IMPORT,
    PERMISSIONS.GIS_DATA_MANAGEMENT,
    PERMISSIONS.USER_MANAGEMENT,
    PERMISSIONS.SYSTEM_SETTINGS,
    PERMISSIONS.AUDIT_LOGS
  ]
};

export function hasPermission(role, permission) {
  if (!role) return false;
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}

export function isRoleAllowed(userRole, allowedRoles = []) {
  if (!userRole) return false;
  return allowedRoles.includes(userRole);
}

export default {
  ROLES,
  ROLE_LABELS,
  PERMISSIONS,
  ROLE_PERMISSIONS,
  hasPermission,
  isRoleAllowed
};
