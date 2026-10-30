import https from 'node:https';

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
    const t = node.characters.trim().replace(/\s+/g, ' ');
    if (t && !t.includes('This is a hint') && t.length > 2 && t.length < 80) {
      texts.push(t);
    }
  }
  if (node.children) {
    for (const c of node.children) findTexts(c, texts);
  }
  return texts;
}

async function run() {
  const file1 = 'JVH6LkPzjTIWByrXdEJ10f';
  const ids = [
    '5257:44132', '5257:44674', '5257:45485', '5257:45999', '5257:46549',
    '5257:47113', '5257:47596', '5257:48083', '5257:48577', '5257:49065',
    '5257:49557', '5257:50047', '5257:50535', '5257:51025'
  ];
  const res = await fetchFigma(`https://api.figma.com/v1/files/${file1}/nodes?ids=${ids.join(',')}&depth=4`);
  for (const [id, data] of Object.entries(res.nodes || {})) {
    const doc = data.document;
    const texts = findTexts(doc).slice(0, 6);
    console.log(`[${id}] -> ${texts.join(' | ')}`);
  }
}

run().catch(console.error);
