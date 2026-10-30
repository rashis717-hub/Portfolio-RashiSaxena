import fs from 'node:fs';

const catalog = JSON.parse(fs.readFileSync('scripts/ar-frame-catalog.json', 'utf8'));

console.log(`Total frames: ${catalog.length}`);

// Group by section
const bySec = {};
for (const item of catalog) {
  const key = `${item.canvas} > ${item.section}`;
  if (!bySec[key]) bySec[key] = [];
  bySec[key].push(item);
}

for (const [key, items] of Object.entries(bySec)) {
  console.log(`\n--- ${key} (${items.length} items) ---`);
  items.slice(0, 15).forEach(it => {
    console.log(`  [${it.id}] "${it.name}" (${it.width}x${it.height})`);
  });
}
