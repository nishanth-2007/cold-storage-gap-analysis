import express from 'express';
import marketService from '../services/marketService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const markets = await marketService.getMarkets();
    res.json(markets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/prices', async (req, res) => {
  try {
    const prices = await marketService.getMarketPrices(req.query.commodity);
    res.json(prices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/roi-calculator', async (req, res) => {
  try {
    const { commodity, quantityMT, durationMonths, coldStorageRentPerMonth } = req.body;
    if (!commodity || !quantityMT) {
      return res.status(400).json({ error: 'Commodity and quantityMT are required' });
    }
    const roi = await marketService.calculateFarmerRoi({
      commodity,
      quantityMT: Number(quantityMT),
      durationMonths: Number(durationMonths) || 3,
      coldStorageRentPerMonth: Number(coldStorageRentPerMonth) || 850
    });
    res.json(roi);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
