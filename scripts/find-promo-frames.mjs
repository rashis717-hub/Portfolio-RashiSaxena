import https from 'node:https';

const TOKEN = process.env.FIGMA_TOKEN || "";

async function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'X-FIGMA-TOKEN': TOKEN } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
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
  const ids = [
    '5257:61979', '5257:62289', '5257:62599', '5257:62823', '5257:63139',
    '5257:63462', '5257:63772', '5257:64390', '5257:64761', '5257:65196',
    '5257:65627', '5257:66026', '5257:66418', '5257:66737', '5257:67115'
  ];
  const res = await fetchJson(`https://api.figma.com/v1/files/JVH6LkPzjTIWByrXdEJ10f/nodes?ids=${ids.join(',')}&depth=4`);
  for (const [id, data] of Object.entries(res.nodes || {})) {
    const doc = data.document;
    const texts = findTexts(doc).filter(t => !t.startsWith('t1') && !t.startsWith('t2')).slice(0, 6);
    console.log(`[${id}] -> ${texts.join(' | ')}`);
  }
}

run().catch(console.error);
