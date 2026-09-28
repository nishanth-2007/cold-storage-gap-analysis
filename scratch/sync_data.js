import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { COMPREHENSIVE_COLD_STORAGES, COMPREHENSIVE_MARKETS } from './comprehensive_data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localDbPath = path.join(__dirname, '../server/data/local_db.json');
const seedDataPath = path.join(__dirname, '../server/data/seedData.js');

// 1. Update local_db.json
if (fs.existsSync(localDbPath)) {
  const localDb = JSON.parse(fs.readFileSync(localDbPath, 'utf-8'));
  localDb.cold_storages = COMPREHENSIVE_COLD_STORAGES;
  localDb.markets = COMPREHENSIVE_MARKETS;
  fs.writeFileSync(localDbPath, JSON.stringify(localDb, null, 2), 'utf-8');
  console.log('Successfully updated local_db.json with 58 cold storages and 26 markets!');
} else {
  console.warn('local_db.json not found!');
}

// 2. Read seedData.js
let seedDataContent = fs.readFileSync(seedDataPath, 'utf-8');

// Replace SEED_COLD_STORAGES = [...];
const csJson = JSON.stringify(COMPREHENSIVE_COLD_STORAGES, null, 2);
const csReplacement = `export const SEED_COLD_STORAGES = ${csJson};`;

// Replace SEED_MARKETS = [...];
const mktJson = JSON.stringify(COMPREHENSIVE_MARKETS, null, 2);
const mktReplacement = `export const SEED_MARKETS = ${mktJson};`;

// Match export const SEED_COLD_STORAGES = [ ... ];
seedDataContent = seedDataContent.replace(
  /export const SEED_COLD_STORAGES = \[\s*\{[\s\S]*?\}\s*\];/,
  csReplacement
);

// Match export const SEED_MARKETS = [ ... ];
seedDataContent = seedDataContent.replace(
  /export const SEED_MARKETS = \[\s*\{[\s\S]*?\}\s*\];/,
  mktReplacement
);

fs.writeFileSync(seedDataPath, seedDataContent, 'utf-8');
console.log('Successfully updated seedData.js with 58 cold storages and 26 markets!');
