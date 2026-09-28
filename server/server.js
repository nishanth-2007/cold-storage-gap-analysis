import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase, dbStore } from './db/dbStore.js';
import { requireAuth, requireRole } from './middleware/authMiddleware.js';
import { ROLES } from './config/roles.js';
import inventoryService from './services/inventoryService.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import coldStorageRoutes from './routes/coldStorageRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';
import gapAnalysisRoutes from './routes/gapAnalysisRoutes.js';
import potentialLocationRoutes from './routes/potentialLocationRoutes.js';
import cropProductionRoutes from './routes/cropProductionRoutes.js';
import marketRoutes from './routes/marketRoutes.js';
import gisRoutes from './routes/gisRoutes.js';
import dataSourceRoutes from './routes/dataSourceRoutes.js';
import farmerRequestRoutes from './routes/farmerRequestRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend Vite dev server and production clients
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/cold-storages', coldStorageRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/gap-analysis', gapAnalysisRoutes);
app.use('/api/potential-locations', potentialLocationRoutes);
app.use('/api/crop-production', cropProductionRoutes);
app.use('/api/markets', marketRoutes);
app.use('/api/gis', gisRoutes);
app.use('/api/data-sources', dataSourceRoutes);
app.use('/api/farmer-requests', farmerRequestRoutes);
app.use('/api/admin', adminRoutes);

// Explicit Specification Endpoints (Section 25 & Section 31)
// 1. POST /api/government-data/import (Allowed: Admin only; Rejects with HTTP 403)
app.post('/api/government-data/import', requireAuth, requireRole(ROLES.ADMIN), (req, res) => {
  try {
    const { datasetType, records } = req.body;
    if (!datasetType || !Array.isArray(records)) {
      return res.status(400).json({ error: 'datasetType and records array are required' });
    }
    const result = dbStore.importDataset(datasetType, records, req.user);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 2. POST /api/owner/inventory (Allowed: Owner, Admin; Rejects with HTTP 403)
app.post('/api/owner/inventory', requireAuth, requireRole(ROLES.OWNER, ROLES.ADMIN), async (req, res) => {
  try {
    const { facilityId, chambers = [] } = req.body;
    if (!facilityId) {
      return res.status(400).json({ error: 'facilityId is required to update inventory' });
    }
    const updated = await inventoryService.updateChamberInventory(facilityId, chambers);
    res.json({ message: 'Chamber inventory updated successfully', facility: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3. POST /api/storage-request (Allowed: Farmer, Admin; Rejects with HTTP 403)
app.post('/api/storage-request', requireAuth, requireRole(ROLES.FARMER, ROLES.ADMIN), (req, res) => {
  try {
    const created = dbStore.createFarmerRequest({
      ...req.body,
      quantityMT: Number(req.body.quantityMT) || 10
    }, req.user);
    res.status(201).json({ message: 'Storage reservation recorded', request: created });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. Direct URL Rejections (Section 31 tests: /admin/users, /admin/data-import)
app.all('/admin/users', requireAuth, requireRole(ROLES.ADMIN), (req, res) => {
  const users = dbStore.getUsers().map(({ passwordHash, ...safeUser }) => safeUser);
  res.json(users);
});

app.all(['/admin/data-import', '/api/admin/data-import'], requireAuth, requireRole(ROLES.ADMIN), (req, res) => {
  res.json({ message: 'Authorized access to admin data import' });
});

// Health check and system diagnostic
app.get('/api/health', (req, res) => {
  const coldStorages = dbStore.getColdStorages();
  const gapAnalysis = dbStore.getGapAnalysis();
  const potential = dbStore.getPotentialLocations();

  res.json({
    status: 'ONLINE',
    system: 'Cold Storage Gap Mapping Platform for Horticulture Produce',
    geographicScope: 'Andhra Pradesh, India',
    version: '1.0.0',
    database: {
      isMongoConnected: dbStore.getIsMongoConnected(),
      mode: dbStore.getIsMongoConnected() ? 'MongoDB Replica/Cluster' : 'Embedded Resilient AP Spatial Store'
    },
    metrics: {
      registeredFacilitiesAP: coldStorages.length,
      districtsCovered: 26,
      storageGapRecords: gapAnalysis.length,
      potentialHotspotsIdentified: potential.length
    },
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[API Error]:', err.stack || err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Production SPA Static Serving & Deep Route Fallback (e.g. /admin-login, /map, etc.)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDist = path.resolve(__dirname, '../client/dist');

if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(clientDist, 'index.html'));
    }
    next();
  });
}

// Start server
async function startServer() {
  await initDatabase();

  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(` Cold Storage Gap Mapping Backend API Server`);
    console.log(` Focus: Andhra Pradesh, India`);
    console.log(` Running on: http://localhost:${PORT}`);
    console.log(` API Health: http://localhost:${PORT}/api/health`);
    console.log(`=======================================================`);
  });
}

startServer();
