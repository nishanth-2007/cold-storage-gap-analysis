import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localDbPath = path.join(__dirname, '../server/data/local_db.json');
const seedDataPath = path.join(__dirname, '../server/data/seedData.js');

// 1. Update local_db.json
if (fs.existsSync(localDbPath)) {
  const localDb = JSON.parse(fs.readFileSync(localDbPath, 'utf-8'));
  localDb.cold_storages = localDb.cold_storages.map(cs => ({
    ...cs,
    isSystemSeed: true,
    isManual: false
  }));
  fs.writeFileSync(localDbPath, JSON.stringify(localDb, null, 2), 'utf-8');
  console.log('Updated local_db.json cold_storages with isSystemSeed: true, isManual: false');
}

// 2. Update seedData.js
if (fs.existsSync(seedDataPath)) {
  let content = fs.readFileSync(seedDataPath, 'utf-8');
  // We can re-import SEED_COLD_STORAGES, update them, and write back
  import('../server/data/seedData.js').then(module => {
    const updated = module.SEED_COLD_STORAGES.map(cs => ({
      ...cs,
      isSystemSeed: true,
      isManual: false
    }));
    const jsonStr = JSON.stringify(updated, null, 2);
    const replacement = `export const SEED_COLD_STORAGES = ${jsonStr};`;
    content = content.replace(/export const SEED_COLD_STORAGES = \[\s*\{[\s\S]*?\}\s*\];/, replacement);
    fs.writeFileSync(seedDataPath, content, 'utf-8');
    console.log('Updated seedData.js cold_storages with isSystemSeed: true, isManual: false');
  });
}
