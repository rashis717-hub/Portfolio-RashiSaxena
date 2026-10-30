import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('scripts/agent-registry-frames.json', 'utf8'));
const frames = data["Updated Tenant Onboarding (5257:4907)"] || [];

const fullFrames = frames.filter(f => f.width === 1728 && f.height > 1000);
console.log(`Found ${fullFrames.length} full-size frames (1728px wide):`);
fullFrames.forEach((f, i) => {
  console.log(`${i}: [${f.id}] "${f.name}" (${f.width}x${f.height})`);
});
