import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { COMPREHENSIVE_POTENTIAL_LOCATIONS } from './generate_potential_locations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localDbPath = path.join(__dirname, '../server/data/local_db.json');
const seedDataPath = path.join(__dirname, '../server/data/seedData.js');

// 1. Update local_db.json
if (fs.existsSync(localDbPath)) {
  const localDb = JSON.parse(fs.readFileSync(localDbPath, 'utf-8'));
  localDb.potential_locations = COMPREHENSIVE_POTENTIAL_LOCATIONS;
  fs.writeFileSync(localDbPath, JSON.stringify(localDb, null, 2), 'utf-8');
  console.log('Successfully updated local_db.json with 26 calculated potential locations!');
} else {
  console.warn('local_db.json not found!');
}

// 2. Update seedData.js
let seedDataContent = fs.readFileSync(seedDataPath, 'utf-8');

const potJson = JSON.stringify(COMPREHENSIVE_POTENTIAL_LOCATIONS, null, 2);
const potReplacement = `export const SEED_POTENTIAL_LOCATIONS = ${potJson};`;

seedDataContent = seedDataContent.replace(
  /export const SEED_POTENTIAL_LOCATIONS = \[\s*\{[\s\S]*?\}\s*\];/,
  potReplacement
);

fs.writeFileSync(seedDataPath, seedDataContent, 'utf-8');
console.log('Successfully updated seedData.js with 26 calculated potential locations!');
