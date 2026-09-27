import { fetchApi } from './api.js';

export const coldStorageService = {
  async getColdStorages(filters = {}) {
    const params = new URLSearchParams();
    if (filters.district) params.append('district', filters.district);
    if (filters.mandal) params.append('mandal', filters.mandal);
    if (filters.crop) params.append('crop', filters.crop);
    if (filters.minAvailableCapacity) params.append('minAvailableCapacity', filters.minAvailableCapacity);

    const query = params.toString() ? `?${params.toString()}` : '';
    return fetchApi(`/cold-storages${query}`);
  },

  async getColdStorageById(id) {
    return fetchApi(`/cold-storages/${id}`);
  },

  async updateLiveCapacity(id, data) {
    return fetchApi(`/cold-storages/${id}/capacity`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  async registerColdStorage(data) {
    return fetchApi('/cold-storages', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
};

export default coldStorageService;
