import mongoose from 'mongoose';

const marketSchema = new mongoose.Schema({
  id: { type: String, required: true },
  marketName: { type: String, required: true },
  marketType: { 
    type: String, 
    enum: ['APMC / RMC Yard', 'Rythu Bazaar', 'Private Terminal'], 
    default: 'APMC / RMC Yard' 
  },
  state: { type: String, default: 'Andhra Pradesh' },
  district: { type: String, required: true },
  mandal: { type: String, default: '' },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  majorCommodities: [{ type: String }],
  source: { type: String, default: 'Andhra Pradesh Agricultural Marketing Board (APAMB)' },
  sourceType: { 
    type: String, 
    enum: ['Government', 'Owner Provided', 'Platform Calculated', 'Demo Data'], 
    default: 'Government' 
  },
  sourceLastUpdated: { type: Date, default: Date.now },
  lastVerified: { type: Date, default: Date.now }
});

export const Market = mongoose.model('Market', marketSchema);
export default Market;
