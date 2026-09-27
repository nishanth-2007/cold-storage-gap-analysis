import express from 'express';
import coldStorageService from '../services/coldStorageService.js';
import inventoryService from '../services/inventoryService.js';

const router = express.Router();

// GET all cold storages with optional filters (district, mandal, crop, minAvailableCapacity)
router.get('/', async (req, res) => {
  try {
    const storages = await coldStorageService.getColdStorages(req.query);
    res.json(storages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET cold storage by ID
router.get('/:id', async (req, res) => {
  try {
    const storage = await coldStorageService.getColdStorageById(req.params.id);
    res.json(storage);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// PUT update live capacity (for Cold Storage Owner)
router.put('/:id/capacity', async (req, res) => {
  try {
    const updated = await coldStorageService.updateLiveCapacity(req.params.id, req.body);
    res.json({
      message: 'Live capacity updated successfully and broadcasted across AP map',
      facility: updated
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET facility chamber inventory
router.get('/:id/inventory', async (req, res) => {
  try {
    const inv = await inventoryService.getFacilityInventory(req.params.id);
    res.json(inv);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// PUT update chamber inventory
router.put('/:id/inventory', async (req, res) => {
  try {
    const updated = await inventoryService.updateChamberInventory(req.params.id, req.body.chambers || []);
    res.json({
      message: 'Chamber inventory updated successfully',
      facility: updated
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST register new facility
router.post('/', async (req, res) => {
  try {
    const created = await coldStorageService.registerColdStorage(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
