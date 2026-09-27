import express from 'express';
import gapAnalysisService from '../services/gapAnalysisService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await gapAnalysisService.getGapAnalysis(req.query.district);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:district', async (req, res) => {
  try {
    const details = await gapAnalysisService.getDistrictGapDetails(req.params.district);
    res.json(details);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

export default router;
