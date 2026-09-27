import dbStore from '../db/dbStore.js';
import { AP_STATE } from '../data/andhraPradeshData.js';

export const gapAnalysisService = {
  async getGapAnalysis(district) {
    const records = dbStore.getGapAnalysis(district);
    
    // Compute statewide summary statistics
    const allRecords = dbStore.getGapAnalysis();
    const totalProduction = allRecords.reduce((acc, r) => acc + r.totalHorticultureProductionMT, 0);
    const totalDemand = allRecords.reduce((acc, r) => acc + r.annualStorageDemandMT, 0);
    const totalExistingCapacity = allRecords.reduce((acc, r) => acc + r.existingColdStorageCapacityMT, 0);
    const totalLiveAvailable = allRecords.reduce((acc, r) => acc + r.liveAvailableCapacityMT, 0);
    const totalNetGap = allRecords.reduce((acc, r) => acc + r.netStorageGapMT, 0);
    const overallGapPercentage = Math.round((totalNetGap / totalDemand) * 1000) / 10;

    const severityCounts = {
      critical: allRecords.filter(r => r.gapSeverityIndex === 'Critical Deficit').length,
      high: allRecords.filter(r => r.gapSeverityIndex === 'High Deficit').length,
      moderate: allRecords.filter(r => r.gapSeverityIndex === 'Moderate Deficit').length,
      adequate: allRecords.filter(r => r.gapSeverityIndex === 'Adequate / Surplus').length
    };

    return {
      state: AP_STATE,
      summary: {
        totalProductionMT: totalProduction,
        totalStorageDemandMT: totalDemand,
        totalExistingCapacityMT: totalExistingCapacity,
        totalLiveAvailableCapacityMT: totalLiveAvailable,
        totalNetStorageGapMT: totalNetGap,
        overallGapPercentage: overallGapPercentage,
        districtsAnalyzed: allRecords.length,
        severityCounts
      },
      districts: records
    };
  },

  async getDistrictGapDetails(districtName) {
    const record = dbStore.getGapAnalysis(districtName)[0];
    if (!record) {
      throw new Error(`Gap analysis record not found for district '${districtName}'`);
    }

    const coldStoragesInDistrict = dbStore.getColdStorages({ district: districtName });
    const cropProduction = dbStore.getCropProduction(districtName);

    return {
      ...record,
      coldStorages: coldStoragesInDistrict,
      cropProduction
    };
  }
};

export default gapAnalysisService;
