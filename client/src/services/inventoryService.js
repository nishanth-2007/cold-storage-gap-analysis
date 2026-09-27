import { fetchApi } from './api.js';

export const inventoryService = {
  async getFacilityInventory(coldStorageId) {
    return fetchApi(`/cold-storages/${coldStorageId}/inventory`);
  },

  async updateChambers(coldStorageId, chambers) {
    return fetchApi(`/cold-storages/${coldStorageId}/inventory`, {
      method: 'PUT',
      body: JSON.stringify({ chambers })
    });
  }
};

export default inventoryService;
