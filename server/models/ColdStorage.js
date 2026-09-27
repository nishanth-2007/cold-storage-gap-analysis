import mongoose from 'mongoose';

const temperatureZoneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tempRange: { type: String, required: true },
  capacityMT: { type: Number, required: true },
  availableMT: { type: Number, required: true },
  suitableCommodities: [{ type: String }]
});

const coldStorageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  facilityName: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  ownerId: { type: String, default: '' },
  state: { type: String, default: 'Andhra Pradesh' },
  district: { type: String, required: true },
  mandal: { type: String, required: true },
  village: { type: String, default: '' },
  address: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  totalCapacityMT: { type: Number, required: true },
  availableCapacityMT: { type: Number, required: true },
  operatingStatus: { 
    type: String, 
    enum: ['Active', 'Near Full', 'Full', 'Under Maintenance', 'Inactive'], 
    default: 'Active' 
  },
  temperatureZones: [temperatureZoneSchema],
  commoditiesSupported: [{ type: String }],
  pricingPerMTMonth: { type: Number, default: 800 },
  contactPerson: { type: String, required: true },
  contactPhone: { type: String, required: true },
  amenities: [{ type: String }],
  source: { type: String, default: 'AP State Warehouse Regulatory Authority' },
  sourceType: { 
    type: String, 
    enum: ['Government', 'Owner Provided', 'Platform Calculated', 'Demo Data'], 
    default: 'Owner Provided' 
  },
  sourceLastUpdated: { type: Date, default: Date.now },
  lastVerified: { type: Date, default: Date.now }
});

export const ColdStorage = mongoose.model('ColdStorage', coldStorageSchema);
export default ColdStorage;
