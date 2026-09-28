import dbStore from '../db/dbStore.js';

export const coldStorageService = {
  async getColdStorages(filters = {}, actingUser = null) {
    return dbStore.getColdStorages(filters, actingUser);
  },

  async getColdStorageById(id) {
    const facility = dbStore.getColdStorageById(id);
    if (!facility) {
      throw new Error(`Cold storage facility with id '${id}' not found`);
    }
    return facility;
  },

  async updateLiveCapacity(id, updateData, actingUser = null) {
    const existing = dbStore.getColdStorageById(id);
    if (!existing) {
      throw new Error(`Facility with id '${id}' not found`);
    }

    const updates = {
      ...updateData
    };

    if (updateData.availableCapacityMT !== undefined) {
      updates.availableCapacityMT = Number(updateData.availableCapacityMT);
    }
    if (updateData.occupiedCapacityMT !== undefined) {
      updates.occupiedCapacityMT = Number(updateData.occupiedCapacityMT);
    }
    if (updateData.pricingPerMTMonth !== undefined) {
      updates.pricingPerMTMonth = Number(updateData.pricingPerMTMonth);
    }

    const updated = dbStore.updateColdStorageCapacity(id, updates, actingUser);
    return updated;
  },

  async registerColdStorage(data, actingUser = null) {
    return dbStore.createColdStorage(data, actingUser);
  },

  async deleteColdStorage(id, actingUser = null) {
    return dbStore.deleteColdStorage(id, actingUser);
  },

  async approveColdStorage(id, actingUser = null) {
    return dbStore.approveColdStorage(id, actingUser);
  },

  async rejectColdStorage(id, reason = '', actingUser = null) {
    return dbStore.rejectColdStorage(id, reason, actingUser);
  }
};

export default coldStorageService;
