import dbStore from '../db/dbStore.js';

export const inventoryService = {
  async getFacilityInventory(coldStorageId) {
    const facility = dbStore.getColdStorageById(coldStorageId);
    if (!facility) {
      throw new Error(`Facility '${coldStorageId}' not found`);
    }

    // Return current temperature zones and chamber inventory
    return {
      facilityId: facility.id,
      facilityName: facility.facilityName,
      totalCapacityMT: facility.totalCapacityMT,
      availableCapacityMT: facility.availableCapacityMT,
      occupiedCapacityMT: facility.totalCapacityMT - facility.availableCapacityMT,
      occupancyPercentage: Math.round(((facility.totalCapacityMT - facility.availableCapacityMT) / facility.totalCapacityMT) * 100),
      temperatureZones: facility.temperatureZones,
      commoditiesSupported: facility.commoditiesSupported,
      lastUpdated: facility.sourceLastUpdated,
      sourceType: facility.sourceType
    };
  },

  async updateChamberInventory(coldStorageId, chamberUpdates) {
    const facility = dbStore.getColdStorageById(coldStorageId);
    if (!facility) {
      throw new Error(`Facility '${coldStorageId}' not found`);
    }

    const updatedZones = facility.temperatureZones.map((zone, idx) => {
      const match = chamberUpdates.find(u => u.name === zone.name || u.index === idx);
      if (match) {
        return {
          ...zone,
          availableMT: match.availableMT !== undefined ? Number(match.availableMT) : zone.availableMT,
          suitableCommodities: match.suitableCommodities || zone.suitableCommodities
        };
      }
      return zone;
    });

    const totalAvailable = updatedZones.reduce((sum, z) => sum + z.availableMT, 0);

    return dbStore.updateColdStorageCapacity(coldStorageId, {
      availableCapacityMT: totalAvailable,
      temperatureZones: updatedZones
    });
  }
};

export default inventoryService;
