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
  // Let's get full details of canvas 926:7226, 4521:8426, 4547:36595, 5257:4907
  const res1 = await fetchFigma(`https://api.figma.com/v1/files/${file1}/nodes?ids=926:7226,4547:36595,5257:4907&depth=2`);
  
  const report = {};
  for (const [id, nodeData] of Object.entries(res1.nodes || {})) {
    const doc = nodeData.document;
    report[doc.name + ' (' + id + ')'] = (doc.children || []).map(c => ({
      id: c.id,
      name: c.name,
      type: c.type,
      width: c.absoluteBoundingBox?.width,
      height: c.absoluteBoundingBox?.height,
      subChildren: c.children?.length
    }));
  }

  const file2 = 'VVAkZC62HOoBDrgVh5eZuR';
  const res2 = await fetchFigma(`https://api.figma.com/v1/files/${file2}/nodes?ids=2042:108958&depth=2`);
  for (const [id, nodeData] of Object.entries(res2.nodes || {})) {
    const doc = nodeData.document;
    report[doc.name + ' (' + id + ')'] = (doc.children || []).map(c => ({
      id: c.id,
      name: c.name,
      type: c.type,
      width: c.absoluteBoundingBox?.width,
      height: c.absoluteBoundingBox?.height,
      subChildren: c.children?.length
    }));
  }

  fs.writeFileSync('scripts/agent-registry-frames.json', JSON.stringify(report, null, 2));
  console.log('Saved report to scripts/agent-registry-frames.json');
}

run().catch(console.error);
