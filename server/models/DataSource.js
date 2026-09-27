import mongoose from 'mongoose';

const dataSourceSchema = new mongoose.Schema({
  id: { type: String, required: true },
  datasetName: { type: String, required: true },
  issuingAgency: { type: String, required: true },
  officialPortal: { type: String, required: true },
  coverage: { type: String, required: true },
  updateFrequency: { type: String, required: true },
  sourceType: { 
    type: String, 
    enum: ['Government', 'Owner Provided', 'Platform Calculated', 'Demo Data'], 
    default: 'Government' 
  },
  sourceLastUpdated: { type: Date, default: Date.now },
  lastVerified: { type: Date, default: Date.now },
  reliabilityScore: { type: String, default: '95%' },
  verificationProtocol: { type: String, required: true }
});

export const DataSource = mongoose.model('DataSource', dataSourceSchema);
export default DataSource;
