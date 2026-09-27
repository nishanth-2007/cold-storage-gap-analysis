import dbStore from '../db/dbStore.js';

export const marketService = {
  async getMarkets() {
    return dbStore.getMarkets();
  },

  async getMarketPrices(commodity) {
    return dbStore.getMarketPrices(commodity);
  },

  async calculateFarmerRoi({ commodity, quantityMT, durationMonths = 3, coldStorageRentPerMonth = 850 }) {
    const prices = dbStore.getMarketPrices(commodity);
    const priceRecord = prices[0] || {
      modalPricePerQuintal: 2500,
      coldStorageBenefitMultiplier: 1.30
    };

    const harvestSalePricePerMT = priceRecord.modalPricePerQuintal * 10; // 10 quintals in 1 MT
    const totalHarvestRevenueINR = harvestSalePricePerMT * quantityMT;

    // Off-season price projection based on historical APMC cold-storage premium
    const offSeasonPricePerMT = Math.round(harvestSalePricePerMT * priceRecord.coldStorageBenefitMultiplier);
    const totalOffSeasonRevenueINR = offSeasonPricePerMT * quantityMT;

    // Costs
    const totalStorageRentINR = coldStorageRentPerMonth * quantityMT * durationMonths;
    const estimatedTransitCostINR = 18 * 25 * quantityMT; // 25km average distance
    const totalStorageInvestmentINR = totalStorageRentINR + estimatedTransitCostINR;

    // Net Profit calculation
    const netGainFromColdStorageINR = totalOffSeasonRevenueINR - totalHarvestRevenueINR - totalStorageInvestmentINR;
    const returnOnInvestmentPct = Math.round((netGainFromColdStorageINR / totalStorageInvestmentINR) * 100);

    return {
      commodity,
      quantityMT,
      durationMonths,
      currentHarvestPricePerMT: harvestSalePricePerMT,
      totalHarvestRevenueINR,
      projectedOffSeasonPricePerMT: offSeasonPricePerMT,
      totalOffSeasonRevenueINR,
      grossValueAdditionINR: totalOffSeasonRevenueINR - totalHarvestRevenueINR,
      totalStorageCostINR: totalStorageRentINR,
      totalTransitCostINR: estimatedTransitCostINR,
      netGainFromColdStorageINR,
      returnOnInvestmentPct,
      marketSource: priceRecord.source,
      sourceType: priceRecord.sourceType
    };
  }
};

export default marketService;
