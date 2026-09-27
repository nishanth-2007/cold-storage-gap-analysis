import mongoose from 'mongoose';

const gisRegionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  regionType: { 
    type: String, 
    enum: ['District', 'Mandal'], 
    default: 'District' 
  },
  name: { type: String, required: true },
  code: { type: String, default: '' },
  parentDistrict: { type: String, default: '' },
  state: { type: String, default: 'Andhra Pradesh' },
  centroid: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  bounds: { type: [[Number]], default: [] },
  areaSqKm: { type: Number, default: 0 },
  horticultureAcreageHa: { type: Number, default: 0 },
  primaryCrops: [{ type: String }],
  source: { type: String, default: 'AP State GIS Portal / Survey of India' },
  sourceType: { 
    type: String, 
    enum: ['Government', 'Owner Provided', 'Platform Calculated', 'Demo Data'], 
    default: 'Government' 
  },
  sourceLastUpdated: { type: Date, default: Date.now },
  lastVerified: { type: Date, default: Date.now }
});

export const GisRegion = mongoose.model('GisRegion', gisRegionSchema);
export default GisRegion;
