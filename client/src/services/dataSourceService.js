import { fetchApi } from './api.js';

export const dataSourceService = {
  async getDataSources() {
    return fetchApi('/data-sources');
  },

  async getSummary() {
    return fetchApi('/data-sources/summary');
  }
};

export default dataSourceService;
