import dbStore from '../db/dbStore.js';
import { AP_HORTICULTURE_CROPS, AP_DISTRICTS_DATA } from '../data/andhraPradeshData.js';

export const cropProductionService = {
  async getCropProduction(district) {
    return dbStore.getCropProduction(district);
  },

  async getHorticultureCrops() {
    return AP_HORTICULTURE_CROPS;
  },

  async getProductionStats() {
    const allProd = dbStore.getCropProduction();
    const totalProductionMT = allProd.reduce((sum, item) => sum + item.annualProductionMT, 0);
    const totalStorageDemandMT = allProd.reduce((sum, item) => sum + item.storageDemandMT, 0);

    const cropsMap = {};
    allProd.forEach(item => {
      if (!cropsMap[item.cropName]) {
        cropsMap[item.cropName] = { cropName: item.cropName, productionMT: 0, demandMT: 0, category: item.cropCategory };
      }
      cropsMap[item.cropName].productionMT += item.annualProductionMT;
      cropsMap[item.cropName].demandMT += item.storageDemandMT;
    });

    return {
      state: "Andhra Pradesh",
      totalHorticultureProductionMT: totalProductionMT,
      totalStorageDemandMT: totalStorageDemandMT,
      districtsCovered: AP_DISTRICTS_DATA.length,
      cropBreakdown: Object.values(cropsMap)
    };
  }
};

export default cropProductionService;
