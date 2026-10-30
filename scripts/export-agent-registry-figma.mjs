import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import sharp from 'sharp';

const TOKEN = process.env.FIGMA_TOKEN || "";
const FILE_KEY_MAIN = 'JVH6LkPzjTIWByrXdEJ10f';
const FILE_KEY_ONBOARDING = 'VVAkZC62HOoBDrgVh5eZuR';

const OUT_DIR = path.resolve('public/work/agent-registry/screens/figma');
const RAW_DIR = path.resolve('/tmp/agent-registry-raw');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
if (!fs.existsSync(RAW_DIR)) fs.mkdirSync(RAW_DIR, { recursive: true });

// We want clean, high-value frames representing the entire product:
// 1. Agent Library List / Grid
// 2. Define Agent (Helm-driven onboarding)
// 3. Deployment Canvas (React Flow)
// 4. Tenant Management landing
// 5. Create Tenant modal
// 6. MAO Configuration step
// 7. Tenant Detail (DEV, Ready for deployment)
// 8. Map Agent dialog
// 9. Map Agent drawer (version, skills, config)
// 10. Skills override drawer
// 11. Config override drawer
// 12. Deploy Tenant dialog (Shared mode, New Plan badge)
// 13. Running agents on Tenant Detail
// 14. Promotion Requests (Tenant Admin review)
// 15. Promotion Requests (Cloud Ops review table)
// 16. Config Diff / View Specs
// 17. Rollback Deployment dialog

const framesToExport = [
  // From JVH6LkPzjTIWByrXdEJ10f
  { file: FILE_KEY_MAIN, slug: '01-agent-library', id: '926:7227' },
  { file: FILE_KEY_MAIN, slug: '02-define-agent-helm', id: '926:8612' },
  { file: FILE_KEY_MAIN, slug: '03-deployment-canvas', id: '4547:36596' },
  { file: FILE_KEY_MAIN, slug: '04-tenant-management', id: '5257:41746' },
  { file: FILE_KEY_MAIN, slug: '05-create-tenant-modal', id: '5257:42121' },
  { file: FILE_KEY_MAIN, slug: '06-mao-configuration', id: '5257:42347' },
  { file: FILE_KEY_MAIN, slug: '07-tenant-detail-dev', id: '5257:42581' },
  { file: FILE_KEY_MAIN, slug: '08-map-agent-modal', id: '5257:42892' },
  { file: FILE_KEY_MAIN, slug: '09-map-agent-drawer', id: '5257:43339' },
  { file: FILE_KEY_MAIN, slug: '10-tenant-mapped-cards', id: '5257:43684' },
  { file: FILE_KEY_MAIN, slug: '11-mao-config-tab', id: '5257:44132' },
  { file: FILE_KEY_MAIN, slug: '12-deploy-tenant-modal', id: '5257:44674' },
  { file: FILE_KEY_MAIN, slug: '13-deployment-in-progress', id: '5257:44983' },
  { file: FILE_KEY_MAIN, slug: '14-tenant-ready-to-promote', id: '5257:45485' },
  { file: FILE_KEY_MAIN, slug: '15-promotion-requests-tenant-admin', id: '5257:45999' },
  { file: FILE_KEY_MAIN, slug: '16-promotion-requests-cloud-ops', id: '5257:46549' },
  { file: FILE_KEY_MAIN, slug: '17-tenant-pilot-t-pr-raised', id: '5257:47113' },
  { file: FILE_KEY_MAIN, slug: '18-rollback-dialog', id: '5257:47596' },
];

function fetchJson(url) {
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

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  console.log(`Exporting ${framesToExport.length} frames from Figma...`);
  
  // Group by file
  const byFile = {};
  for (const f of framesToExport) {
    if (!byFile[f.file]) byFile[f.file] = [];
    byFile[f.file].push(f);
  }

  const manifest = {};

  for (const [fileKey, items] of Object.entries(byFile)) {
    const ids = items.map(i => i.id).join(',');
    console.log(`Requesting export URLs for ${items.length} frames in file ${fileKey}...`);
    const apiUrl = `https://api.figma.com/v1/images/${fileKey}?ids=${ids}&format=png&scale=2`;
    const res = await fetchJson(apiUrl);
    
    if (res.err) {
      console.error(`Figma API error for file ${fileKey}:`, res.err);
      continue;
    }

    const images = res.images || {};
    for (const item of items) {
      const imgUrl = images[item.id];
      if (!imgUrl) {
        console.warn(`No image URL returned for ${item.slug} (${item.id})`);
        continue;
      }

      const rawPngPath = path.join(RAW_DIR, `${item.slug}.png`);
      const webpPath = path.join(OUT_DIR, `${item.slug}.webp`);

      console.log(`Downloading ${item.slug}...`);
      await downloadFile(imgUrl, rawPngPath);

      // Convert to WebP using sharp with high fidelity
      const image = sharp(rawPngPath);
      const meta = await image.metadata();

      let pipeline = image;
      if (meta.width && meta.width > 2400) {
        pipeline = pipeline.resize(2400, null, { withoutEnlargement: true });
      }

      await pipeline.webp({ quality: 90, effort: 4 }).toFile(webpPath);
      const finalMeta = await sharp(webpPath).metadata();

      manifest[item.slug] = {
        file: `${item.slug}.webp`,
        path: `/work/agent-registry/screens/figma/${item.slug}.webp`,
        width: finalMeta.width,
        height: finalMeta.height,
        figmaId: item.id
      };
      console.log(`✓ Saved ${item.slug}.webp (${finalMeta.width}x${finalMeta.height})`);
    }
  }

  fs.writeFileSync(path.join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('Finished exporting frames and saved manifest.json!');
}

run().catch(console.error);
