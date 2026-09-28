import express from 'express';
import gapAnalysisService from '../services/gapAnalysisService.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';
import { ROLES } from '../config/roles.js';

const router = express.Router();

// Strict Role Authorization (Section 25: Allowed for Owner, Planner, Admin)
// Rejects unauthorized roles (e.g. Farmer) with HTTP 403
router.use(requireAuth);
router.use(requireRole(ROLES.OWNER, ROLES.PLANNER, ROLES.ADMIN));

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
