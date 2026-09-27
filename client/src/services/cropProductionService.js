import { fetchApi } from './api.js';

export const cropProductionService = {
  async getCropProduction(district) {
    const query = district ? `?district=${encodeURIComponent(district)}` : '';
    return fetchApi(`/crop-production${query}`);
  },

  async getHorticultureCrops() {
    return fetchApi('/crop-production/crops');
  },

  async getProductionStats() {
    return fetchApi('/crop-production/stats');
  }
};

export default cropProductionService;
