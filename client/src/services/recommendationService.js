import { fetchApi } from './api.js';

export const recommendationService = {
  async matchColdStorages({ district, mandal, village, crop, quantityMT, maxDistanceKm }) {
    return fetchApi('/recommendations/match', {
      method: 'POST',
      body: JSON.stringify({
        district,
        mandal,
        village,
        crop,
        quantityMT: Number(quantityMT) || 10,
        maxDistanceKm: Number(maxDistanceKm) || 150
      })
    });
  }
};

export default recommendationService;
