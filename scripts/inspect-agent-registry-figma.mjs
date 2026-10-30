import https from 'node:https';

const TOKEN = process.env.FIGMA_TOKEN;

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
  console.log('Inspecting Zebra - Agent Registry (JVH6LkPzjTIWByrXdEJ10f)...');
  const nodes1 = ['926:7226', '4521:8426', '4547:36595', '5257:4907'];
  const res1 = await fetchFigma(`https://api.figma.com/v1/files/JVH6LkPzjTIWByrXdEJ10f/nodes?ids=${nodes1.join(',')}`);
  
  for (const [id, nodeData] of Object.entries(res1.nodes || {})) {
    const doc = nodeData.document;
    console.log(`Node ${id}: name="${doc?.name}", type=${doc?.type}, children=${doc?.children?.length || 0}`);
    if (doc?.children) {
      doc.children.slice(0, 10).forEach(c => console.log(`  - [${c.id}] ${c.name} (${c.type})`));
    }
  }

  console.log('\nInspecting Tenant Onboarding (VVAkZC62HOoBDrgVh5eZuR)...');
  const nodes2 = ['2042:108958'];
  const res2 = await fetchFigma(`https://api.figma.com/v1/files/VVAkZC62HOoBDrgVh5eZuR/nodes?ids=${nodes2.join(',')}`);
  for (const [id, nodeData] of Object.entries(res2.nodes || {})) {
    const doc = nodeData.document;
    console.log(`Node ${id}: name="${doc?.name}", type=${doc?.type}, children=${doc?.children?.length || 0}`);
    if (doc?.children) {
      doc.children.slice(0, 15).forEach(c => console.log(`  - [${c.id}] ${c.name} (${c.type})`));
    }
  }
}

run().catch(console.error);
