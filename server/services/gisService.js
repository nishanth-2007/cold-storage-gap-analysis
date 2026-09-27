import dbStore from '../db/dbStore.js';
import { AP_STATE, AP_DISTRICTS_DATA } from '../data/andhraPradeshData.js';

// Calculate geodesic distance using Haversine formula
export function calculateHaversineDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightLine = R * c;
  // Apply standard Andhra Pradesh road network curvature coefficient (approx 1.25x)
  return Math.round(straightLine * 1.25 * 10) / 10;
}

export const gisService = {
  getAdministrativeHierarchy() {
    return {
      state: AP_STATE,
      districts: AP_DISTRICTS_DATA.map(d => ({
        name: d.name,
        code: d.code,
        headquarters: d.headquarters,
        centroid: d.centroid,
        bounds: d.bounds,
        mandals: d.mandals
      }))
    };
  },

  getDistricts() {
    return AP_DISTRICTS_DATA.map(d => ({
      name: d.name,
      code: d.code,
      centroid: d.centroid,
      bounds: d.bounds,
      areaSqKm: d.areaSqKm,
      horticultureAcreageHa: d.horticultureAcreageHa,
      primaryCrops: d.primaryCrops
    }));
  },

  getMandalsByDistrict(districtName) {
    const dist = AP_DISTRICTS_DATA.find(d => d.name.toLowerCase() === districtName.toLowerCase());
    return dist ? dist.mandals : [];
  },

  getVillages(districtName, mandalName) {
    const dist = AP_DISTRICTS_DATA.find(d => d.name.toLowerCase() === districtName.toLowerCase());
    if (!dist) return [];
    const mandal = dist.mandals.find(m => m.name.toLowerCase() === mandalName.toLowerCase());
    return mandal ? mandal.villages : [];
  },

  getCoordinatesForLocation(districtName, mandalName) {
    const dist = AP_DISTRICTS_DATA.find(d => d.name.toLowerCase() === districtName.toLowerCase());
    if (!dist) return { lat: 15.9129, lng: 79.7400 }; // AP geographic center default

    // If mandal match is found, apply a slight deterministic offset around district centroid
    if (mandalName && dist.mandals) {
      const mIdx = dist.mandals.findIndex(m => m.name.toLowerCase() === mandalName.toLowerCase());
      if (mIdx !== -1) {
        const offsetLat = ((mIdx % 3) - 1) * 0.08;
        const offsetLng = (Math.floor(mIdx / 3) - 1) * 0.08;
        return {
          lat: Math.round((dist.centroid[0] + offsetLat) * 10000) / 10000,
          lng: Math.round((dist.centroid[1] + offsetLng) * 10000) / 10000
        };
      }
    }

    return { lat: dist.centroid[0], lng: dist.centroid[1] };
  },

  calculateDistance(coord1, coord2) {
    return calculateHaversineDistanceKm(coord1.lat, coord1.lng, coord2.lat, coord2.lng);
  }
};

export default gisService;
