import mongoose from 'mongoose';

const coldStorageInventorySchema = new mongoose.Schema({
  id: { type: String, required: true },
  coldStorageId: { type: String, required: true, ref: 'ColdStorage' },
  commodity: { type: String, required: true },
  chamberNumber: { type: String, required: true },
  allocatedCapacityMT: { type: Number, required: true },
  occupiedCapacityMT: { type: Number, required: true },
  availableCapacityMT: { type: Number, required: true },
  temperatureC: { type: Number, required: true },
  humidityPct: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now },
  source: { type: String, default: 'Warehouse IoT / Operator Log' },
  sourceType: { 
    type: String, 
    enum: ['Government', 'Owner Provided', 'Platform Calculated', 'Demo Data'], 
    default: 'Owner Provided' 
  }
});

export const ColdStorageInventory = mongoose.model('ColdStorageInventory', coldStorageInventorySchema);
export default ColdStorageInventory;
