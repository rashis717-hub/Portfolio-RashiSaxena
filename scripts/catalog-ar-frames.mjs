import https from 'node:https';
import fs from 'node:fs';

const TOKEN = process.env.FIGMA_TOKEN || "";

async function fetchFigma(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'X-FIGMA-TOKEN': TOKEN } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  const file1 = 'JVH6LkPzjTIWByrXdEJ10f';
  // Let's inspect the children of section/canvas 5257:4907 (Updated Tenant Onboarding)
  // and canvas 926:7226
  const res = await fetchFigma(`https://api.figma.com/v1/files/${file1}/nodes?ids=5257:4907,4547:36595,926:7226&depth=3`);
  
  const catalog = [];
  for (const [id, nodeData] of Object.entries(res.nodes || {})) {
    const doc = nodeData.document;
    const canvasName = doc.name;
    for (const child of doc.children || []) {
      // If it's a section, get its children
      if (child.type === 'SECTION') {
        for (const sub of child.children || []) {
          catalog.push({
            canvas: canvasName,
            section: child.name,
            id: sub.id,
            name: sub.name,
            type: sub.type,
            width: Math.round(sub.absoluteBoundingBox?.width || 0),
            height: Math.round(sub.absoluteBoundingBox?.height || 0),
          });
        }
      } else {
        catalog.push({
          canvas: canvasName,
          section: 'root',
          id: child.id,
          name: child.name,
          type: child.type,
          width: Math.round(child.absoluteBoundingBox?.width || 0),
          height: Math.round(child.absoluteBoundingBox?.height || 0),
        });
      }
    }
  }

  fs.writeFileSync('scripts/ar-frame-catalog.json', JSON.stringify(catalog, null, 2));
  console.log(`Saved ${catalog.length} frames to scripts/ar-frame-catalog.json`);
}

run().catch(console.error);
