import dbStore from '../db/dbStore.js';

export const coldStorageService = {
  async getColdStorages(filters = {}) {
    return dbStore.getColdStorages(filters);
  },

  async getColdStorageById(id) {
    const facility = dbStore.getColdStorageById(id);
    if (!facility) {
      throw new Error(`Cold storage facility with id '${id}' not found`);
    }
    return facility;
  },

  async updateLiveCapacity(id, { availableCapacityMT, temperatureZones, notes, ownerName, phone }) {
    const existing = dbStore.getColdStorageById(id);
    if (!existing) {
      throw new Error(`Facility with id '${id}' not found`);
    }

    const updates = {
      availableCapacityMT: Number(availableCapacityMT)
    };

    if (temperatureZones && Array.isArray(temperatureZones)) {
      updates.temperatureZones = temperatureZones;
    }

    const updated = dbStore.updateColdStorageCapacity(id, updates);

    // Record request audit trail
    if (ownerName || phone) {
      dbStore.createFarmerRequest({
        coldStorageId: id,
        ownerName: ownerName || existing.contactPerson,
        phone: phone || existing.contactPhone,
        facilityName: existing.facilityName,
        requestedCapacityUpdateMT: updates.availableCapacityMT,
        notes: notes || "Live capacity update through owner portal"
      });
    }

    return updated;
  },

  async registerColdStorage(data) {
    return dbStore.createColdStorage(data);
  }
};

export default coldStorageService;
