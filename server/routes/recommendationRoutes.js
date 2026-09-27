import express from 'express';
import recommendationService from '../services/recommendationService.js';

const router = express.Router();

// POST match cold storages for farmer
router.post('/match', async (req, res) => {
  try {
    const { district, mandal, village, crop, quantityMT, maxDistanceKm } = req.body;
    if (!district) {
      return res.status(400).json({ error: 'Please select an Andhra Pradesh district' });
    }

    const recommendations = await recommendationService.findColdStoragesForFarmer({
      district,
      mandal,
      village,
      crop,
      quantityMT: quantityMT || 10,
      maxDistanceKm: maxDistanceKm || 150
    });

    res.json(recommendations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
