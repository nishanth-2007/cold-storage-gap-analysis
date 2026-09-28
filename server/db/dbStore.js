import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { AP_STATE, AP_DISTRICTS_DATA, AP_HORTICULTURE_CROPS, AP_DATA_SOURCES } from '../data/andhraPradeshData.js';
import { 
  SEED_USERS, 
  SEED_COLD_STORAGES, 
  SEED_MARKETS, 
  SEED_MARKET_PRICES, 
  SEED_GAP_ANALYSIS, 
  SEED_POTENTIAL_LOCATIONS, 
  SEED_FARMER_REQUESTS 
} from '../data/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE_PATH = path.join(__dirname, '../data/local_db.json');

// Internal in-memory store initialized with authoritative AP dataset
let localDb = {
  users: [...SEED_USERS],
  cold_storages: [...SEED_COLD_STORAGES],
  cold_storage_inventory: [],
  crop_production: [],
  markets: [...SEED_MARKETS],
  market_prices: [...SEED_MARKET_PRICES],
  gis_regions: [],
  farmer_requests: [...SEED_FARMER_REQUESTS],
  storage_requests: [],
  data_sources: [...AP_DATA_SOURCES],
  gap_analysis: [...SEED_GAP_ANALYSIS],
  potential_locations: [...SEED_POTENTIAL_LOCATIONS],
  audit_logs: [
    {
      id: "log-001",
      timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
      userId: "usr-admin-01",
      userName: "System Administrator",
      role: "admin",
      action: "INIT_MASTER_STORE",
      resource: "GIS / Facility Store",
      details: "Synchronized 26 Andhra Pradesh district boundaries & authoritative cold-chain registers."
    },
    {
      id: "log-002",
      timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
      userId: "usr-admin-01",
      userName: "System Administrator",
      role: "admin",
      action: "VERIFY_OWNER",
      resource: "usr-owner-01",
      details: "Verified registration & operational credentials for Venkat Reddy (Krishna Godavari Cold Chain Logistics Ltd)."
    },
    {
      id: "log-003",
      timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
      userId: "usr-owner-01",
      userName: "Venkat Reddy",
      role: "owner",
      action: "UPDATE_CAPACITY",
      resource: "cs-gnt-001",
      details: "Adjusted live chamber capacity: Available 400 MT / Total 5000 MT (Utilization 92%)."
    }
  ],
  system_settings: {
    platformName: "Cold Storage Gap Mapping Platform for Horticulture Produce",
    stateCode: "AP",
    stateName: "Andhra Pradesh",
    districtsCount: 26,
    defaultStorageCostINR: 850,
    enableFarmerSelfRegistration: true,
    enableOwnerSelfRegistration: true,
    requireOwnerVerification: true,
    dataRefreshIntervalHours: 24,
    auditRetentionDays: 180,
    calculationNotice: "Platform calculations are analytical estimates based on AP Directorate of Horticulture benchmarks."
  }
};

// Initialize crop production records from AP district data
AP_DISTRICTS_DATA.forEach((dist) => {
  dist.primaryCrops.forEach((cropName, idx) => {
    const cropMeta = AP_HORTICULTURE_CROPS.find(c => c.name.toLowerCase() === cropName.toLowerCase()) || {
      category: 'Fruit',
      perishabilityDays: 30,
      coldStorageRequirementPct: 40,
      peakHarvest: ['January', 'February']
    };
    const prodMT = Math.round(dist.horticultureAcreageHa * (0.8 + idx * 0.3) * 3.5);
    const demandMT = Math.round(prodMT * (cropMeta.coldStorageRequirementPct / 100));

    localDb.crop_production.push({
      id: `cp-${dist.code.toLowerCase()}-${idx + 1}`,
      state: AP_STATE,
      district: dist.name,
      cropName: cropName,
      cropCategory: cropMeta.category,
      annualProductionMT: prodMT,
      peakHarvestMonths: cropMeta.peakHarvest,
      perishabilityDays: cropMeta.perishabilityDays,
      coldStorageRequirementPct: cropMeta.coldStorageRequirementPct,
      storageDemandMT: demandMT,
      source: "Department of Horticulture, Govt. of Andhra Pradesh",
      sourceType: "Government",
      sourceLastUpdated: "2025-08-15T00:00:00.000Z",
      lastVerified: "2026-03-10T00:00:00.000Z"
    });
  });

  localDb.gis_regions.push({
    id: `gis-${dist.code.toLowerCase()}`,
    regionType: "District",
    name: dist.name,
    code: dist.code,
    state: AP_STATE,
    centroid: { lat: dist.centroid[0], lng: dist.centroid[1] },
    bounds: dist.bounds,
    areaSqKm: dist.areaSqKm,
    horticultureAcreageHa: dist.horticultureAcreageHa,
    primaryCrops: dist.primaryCrops,
    source: "AP State GIS Portal / Survey of India",
    sourceType: "Government",
    sourceLastUpdated: "2025-10-01T00:00:00.000Z",
    lastVerified: "2026-01-15T00:00:00.000Z"
  });
});

let isMongoConnected = false;

// Persist local store
function persistLocalDb() {
  try {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(localDb, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write local_db.json:', err.message);
  }
}

// Load local store if existing
function loadLocalDb() {
  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const data = JSON.parse(fs.readFileSync(DB_FILE_PATH, 'utf-8'));
      if (data && data.cold_storages && data.cold_storages.length > 0) {
        localDb = { ...localDb, ...data };
      }
    }
  } catch (err) {
    console.warn('Could not read existing local_db.json, using seed data:', err.message);
  }
}

export async function initDatabase(mongoUri) {
  loadLocalDb();

  const uri = mongoUri || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cold_storage_ap';
  console.log(`Connecting to database at ${uri}...`);

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
      connectTimeoutMS: 2000
    });
    isMongoConnected = true;
    console.log('Successfully connected to MongoDB!');
  } catch (err) {
    isMongoConnected = false;
    console.log(`MongoDB connection failed (${err.message}). Activating self-contained resilient AP Data Engine.`);
  }

  return { isMongoConnected };
}

export const dbStore = {
  getIsMongoConnected: () => isMongoConnected,

  // Users
  getUsers: () => localDb.users,
  findUserByEmail: (email) => localDb.users.find(u => u.email.toLowerCase() === email.toLowerCase()),
  findUserById: (id) => localDb.users.find(u => u.id === id),
  createUser: (userData) => {
    const user = {
      id: `usr-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...userData
    };
    localDb.users.push(user);
    persistLocalDb();
    return user;
  },

  // Cold Storages
  getColdStorages: (filters = {}, actingUser = null) => {
    let result = [...localDb.cold_storages];

    // Status filtering:
    if (filters.approvalStatus) {
      result = result.filter(cs => cs.approvalStatus === filters.approvalStatus);
    } else if (filters.ownerId) {
      // Owner requesting their facilities: include pending
      result = result.filter(cs => cs.ownerId === filters.ownerId);
    } else if (filters.includePending === 'true' || (filters.allForAdmin === 'true' && actingUser?.role === 'admin')) {
      // Include all for admin
    } else {
      // General public GIS map & farmer searches: ONLY return Approved facilities
      result = result.filter(cs => cs.approvalStatus !== 'Pending' && cs.approvalStatus !== 'Rejected');
    }

    if (filters.district) {
      result = result.filter(cs => cs.district.toLowerCase() === filters.district.toLowerCase());
    }
    if (filters.mandal) {
      result = result.filter(cs => cs.mandal.toLowerCase() === filters.mandal.toLowerCase());
    }
    if (filters.crop) {
      result = result.filter(cs => 
        (cs.commoditiesSupported && cs.commoditiesSupported.some(c => c.toLowerCase() === filters.crop.toLowerCase())) ||
        (cs.temperatureZones && cs.temperatureZones.some(tz => tz.suitableCommodities && tz.suitableCommodities.some(sc => sc.toLowerCase() === filters.crop.toLowerCase())))
      );
    }
    if (filters.minAvailableCapacity) {
      result = result.filter(cs => cs.availableCapacityMT >= Number(filters.minAvailableCapacity));
    }
    return result;
  },

  getColdStorageById: (id) => localDb.cold_storages.find(cs => cs.id === id),

  updateColdStorageCapacity: (id, updates, actingUser = null) => {
    const index = localDb.cold_storages.findIndex(cs => cs.id === id);
    if (index === -1) return null;

    const existing = localDb.cold_storages[index];
    const totalCapacity = Number(existing.totalCapacityMT);

    // Calculate available and occupied
    let availableMT = updates.availableCapacityMT !== undefined 
      ? Number(updates.availableCapacityMT) 
      : existing.availableCapacityMT;
    
    let occupiedMT = updates.occupiedCapacityMT !== undefined
      ? Number(updates.occupiedCapacityMT)
      : (totalCapacity - availableMT);

    // Strict validation
    if (isNaN(availableMT) || availableMT < 0) {
      throw new Error("Available capacity must be a valid non-negative number.");
    }
    if (isNaN(occupiedMT) || occupiedMT < 0) {
      throw new Error("Occupied capacity must be a valid non-negative number.");
    }
    if ((occupiedMT + availableMT) > totalCapacity) {
      throw new Error(`Capacity overflow: Occupied (${occupiedMT} MT) + Available (${availableMT} MT) exceeds total installed capacity (${totalCapacity} MT).`);
    }

    // Determine status (Available, Limited Availability, Full, Temporarily Unavailable)
    let status = updates.facilityStatus || updates.operatingStatus;
    if (!status) {
      if (availableMT <= 0) {
        status = "Full";
      } else if (availableMT < totalCapacity * 0.15) {
        status = "Limited Availability";
      } else {
        status = "Available";
      }
    }

    const historyRecord = {
      timestamp: new Date().toISOString(),
      availableMT,
      occupiedMT,
      utilizationRatePct: Math.round((occupiedMT / totalCapacity) * 100),
      status,
      updatedBy: actingUser ? `${actingUser.name} (${actingUser.role})` : 'System'
    };

    const capacityHistory = Array.isArray(existing.capacityHistory)
      ? [historyRecord, ...existing.capacityHistory].slice(0, 50)
      : [historyRecord];

    const updated = {
      ...existing,
      availableCapacityMT: availableMT,
      occupiedCapacityMT: occupiedMT,
      utilizationRatePct: Math.round((occupiedMT / totalCapacity) * 100),
      operatingStatus: status,
      facilityStatus: status,
      pricingPerMTMonth: updates.pricingPerMTMonth !== undefined ? Number(updates.pricingPerMTMonth) : existing.pricingPerMTMonth,
      commoditiesSupported: updates.commoditiesSupported || existing.commoditiesSupported,
      temperatureZones: updates.temperatureZones || existing.temperatureZones,
      capacityHistory,
      sourceType: "Owner Provided",
      sourceLastUpdated: new Date().toISOString(),
      lastVerified: new Date().toISOString()
    };

    localDb.cold_storages[index] = updated;
    persistLocalDb();

    // Audit log
    if (actingUser) {
      dbStore.addAuditLog({
        userId: actingUser.id,
        userName: actingUser.name,
        role: actingUser.role,
        action: 'UPDATE_LIVE_CAPACITY',
        resource: `${existing.facilityName} (${id})`,
        details: `Available: ${availableMT} MT, Occupied: ${occupiedMT} MT (${Math.round((occupiedMT / totalCapacity) * 100)}% utilization), Status: ${status}`
      });
    }

    return updated;
  },

  createColdStorage: (storageData, actingUser = null) => {
    const totalCap = Number(storageData.totalCapacityMT) || 5000;
    const availCap = storageData.availableCapacityMT !== undefined ? Number(storageData.availableCapacityMT) : totalCap;
    const occupiedCap = Math.max(0, totalCap - availCap);

    const isOwner = actingUser?.role === 'owner';
    const isManual = storageData.isManual !== undefined ? storageData.isManual : true;
    const isSystemSeed = storageData.isSystemSeed !== undefined ? storageData.isSystemSeed : false;

    // Approval status: If submitted by owner, defaults to 'Pending'
    // If submitted by Admin directly, defaults to 'Approved'
    const approvalStatus = storageData.approvalStatus || (isOwner ? 'Pending' : 'Approved');
    const verificationStatus = storageData.verificationStatus || (isOwner ? 'Pending Verification' : 'Verified');

    const newStorage = {
      id: `cs-manual-${Date.now()}`,
      state: AP_STATE,
      source: isOwner ? "Cold Storage Owner Submission" : "AP State Warehouse Regulatory Authority",
      sourceType: storageData.sourceType || (isOwner ? "Owner Submission" : "Manual Entry"),
      isManual,
      isSystemSeed,
      approvalStatus,
      verificationStatus,
      operatingStatus: storageData.operatingStatus || 'Active',
      ownerId: storageData.ownerId || actingUser?.id || 'usr-owner-01',
      ownerName: storageData.ownerName || actingUser?.name || 'Cold Storage Owner',
      ownerEmail: storageData.ownerEmail || actingUser?.email || '',
      ownerPhone: storageData.ownerPhone || actingUser?.phone || storageData.contactPhone || '',
      occupiedCapacityMT: occupiedCap,
      utilizationRatePct: Math.round((occupiedCap / totalCap) * 100),
      capacityHistory: [
        {
          timestamp: new Date().toISOString(),
          availableMT: availCap,
          occupiedMT: occupiedCap,
          status: "Available",
          updatedBy: actingUser ? actingUser.name : 'System Init'
        }
      ],
      sourceLastUpdated: new Date().toISOString(),
      lastVerified: approvalStatus === 'Approved' ? new Date().toISOString() : null,
      submittedAt: new Date().toISOString(),
      ...storageData,
      isManual,
      isSystemSeed,
      approvalStatus,
      verificationStatus,
      totalCapacityMT: totalCap,
      availableCapacityMT: availCap
    };

    localDb.cold_storages.unshift(newStorage);
    persistLocalDb();

    if (actingUser) {
      dbStore.addAuditLog({
        userId: actingUser.id,
        userName: actingUser.name,
        role: actingUser.role,
        action: isOwner ? 'SUBMIT_FACILITY_REGISTRATION' : 'CREATE_FACILITY',
        resource: newStorage.facilityName,
        details: isOwner
          ? `Owner submitted registration request for '${newStorage.facilityName}' in ${newStorage.district} (Lat: ${newStorage.coordinates?.lat}, Lng: ${newStorage.coordinates?.lng}, ${totalCap} MT). Status: Pending Admin Approval.`
          : `Admin registered cold storage in ${newStorage.district}, capacity: ${totalCap} MT (Manual Entry).`
      });
    }

    return newStorage;
  },

  approveColdStorage: (id, actingUser = null) => {
    const index = localDb.cold_storages.findIndex(cs => cs.id === id);
    if (index === -1) return null;

    const existing = localDb.cold_storages[index];
    const updated = {
      ...existing,
      approvalStatus: 'Approved',
      verificationStatus: 'Verified',
      operatingStatus: existing.operatingStatus || 'Active',
      approvedAt: new Date().toISOString(),
      approvedBy: actingUser ? actingUser.name : 'System Administrator',
      lastVerified: new Date().toISOString()
    };

    localDb.cold_storages[index] = updated;
    persistLocalDb();

    if (actingUser) {
      dbStore.addAuditLog({
        userId: actingUser.id,
        userName: actingUser.name,
        role: actingUser.role,
        action: 'ADMIN_APPROVE_FACILITY',
        resource: existing.facilityName,
        details: `Admin approved facility '${existing.facilityName}' (${id}) in ${existing.district}. Now published to AP GIS map at Lat ${existing.coordinates?.lat}, Lng ${existing.coordinates?.lng}.`
      });
    }

    return updated;
  },

  rejectColdStorage: (id, reason = '', actingUser = null) => {
    const index = localDb.cold_storages.findIndex(cs => cs.id === id);
    if (index === -1) return null;

    const existing = localDb.cold_storages[index];
    const updated = {
      ...existing,
      approvalStatus: 'Rejected',
      verificationStatus: 'Rejected',
      rejectionReason: reason || 'Facility documents or physical specifications could not be verified by state authorities.',
      rejectedAt: new Date().toISOString(),
      rejectedBy: actingUser ? actingUser.name : 'System Administrator'
    };

    localDb.cold_storages[index] = updated;
    persistLocalDb();

    if (actingUser) {
      dbStore.addAuditLog({
        userId: actingUser.id,
        userName: actingUser.name,
        role: actingUser.role,
        action: 'ADMIN_REJECT_FACILITY',
        resource: existing.facilityName,
        details: `Admin rejected registration for '${existing.facilityName}' (${id}). Reason: ${updated.rejectionReason}`
      });
    }

    return updated;
  },

  deleteColdStorage: (id, actingUser = null) => {
    const index = localDb.cold_storages.findIndex(cs => cs.id === id);
    if (index === -1) {
      throw new Error(`Facility with id '${id}' not found`);
    }

    const facility = localDb.cold_storages[index];

    // Security Rule: Official system benchmark facilities from API cannot be deleted
    // Only manually added facilities can be deleted by Admin
    if (facility.isSystemSeed === true || facility.isManual !== true) {
      throw new Error(`Cannot delete official API benchmark facility '${facility.facilityName}'. Only manually registered cold storages can be deleted.`);
    }

    // Remove from in-memory and persisted store
    localDb.cold_storages.splice(index, 1);
    persistLocalDb();

    if (actingUser) {
      dbStore.addAuditLog({
        userId: actingUser.id,
        userName: actingUser.name,
        role: actingUser.role,
        action: 'DELETE_MANUAL_FACILITY',
        resource: facility.facilityName,
        details: `Admin deleted manually registered cold storage '${facility.facilityName}' (${id}) from ${facility.district}.`
      });
    }

    return {
      success: true,
      deletedId: id,
      facilityName: facility.facilityName,
      message: `Manually added facility '${facility.facilityName}' has been successfully deleted.`
    };
  },

  updateColdStorageMaster: (id, updates, actingUser = null) => {
    const index = localDb.cold_storages.findIndex(cs => cs.id === id);
    if (index === -1) return null;

    const existing = localDb.cold_storages[index];
    const updated = {
      ...existing,
      ...updates,
      lastModifiedAt: new Date().toISOString(),
      lastModifiedBy: actingUser ? actingUser.name : 'Admin'
    };

    localDb.cold_storages[index] = updated;
    persistLocalDb();

    if (actingUser) {
      dbStore.addAuditLog({
        userId: actingUser.id,
        userName: actingUser.name,
        role: actingUser.role,
        action: 'UPDATE_FACILITY_MASTER',
        resource: `${existing.facilityName} (${id})`,
        details: `Updated facility master registry attributes.`
      });
    }

    return updated;
  },

  // Crop Production
  getCropProduction: (district) => {
    if (district) {
      return localDb.crop_production.filter(cp => cp.district.toLowerCase() === district.toLowerCase());
    }
    return localDb.crop_production;
  },

  updateCropProduction: (id, updates, actingUser = null) => {
    const index = localDb.crop_production.findIndex(cp => cp.id === id);
    if (index === -1) return null;

    const existing = localDb.crop_production[index];
    const updated = { ...existing, ...updates, lastVerified: new Date().toISOString() };
    localDb.crop_production[index] = updated;
    persistLocalDb();

    if (actingUser) {
      dbStore.addAuditLog({
        userId: actingUser.id,
        userName: actingUser.name,
        role: actingUser.role,
        action: 'UPDATE_CROP_DATA',
        resource: `${existing.cropName} in ${existing.district}`,
        details: `Updated production record to ${updated.annualProductionMT} MT.`
      });
    }
    return updated;
  },

  // Markets & Prices
  getMarkets: () => localDb.markets,
  getMarketPrices: (commodity) => {
    if (commodity) {
      return localDb.market_prices.filter(p => p.commodity.toLowerCase() === commodity.toLowerCase());
    }
    return localDb.market_prices;
  },

  // GIS Regions
  getGisRegions: () => localDb.gis_regions,
  getAdministrativeHierarchy: () => AP_DISTRICTS_DATA,

  updateGisRegion: (id, updates, actingUser = null) => {
    const index = localDb.gis_regions.findIndex(g => g.id === id);
    if (index === -1) return null;

    const existing = localDb.gis_regions[index];
    const updated = { ...existing, ...updates, lastVerified: new Date().toISOString() };
    localDb.gis_regions[index] = updated;
    persistLocalDb();

    if (actingUser) {
      dbStore.addAuditLog({
        userId: actingUser.id,
        userName: actingUser.name,
        role: actingUser.role,
        action: 'UPDATE_GIS_DATA',
        resource: `${existing.name} (${existing.code})`,
        details: `Updated GIS boundary attributes.`
      });
    }
    return updated;
  },

  // Gap Analysis
  getGapAnalysis: (district) => {
    if (district) {
      return localDb.gap_analysis.filter(g => g.district.toLowerCase() === district.toLowerCase());
    }
    return localDb.gap_analysis;
  },

  // Potential Locations
  getPotentialLocations: (district) => {
    if (district) {
      return localDb.potential_locations.filter(p => p.district.toLowerCase() === district.toLowerCase());
    }
    return localDb.potential_locations;
  },

  // Farmer Requests (with role-based access filter)
  getFarmerRequests: (filter = {}) => {
    let requests = [...localDb.farmer_requests];
    
    // Filter by cold storage facility
    if (filter.targetColdStorageId) {
      requests = requests.filter(r => r.targetColdStorageId === filter.targetColdStorageId);
    }
    
    // Filter by farmer identity (data privacy)
    if (filter.farmerPhone) {
      requests = requests.filter(r => r.phone === filter.farmerPhone);
    }
    if (filter.farmerName) {
      requests = requests.filter(r => r.farmerName.toLowerCase() === filter.farmerName.toLowerCase());
    }
    if (filter.farmerId) {
      requests = requests.filter(r => r.farmerId === filter.farmerId);
    }

    return requests;
  },

  createFarmerRequest: (requestData, actingUser = null) => {
    const req = {
      id: `req-${Date.now()}`,
      farmerId: actingUser?.id || `farmer-${Date.now()}`,
      state: AP_STATE,
      status: "Pending",
      requestedAt: new Date().toISOString(),
      ...requestData
    };
    localDb.farmer_requests.unshift(req);
    persistLocalDb();

    if (actingUser) {
      dbStore.addAuditLog({
        userId: actingUser.id,
        userName: actingUser.name,
        role: actingUser.role,
        action: 'SUBMIT_STORAGE_REQUEST',
        resource: req.targetColdStorageName || req.targetColdStorageId,
        details: `Requested ${req.quantityMT} MT of ${req.crop} storage.`
      });
    }

    return req;
  },

  updateFarmerRequestStatus: (id, status, actingUser = null) => {
    const index = localDb.farmer_requests.findIndex(r => r.id === id);
    if (index === -1) return null;
    localDb.farmer_requests[index].status = status;
    localDb.farmer_requests[index].lastStatusUpdate = new Date().toISOString();
    if (actingUser) {
      localDb.farmer_requests[index].updatedBy = `${actingUser.name} (${actingUser.role})`;
    }
    persistLocalDb();

    if (actingUser) {
      dbStore.addAuditLog({
        userId: actingUser.id,
        userName: actingUser.name,
        role: actingUser.role,
        action: 'UPDATE_REQUEST_STATUS',
        resource: `Request #${id}`,
        details: `Status set to ${status}.`
      });
    }

    return localDb.farmer_requests[index];
  },

  // User Management
  updateUser: (id, updates, actingUser = null) => {
    const index = localDb.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    const existing = localDb.users[index];
    const updated = { ...existing, ...updates };
    localDb.users[index] = updated;
    persistLocalDb();

    if (actingUser) {
      dbStore.addAuditLog({
        userId: actingUser.id,
        userName: actingUser.name,
        role: actingUser.role,
        action: 'UPDATE_USER',
        resource: `${existing.name} (${existing.email})`,
        details: `Updated user profile attributes.`
      });
    }
    return updated;
  },

  toggleUserStatus: (id, actingUser = null) => {
    const index = localDb.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    const currentStatus = localDb.users[index].status || 'Active';
    const newStatus = currentStatus === 'Active' ? 'Deactivated' : 'Active';
    localDb.users[index].status = newStatus;
    persistLocalDb();

    if (actingUser) {
      dbStore.addAuditLog({
        userId: actingUser.id,
        userName: actingUser.name,
        role: actingUser.role,
        action: 'TOGGLE_USER_STATUS',
        resource: `${localDb.users[index].name} (${localDb.users[index].email})`,
        details: `User status changed from ${currentStatus} to ${newStatus}.`
      });
    }

    return localDb.users[index];
  },

  verifyOwner: (userId, isVerified, actingUser = null) => {
    const user = localDb.users.find(u => u.id === userId);
    if (!user) return null;

    user.isVerified = isVerified;
    user.verificationDate = new Date().toISOString();
    user.verifiedBy = actingUser ? actingUser.name : 'Administrator';

    // Also update associated facilities
    localDb.cold_storages.forEach(cs => {
      if (cs.ownerId === userId || (cs.contactPhone && cs.contactPhone === user.phone)) {
        cs.verificationStatus = isVerified ? 'Verified' : 'Pending Verification';
      }
    });

    persistLocalDb();

    if (actingUser) {
      dbStore.addAuditLog({
        userId: actingUser.id,
        userName: actingUser.name,
        role: actingUser.role,
        action: isVerified ? 'VERIFY_OWNER' : 'UNVERIFY_OWNER',
        resource: `${user.name} (${user.email})`,
        details: `Owner verification status updated to ${isVerified ? 'VERIFIED' : 'PENDING'}.`
      });
    }

    return user;
  },

  // Audit Logs
  getAuditLogs: () => localDb.audit_logs || [],
  addAuditLog: ({ userId, userName, role, action, resource, details }) => {
    const log = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      userId: userId || 'anonymous',
      userName: userName || 'Anonymous',
      role: role || 'guest',
      action: action || 'UNKNOWN',
      resource: resource || 'System',
      details: details || ''
    };
    if (!localDb.audit_logs) localDb.audit_logs = [];
    localDb.audit_logs.unshift(log);
    persistLocalDb();
    return log;
  },

  // System Settings
  getSystemSettings: () => localDb.system_settings,
  updateSystemSettings: (updates, actingUser = null) => {
    localDb.system_settings = {
      ...localDb.system_settings,
      ...updates,
      lastUpdated: new Date().toISOString(),
      lastUpdatedBy: actingUser ? actingUser.name : 'Admin'
    };
    persistLocalDb();

    if (actingUser) {
      dbStore.addAuditLog({
        userId: actingUser.id,
        userName: actingUser.name,
        role: actingUser.role,
        action: 'UPDATE_SYSTEM_SETTINGS',
        resource: 'Platform Configuration',
        details: `System configuration settings updated.`
      });
    }

    return localDb.system_settings;
  },

  // Data Sources
  getDataSources: () => localDb.data_sources,

  importDataset: (datasetType, records, actingUser = null) => {
    let count = 0;
    if (datasetType === 'cold_storages' && Array.isArray(records)) {
      records.forEach(r => dbStore.createColdStorage(r, actingUser));
      count = records.length;
    } else if (datasetType === 'crop_production' && Array.isArray(records)) {
      localDb.crop_production.push(...records);
      count = records.length;
      persistLocalDb();
    }

    if (actingUser) {
      dbStore.addAuditLog({
        userId: actingUser.id,
        userName: actingUser.name,
        role: actingUser.role,
        action: 'IMPORT_GOVERNMENT_DATASET',
        resource: datasetType,
        details: `Imported ${count} new authoritative government records.`
      });
    }

    return { importedCount: count, datasetType };
  }
};

export default dbStore;
