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

function findTexts(node, texts = []) {
  if (node.type === 'TEXT' && node.characters) {
    texts.push(node.characters.trim().replace(/\n+/g, ' '));
  }
  if (node.children) {
    for (const c of node.children) {
      findTexts(c, texts);
    }
  }
  return texts;
}

async function run() {
  const file1 = 'JVH6LkPzjTIWByrXdEJ10f';
  // Let's sample key frames from Updated Tenant Onboarding
  const ids = [
    '5257:41746', '5257:41915', '5257:42121', '5257:42347', '5257:42581',
    '5257:42892', '5257:43339', '5257:43684', '5257:43908', '5257:44132',
    '5257:44360', '5257:44674', '5257:44983', '5257:45485', '5257:45999',
    '5257:46549', '5257:47113', '5257:47596', '5257:48083', '5257:48577'
  ];

  const res = await fetchFigma(`https://api.figma.com/v1/files/${file1}/nodes?ids=${ids.join(',')}&depth=4`);
  
  const results = [];
  for (const [id, data] of Object.entries(res.nodes || {})) {
    const doc = data.document;
    const texts = findTexts(doc);
    // Find significant headers (e.g. dialog title, page header)
    const significant = texts.filter(t => t.length > 3 && t.length < 60).slice(0, 8);
    results.push({
      id,
      name: doc.name,
      headers: significant
    });
  }

  for (const r of results) {
    console.log(`[${r.id}] -> ${r.headers.join(' | ')}`);
  }
}

run().catch(console.error);
