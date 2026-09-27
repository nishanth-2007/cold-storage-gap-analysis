import mongoose from 'mongoose';

const farmerRequestSchema = new mongoose.Schema({
  id: { type: String, required: true },
  farmerName: { type: String, required: true },
  phone: { type: String, required: true },
  state: { type: String, default: 'Andhra Pradesh' },
  district: { type: String, required: true },
  mandal: { type: String, required: true },
  village: { type: String, default: '' },
  crop: { type: String, required: true },
  quantityMT: { type: Number, required: true },
  requiredFromDate: { type: String, required: true },
  durationMonths: { type: Number, default: 3 },
  targetColdStorageId: { type: String, required: true },
  targetColdStorageName: { type: String, default: '' },
  estimatedMonthlyCostINR: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['Pending', 'Accepted', 'Rejected', 'Completed'], 
    default: 'Pending' 
  },
  notes: { type: String, default: '' },
  requestedAt: { type: Date, default: Date.now }
});

export const FarmerRequest = mongoose.model('FarmerRequest', farmerRequestSchema);
export default FarmerRequest;
