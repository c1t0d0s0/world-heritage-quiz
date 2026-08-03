import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawDataPath = path.join(__dirname, '../src/data/world_heritage_sites.json');
const rawData = JSON.parse(fs.readFileSync(rawDataPath, 'utf-8'));

console.log(`Initial total loaded: ${rawData.length}`);

// Filter & normalize items
// 1. Must have valid Japanese name
// 2. Prioritize items with unescoId or clear heritage traits
// 3. Deduplicate
const siteMap = new Map();

for (const site of rawData) {
  if (!site.name || site.name.length < 2) continue;
  
  // Clean name (remove Wikidata Q-IDs or strange patterns if any)
  if (/^Q\d+$/.test(site.name)) continue;

  const key = site.name.trim();

  if (!siteMap.has(key)) {
    siteMap.set(key, site);
  } else {
    // If existing doesn't have unescoId and this one does, replace
    const existing = siteMap.get(key);
    if (!existing.unescoId && site.unescoId) {
      siteMap.set(key, site);
    }
  }
}

let cleanedList = Array.from(siteMap.values());

// Sort: Items with unescoId first, then by name
cleanedList.sort((a, b) => {
  if (a.unescoId && !b.unescoId) return -1;
  if (!a.unescoId && b.unescoId) return 1;
  return a.name.localeCompare(b.name, 'ja');
});

// Take top high-quality World Heritage items (up to 1273)
if (cleanedList.length > 1273) {
  cleanedList = cleanedList.slice(0, 1273);
}

console.log(`Cleaned dataset count: ${cleanedList.length} items.`);

// Re-assign neat index IDs
cleanedList = cleanedList.map((item, index) => {
  return {
    id: `site_${index + 1}`,
    unescoId: item.unescoId || null,
    name: item.name,
    nameEn: item.nameEn,
    country: item.country,
    countryEn: item.countryEn,
    region: item.region,
    category: item.category,
    categoryJa: item.categoryJa,
    yearInscribed: item.yearInscribed,
    description: item.description
  };
});

fs.writeFileSync(rawDataPath, JSON.stringify(cleanedList, null, 2), 'utf-8');
console.log(`Saved refined ${cleanedList.length} items to ${rawDataPath}`);
