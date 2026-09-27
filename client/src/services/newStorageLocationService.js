import { fetchApi } from './api.js';

export const newStorageLocationService = {
  async getPotentialLocations(district) {
    const query = district ? `?district=${encodeURIComponent(district)}` : '';
    return fetchApi(`/potential-locations${query}`);
  },

  async getLocationById(id) {
    return fetchApi(`/potential-locations/${id}`);
  }
};

export default newStorageLocationService;
