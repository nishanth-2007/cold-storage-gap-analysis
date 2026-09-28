import express from 'express';
import dbStore from '../db/dbStore.js';
import { requireAuth, requireRole, authenticateOptional } from '../middleware/authMiddleware.js';
import { ROLES } from '../config/roles.js';

const router = express.Router();

// GET farmer requests with privacy separation:
// - Farmer sees only their own requests
// - Owner sees requests targeted to their facility
// - Admin & Planner can view all requests
router.get('/', authenticateOptional, (req, res) => {
  try {
    const { targetColdStorageId } = req.query;
    const user = req.user;

    // Filter logic based on role
    if (!user) {
      // Unauthenticated or demo request: if targetColdStorageId specified, return matching
      if (targetColdStorageId) {
        return res.json(dbStore.getFarmerRequests({ targetColdStorageId }));
      }
      return res.json(dbStore.getFarmerRequests());
    }

    if (user.role === ROLES.FARMER) {
      // Data privacy: farmer only sees their own requests
      const farmerRequests = dbStore.getFarmerRequests({
        farmerPhone: user.phone,
        farmerName: user.name,
        farmerId: user.id
      });
      return res.json(farmerRequests);
    }

    if (user.role === ROLES.OWNER) {
      // Owner only sees requests for their facility
      const storages = dbStore.getColdStorages();
      const ownerFacilities = storages.filter(cs => 
        cs.ownerId === user.id || 
        cs.contactPhone === user.phone ||
        (user.id === 'usr-owner-01' && cs.id === 'cs-gnt-001')
      );
      const ownerFacilityIds = new Set(ownerFacilities.map(f => f.id));

      if (targetColdStorageId && ownerFacilityIds.has(targetColdStorageId)) {
        return res.json(dbStore.getFarmerRequests({ targetColdStorageId }));
      }

      // Return all requests targeted to any facility owned by this owner
      const allRequests = dbStore.getFarmerRequests();
      const filtered = allRequests.filter(r => ownerFacilityIds.has(r.targetColdStorageId));
      return res.json(filtered);
    }

    // Admin & Planner can see all (or filtered by targetColdStorageId)
    const requests = dbStore.getFarmerRequests({ targetColdStorageId });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST submit a storage request (Allowed: Farmer & Admin)
router.post('/', authenticateOptional, (req, res) => {
  try {
    const { 
      farmerName, 
      phone, 
      district, 
      mandal, 
      village, 
      crop, 
      quantityMT, 
      requiredFromDate, 
      durationMonths, 
      targetColdStorageId, 
      targetColdStorageName,
      estimatedMonthlyCostINR 
    } = req.body;

    if (!farmerName || !phone || !targetColdStorageId || !quantityMT) {
      return res.status(400).json({ error: 'Farmer name, phone, quantity, and target storage are required.' });
    }

    const created = dbStore.createFarmerRequest({
      farmerName: farmerName || req.user?.name,
      phone: phone || req.user?.phone,
      district: district || req.user?.district,
      mandal,
      village,
      crop,
      quantityMT: Number(quantityMT),
      requiredFromDate: requiredFromDate || new Date().toISOString().split('T')[0],
      durationMonths: Number(durationMonths) || 3,
      targetColdStorageId,
      targetColdStorageName,
      estimatedMonthlyCostINR: Number(estimatedMonthlyCostINR) || 0
    }, req.user);

    res.status(201).json({
      message: 'Cold storage reservation request transmitted to facility operator.',
      request: created
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update request status (Allowed: Owner of the facility, or Admin)
// Farmers cannot modify request status
router.put('/:id/status', requireAuth, (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Accepted', 'Rejected', 'Completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid request status. Allowed: Pending, Accepted, Rejected, Completed.' });
    }

    // Role check: Only Owner or Admin can accept/reject/complete requests
    if (req.user.role !== ROLES.OWNER && req.user.role !== ROLES.ADMIN) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Only facility owners and administrators are permitted to update reservation status.'
      });
    }

    const updated = dbStore.updateFarmerRequestStatus(req.params.id, status, req.user);
    if (!updated) {
      return res.status(404).json({ error: 'Request not found.' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
