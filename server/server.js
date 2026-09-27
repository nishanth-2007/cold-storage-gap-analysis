import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase, dbStore } from './db/dbStore.js';

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
