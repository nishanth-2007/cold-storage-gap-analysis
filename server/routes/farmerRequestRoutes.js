import express from 'express';
import dbStore from '../db/dbStore.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const { targetColdStorageId } = req.query;
    const requests = dbStore.getFarmerRequests(targetColdStorageId);
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', (req, res) => {
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
      return res.status(400).json({ error: 'Farmer name, phone, quantity, and target storage are required' });
    }

    const created = dbStore.createFarmerRequest({
      farmerName,
      phone,
      district,
      mandal,
      village,
      crop,
      quantityMT: Number(quantityMT),
      requiredFromDate: requiredFromDate || new Date().toISOString().split('T')[0],
      durationMonths: Number(durationMonths) || 3,
      targetColdStorageId,
      targetColdStorageName,
      estimatedMonthlyCostINR: Number(estimatedMonthlyCostINR) || 0
    });

    res.status(201).json({
      message: 'Cold storage reservation request transmitted to facility operator',
      request: created
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Accepted', 'Rejected', 'Completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid request status' });
    }
    const updated = dbStore.updateFarmerRequestStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ error: 'Request not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
