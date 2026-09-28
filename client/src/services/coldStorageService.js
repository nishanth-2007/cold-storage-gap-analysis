import { fetchApi } from './api.js';

export const coldStorageService = {
  async getColdStorages(filters = {}) {
    const params = new URLSearchParams();
    if (filters.district) params.append('district', filters.district);
    if (filters.mandal) params.append('mandal', filters.mandal);
    if (filters.crop) params.append('crop', filters.crop);
    if (filters.minAvailableCapacity) params.append('minAvailableCapacity', filters.minAvailableCapacity);
    if (filters.ownerId) params.append('ownerId', filters.ownerId);
    if (filters.includePending) params.append('includePending', filters.includePending);
    if (filters.approvalStatus) params.append('approvalStatus', filters.approvalStatus);

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
  },

  async deleteColdStorage(id) {
    return fetchApi(`/cold-storages/${id}`, {
      method: 'DELETE'
    });
  },

  async approveColdStorage(id) {
    return fetchApi(`/admin/facilities/${id}/approve`, {
      method: 'POST'
    });
  },

  async rejectColdStorage(id, reason = '') {
    return fetchApi(`/admin/facilities/${id}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason })
    });
  },

  async getPendingFacilities() {
    return fetchApi('/admin/pending-facilities');
  }
};

export default coldStorageService;
