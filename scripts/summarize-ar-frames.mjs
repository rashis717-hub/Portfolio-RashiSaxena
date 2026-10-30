import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('scripts/agent-registry-frames.json', 'utf8'));

for (const [section, items] of Object.entries(data)) {
  console.log(`\n=== ${section} (Total: ${items.length}) ===`);
  const names = {};
  items.forEach(it => {
    names[it.name] = (names[it.name] || 0) + 1;
  });
  console.log(names);
}
