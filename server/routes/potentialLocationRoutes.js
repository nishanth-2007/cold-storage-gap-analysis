import express from 'express';
import newStorageLocationService from '../services/newStorageLocationService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await newStorageLocationService.getPotentialLocations(req.query.district);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cluster = await newStorageLocationService.getLocationById(req.params.id);
    res.json(cluster);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

export default router;
