import express from 'express';
import cropProductionService from '../services/cropProductionService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const crops = await cropProductionService.getCropProduction(req.query.district);
    res.json(crops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/crops', async (req, res) => {
  try {
    const crops = await cropProductionService.getHorticultureCrops();
    res.json(crops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const stats = await cropProductionService.getProductionStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
