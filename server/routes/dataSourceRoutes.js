import express from 'express';
import dataSourceService from '../services/dataSourceService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await dataSourceService.getDataSources();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/summary', async (req, res) => {
  try {
    const summary = await dataSourceService.getMetadataSummary();
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
