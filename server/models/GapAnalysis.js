import mongoose from 'mongoose';

const gapAnalysisSchema = new mongoose.Schema({
  id: { type: String, required: true },
  state: { type: String, default: 'Andhra Pradesh' },
  district: { type: String, required: true },
  mandal: { type: String, default: '' },
  totalHorticultureProductionMT: { type: Number, required: true },
  annualStorageDemandMT: { type: Number, required: true },
  existingColdStorageCapacityMT: { type: Number, required: true },
  liveAvailableCapacityMT: { type: Number, required: true },
  netStorageGapMT: { type: Number, required: true },
  gapPercentage: { type: Number, default: 0 },
  gapSeverityIndex: { 
    type: String, 
    enum: ['Critical Deficit', 'High Deficit', 'Moderate Deficit', 'Adequate / Surplus'], 
    default: 'Moderate Deficit' 
  },
  primaryVulnerableCrops: [{ type: String }],
  recommendedNewCapacityMT: { type: Number, default: 0 },
  source: { type: String, default: 'AP Horticulture Storage Gap Assessment & NCCD' },
  sourceType: { 
    type: String, 
    enum: ['Government', 'Owner Provided', 'Platform Calculated', 'Demo Data'], 
    default: 'Platform Calculated' 
  },
  sourceLastUpdated: { type: Date, default: Date.now },
  lastVerified: { type: Date, default: Date.now }
});

export const GapAnalysis = mongoose.model('GapAnalysis', gapAnalysisSchema);
export default GapAnalysis;
