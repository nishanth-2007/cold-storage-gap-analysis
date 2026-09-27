import express from 'express';
import gisService from '../services/gisService.js';

const router = express.Router();

router.get('/hierarchy', (req, res) => {
  try {
    const data = gisService.getAdministrativeHierarchy();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/districts', (req, res) => {
  try {
    const districts = gisService.getDistricts();
    res.json(districts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/mandals/:district', (req, res) => {
  try {
    const mandals = gisService.getMandalsByDistrict(req.params.district);
    res.json(mandals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/villages/:district/:mandal', (req, res) => {
  try {
    const villages = gisService.getVillages(req.params.district, req.params.mandal);
    res.json(villages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
