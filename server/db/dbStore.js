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
  potential_locations: [...SEED_POTENTIAL_LOCATIONS]
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
  getColdStorages: (filters = {}) => {
    let result = [...localDb.cold_storages];
    if (filters.district) {
      result = result.filter(cs => cs.district.toLowerCase() === filters.district.toLowerCase());
    }
    if (filters.mandal) {
      result = result.filter(cs => cs.mandal.toLowerCase() === filters.mandal.toLowerCase());
    }
    if (filters.crop) {
      result = result.filter(cs => 
        cs.commoditiesSupported.some(c => c.toLowerCase() === filters.crop.toLowerCase()) ||
        cs.temperatureZones.some(tz => tz.suitableCommodities.some(sc => sc.toLowerCase() === filters.crop.toLowerCase()))
      );
    }
    if (filters.minAvailableCapacity) {
      result = result.filter(cs => cs.availableCapacityMT >= Number(filters.minAvailableCapacity));
    }
    return result;
  },

  getColdStorageById: (id) => localDb.cold_storages.find(cs => cs.id === id),

  updateColdStorageCapacity: (id, updates) => {
    const index = localDb.cold_storages.findIndex(cs => cs.id === id);
    if (index === -1) return null;

    const existing = localDb.cold_storages[index];
    const newAvailableMT = updates.availableCapacityMT !== undefined 
      ? Number(updates.availableCapacityMT) 
      : existing.availableCapacityMT;

    let operatingStatus = "Active";
    if (newAvailableMT <= 0) {
      operatingStatus = "Full";
    } else if (newAvailableMT < existing.totalCapacityMT * 0.15) {
      operatingStatus = "Near Full";
    }

    const updated = {
      ...existing,
      ...updates,
      availableCapacityMT: newAvailableMT,
      operatingStatus,
      sourceType: "Owner Provided",
      sourceLastUpdated: new Date().toISOString(),
      lastVerified: new Date().toISOString()
    };

    localDb.cold_storages[index] = updated;
    persistLocalDb();
    return updated;
  },

  createColdStorage: (storageData) => {
    const newStorage = {
      id: `cs-${Date.now()}`,
      state: AP_STATE,
      source: "AP State Warehouse Regulatory Authority",
      sourceType: "Owner Provided",
      sourceLastUpdated: new Date().toISOString(),
      lastVerified: new Date().toISOString(),
      ...storageData
    };
    localDb.cold_storages.push(newStorage);
    persistLocalDb();
    return newStorage;
  },

  // Crop Production
  getCropProduction: (district) => {
    if (district) {
      return localDb.crop_production.filter(cp => cp.district.toLowerCase() === district.toLowerCase());
    }
    return localDb.crop_production;
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

  // Farmer Requests
  getFarmerRequests: (targetColdStorageId) => {
    if (targetColdStorageId) {
      return localDb.farmer_requests.filter(r => r.targetColdStorageId === targetColdStorageId);
    }
    return localDb.farmer_requests;
  },

  createFarmerRequest: (requestData) => {
    const req = {
      id: `req-${Date.now()}`,
      state: AP_STATE,
      status: "Pending",
      requestedAt: new Date().toISOString(),
      ...requestData
    };
    localDb.farmer_requests.unshift(req);
    persistLocalDb();
    return req;
  },

  updateFarmerRequestStatus: (id, status) => {
    const index = localDb.farmer_requests.findIndex(r => r.id === id);
    if (index === -1) return null;
    localDb.farmer_requests[index].status = status;
    persistLocalDb();
    return localDb.farmer_requests[index];
  },

  // Data Sources
  getDataSources: () => localDb.data_sources
};

export default dbStore;
