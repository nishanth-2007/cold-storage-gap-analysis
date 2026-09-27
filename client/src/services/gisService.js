import { fetchApi } from './api.js';

export const gisService = {
  async getHierarchy() {
    return fetchApi('/gis/hierarchy');
  },

  async getDistricts() {
    return fetchApi('/gis/districts');
  },

  async getMandals(district) {
    return fetchApi(`/gis/mandals/${encodeURIComponent(district)}`);
  },

  async getVillages(district, mandal) {
    return fetchApi(`/gis/villages/${encodeURIComponent(district)}/${encodeURIComponent(mandal)}`);
  }
};

export default gisService;
