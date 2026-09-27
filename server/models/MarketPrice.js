import mongoose from 'mongoose';

const marketPriceSchema = new mongoose.Schema({
  id: { type: String, required: true },
  marketId: { type: String, required: true, ref: 'Market' },
  marketName: { type: String, required: true },
  district: { type: String, required: true },
  commodity: { type: String, required: true },
  variety: { type: String, default: 'Standard' },
  arrivalDate: { type: String, required: true },
  minPricePerQuintal: { type: Number, required: true },
  maxPricePerQuintal: { type: Number, required: true },
  modalPricePerQuintal: { type: Number, required: true },
  coldStorageBenefitMultiplier: { type: Number, default: 1.25 },
  source: { type: String, default: 'APAMB e-NAM Daily Price Bulletin' },
  sourceType: { 
    type: String, 
    enum: ['Government', 'Owner Provided', 'Platform Calculated', 'Demo Data'], 
    default: 'Government' 
  },
  sourceLastUpdated: { type: Date, default: Date.now },
  lastVerified: { type: Date, default: Date.now }
});

export const MarketPrice = mongoose.model('MarketPrice', marketPriceSchema);
export default MarketPrice;
