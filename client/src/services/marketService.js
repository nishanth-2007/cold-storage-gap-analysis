import { fetchApi } from './api.js';

export const marketService = {
  async getMarkets() {
    return fetchApi('/markets');
  },

  async getMarketPrices(commodity) {
    const query = commodity ? `?commodity=${encodeURIComponent(commodity)}` : '';
    return fetchApi(`/markets/prices${query}`);
  },

  async calculateRoi({ commodity, quantityMT, durationMonths, coldStorageRentPerMonth }) {
    return fetchApi('/markets/roi-calculator', {
      method: 'POST',
      body: JSON.stringify({
        commodity,
        quantityMT,
        durationMonths,
        coldStorageRentPerMonth
      })
    });
  }
};

export default marketService;
