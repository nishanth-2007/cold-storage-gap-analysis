import mongoose from 'mongoose';

const cropProductionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  state: { type: String, default: 'Andhra Pradesh' },
  district: { type: String, required: true },
  mandal: { type: String, default: '' },
  cropName: { type: String, required: true },
  cropCategory: { 
    type: String, 
    enum: ['Fruit', 'Vegetable', 'Spice', 'Plantation'], 
    required: true 
  },
  annualProductionMT: { type: Number, required: true },
  peakHarvestMonths: [{ type: String }],
  perishabilityDays: { type: Number, required: true },
  coldStorageRequirementPct: { type: Number, default: 40 },
  storageDemandMT: { type: Number, required: true },
  source: { type: String, default: 'Department of Horticulture, Govt. of Andhra Pradesh' },
  sourceType: { 
    type: String, 
    enum: ['Government', 'Owner Provided', 'Platform Calculated', 'Demo Data'], 
    default: 'Government' 
  },
  sourceLastUpdated: { type: Date, default: Date.now },
  lastVerified: { type: Date, default: Date.now }
});

export const CropProduction = mongoose.model('CropProduction', cropProductionSchema);
export default CropProduction;
