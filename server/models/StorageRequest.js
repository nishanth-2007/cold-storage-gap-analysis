import mongoose from 'mongoose';

const storageRequestSchema = new mongoose.Schema({
  id: { type: String, required: true },
  coldStorageId: { type: String, required: true },
  ownerName: { type: String, required: true },
  phone: { type: String, required: true },
  facilityName: { type: String, required: true },
  requestedCapacityUpdateMT: { type: Number, required: true },
  newAvailableMT: { type: Number, required: true },
  notes: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['Submitted', 'Verified', 'Rejected'], 
    default: 'Submitted' 
  },
  submittedAt: { type: Date, default: Date.now },
  verifiedAt: { type: Date }
});

export const StorageRequest = mongoose.model('StorageRequest', storageRequestSchema);
export default StorageRequest;
