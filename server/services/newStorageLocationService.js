import dbStore from '../db/dbStore.js';
import { AP_STATE } from '../data/andhraPradeshData.js';

export const newStorageLocationService = {
  async getPotentialLocations(district) {
    const locations = dbStore.getPotentialLocations(district);

    const totalProduceAtRisk = locations.reduce((sum, loc) => sum + loc.localProduceAtRiskMTPerYear, 0);
    const totalRecommendedCapacity = locations.reduce((sum, loc) => sum + loc.recommendedCapacityMT, 0);
    const totalCapexCrores = locations.reduce((sum, loc) => sum + loc.estimatedCapexCroresINR, 0);

    return {
      state: AP_STATE,
      totalIdentifiedClusters: locations.length,
      aggregateProduceAtRiskMT: totalProduceAtRisk,
      totalRecommendedNewCapacityMT: totalRecommendedCapacity,
      estimatedInvestmentRequiredCroresINR: Math.round(totalCapexCrores * 10) / 10,
      clusters: locations
    };
  },

  async getLocationById(id) {
    const locations = dbStore.getPotentialLocations();
    const cluster = locations.find(l => l.id === id);
    if (!cluster) {
      throw new Error(`Potential location cluster '${id}' not found`);
    }
    return cluster;
  }
};

export default newStorageLocationService;
