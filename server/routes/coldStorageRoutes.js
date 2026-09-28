import express from 'express';
import coldStorageService from '../services/coldStorageService.js';
import inventoryService from '../services/inventoryService.js';
import { requireAuth, requireRole, verifyFacilityOwnership, authenticateOptional } from '../middleware/authMiddleware.js';
import { ROLES } from '../config/roles.js';

const router = express.Router();

// GET all cold storages with optional filters (district, mandal, crop, minAvailableCapacity)
// Publicly browsable
router.get('/', authenticateOptional, async (req, res) => {
  try {
    const storages = await coldStorageService.getColdStorages(req.query, req.user);
    res.json(storages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET cold storage by ID
// Publicly browsable
router.get('/:id', authenticateOptional, async (req, res) => {
  try {
    const storage = await coldStorageService.getColdStorageById(req.params.id);
    res.json(storage);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// PUT update live capacity (Strict Role & Ownership Authorization)
// Allowed: Facility Owner (of THIS facility) or System Admin
// Rejects unauthorized users with HTTP 403
router.put('/:id/capacity', requireAuth, verifyFacilityOwnership, async (req, res) => {
  try {
    const updated = await coldStorageService.updateLiveCapacity(req.params.id, req.body, req.user);
    res.json({
      message: 'Live capacity updated successfully and synchronized across AP map',
      facility: updated
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET facility chamber inventory
router.get('/:id/inventory', authenticateOptional, async (req, res) => {
  try {
    const inv = await inventoryService.getFacilityInventory(req.params.id);
    res.json(inv);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// PUT update chamber inventory (Strict Role & Ownership Authorization)
router.put('/:id/inventory', requireAuth, verifyFacilityOwnership, async (req, res) => {
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

// POST register new facility (Strict Authorization: Admin or Owner)
router.post('/', requireAuth, requireRole(ROLES.ADMIN, ROLES.OWNER), async (req, res) => {
  try {
    const facilityData = {
      ...req.body,
      ownerId: req.user.role === ROLES.OWNER ? req.user.id : (req.body.ownerId || req.user.id)
    };
    const created = await coldStorageService.registerColdStorage(facilityData, req.user);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE manually registered facility (Strict Authorization: Admin only)
// Protected benchmark facilities from API cannot be deleted
router.delete('/:id', requireAuth, requireRole(ROLES.ADMIN), async (req, res) => {
  try {
    const result = await coldStorageService.deleteColdStorage(req.params.id, req.user);
    res.json(result);
  } catch (err) {
    const isProtected = err.message.includes('benchmark') || err.message.includes('Cannot delete') || err.message.includes('official API');
    res.status(isProtected ? 403 : 400).json({ error: err.message });
  }
});

export default router;
