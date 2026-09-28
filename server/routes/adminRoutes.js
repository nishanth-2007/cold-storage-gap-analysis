import express from 'express';
import dbStore from '../db/dbStore.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';
import { ROLES } from '../config/roles.js';

const router = express.Router();

// All admin routes strictly require authenticated admin role
router.use(requireAuth);
router.use(requireRole(ROLES.ADMIN));

// 1. User Management
router.get('/users', (req, res) => {
  try {
    const users = dbStore.getUsers().map(({ passwordHash, ...safeUser }) => safeUser);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/users/:id', (req, res) => {
  try {
    const updated = dbStore.updateUser(req.params.id, req.body, req.user);
    if (!updated) {
      return res.status(404).json({ error: 'User not found' });
    }
    const { passwordHash, ...safeUser } = updated;
    res.json(safeUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/users/:id/toggle-status', (req, res) => {
  try {
    const updated = dbStore.toggleUserStatus(req.params.id, req.user);
    if (!updated) {
      return res.status(404).json({ error: 'User not found' });
    }
    const { passwordHash, ...safeUser } = updated;
    res.json(safeUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 2. Cold Storage Owner Verification
router.post('/owners/:id/verify', (req, res) => {
  try {
    const { isVerified = true } = req.body;
    const verified = dbStore.verifyOwner(req.params.id, isVerified, req.user);
    if (!verified) {
      return res.status(404).json({ error: 'Owner account not found' });
    }
    const { passwordHash, ...safeUser } = verified;
    res.json({
      message: `Owner ${isVerified ? 'verified' : 'unverified'} successfully`,
      user: safeUser
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3. Facility Master Record Updates & Approval
router.put('/facilities/:id', (req, res) => {
  try {
    const updated = dbStore.updateColdStorageMaster(req.params.id, req.body, req.user);
    if (!updated) {
      return res.status(404).json({ error: 'Facility not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3b. Pending Facility Registrations & Approval Workflow
router.get('/pending-facilities', (req, res) => {
  try {
    const pending = dbStore.getColdStorages({ approvalStatus: 'Pending' }, req.user);
    res.json(pending);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/facilities/:id/approve', (req, res) => {
  try {
    const approved = dbStore.approveColdStorage(req.params.id, req.user);
    if (!approved) {
      return res.status(404).json({ error: 'Facility not found' });
    }
    res.json({
      message: `Facility '${approved.facilityName}' has been officially approved and published to the live AP GIS map!`,
      facility: approved
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/facilities/:id/reject', (req, res) => {
  try {
    const rejected = dbStore.rejectColdStorage(req.params.id, req.body.reason, req.user);
    if (!rejected) {
      return res.status(404).json({ error: 'Facility not found' });
    }
    res.json({
      message: `Facility registration request has been rejected.`,
      facility: rejected
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. Audit Logs
router.get('/audit-logs', (req, res) => {
  try {
    const logs = dbStore.getAuditLogs();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. System Settings
router.get('/settings', (req, res) => {
  try {
    const settings = dbStore.getSystemSettings();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/settings', (req, res) => {
  try {
    const updated = dbStore.updateSystemSettings(req.body, req.user);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 6. Government Dataset Imports
router.post('/import', (req, res) => {
  try {
    const { datasetType, records } = req.body;
    if (!datasetType || !Array.isArray(records)) {
      return res.status(400).json({ error: 'datasetType and records array are required' });
    }
    const result = dbStore.importDataset(datasetType, records, req.user);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 7. Crop Production & GIS Updates
router.put('/crop-production/:id', (req, res) => {
  try {
    const updated = dbStore.updateCropProduction(req.params.id, req.body, req.user);
    if (!updated) return res.status(404).json({ error: 'Crop production record not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/gis-regions/:id', (req, res) => {
  try {
    const updated = dbStore.updateGisRegion(req.params.id, req.body, req.user);
    if (!updated) return res.status(404).json({ error: 'GIS region record not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
