import dbStore from '../db/dbStore.js';

export const dataSourceService = {
  async getDataSources() {
    return dbStore.getDataSources();
  },

  async getMetadataSummary() {
    const sources = dbStore.getDataSources();
    const sourceTypes = ['Government', 'Owner Provided', 'Platform Calculated', 'Demo Data'];
    
    const countByType = {};
    sourceTypes.forEach(t => {
      countByType[t] = sources.filter(s => s.sourceType === t).length;
    });

    return {
      state: "Andhra Pradesh",
      totalSourcesTracked: sources.length,
      countByType,
      sources
    };
  }
};

export default dataSourceService;
