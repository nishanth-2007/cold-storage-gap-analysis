import { fetchApi } from './api.js';

export const gapAnalysisService = {
  async getGapAnalysis(district) {
    const query = district ? `?district=${encodeURIComponent(district)}` : '';
    return fetchApi(`/gap-analysis${query}`);
  },

  async getDistrictDetails(district) {
    return fetchApi(`/gap-analysis/${encodeURIComponent(district)}`);
  }
};

export default gapAnalysisService;
