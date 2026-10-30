import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import sharp from 'sharp';

const TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = 'ZTSXaG0vjNsCjc4EzXZV5n';

const OUT_DIR = path.resolve('public/work/a2ui/screens/figma');
const RAW_PNG_DIR = path.resolve('/tmp/a2ui-figma-raw-png');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}
if (!fs.existsSync(RAW_PNG_DIR)) {
  fs.mkdirSync(RAW_PNG_DIR, { recursive: true });
}

const frames = [
  { slug: '01-end-to-end-flow', id: '284:7332' },
  { slug: '02-question-first-step', id: '280:4637' },
  { slug: '03-question-multiselect-other', id: '282:4849' },
  { slug: '04-question-validation-error', id: '283:5099' },
  { slug: '05-question-answered-summary', id: '283:5390' },
  { slug: '06-decisions-review', id: '284:6740' },
  { slug: '07-decisions-confirmed-plan', id: '284:7005' },
  { slug: '08-plan-started', id: '284:6871' },
  { slug: '09-plan-modify-v2', id: '284:7162' },
  { slug: '10-permission-allow', id: '284:5706' },
  { slug: '11-permission-outcomes-destructive', id: '284:5866' },
  { slug: '12-permission-superseded-reasked', id: '284:6016' },
  { slug: '13-form', id: '299:6666' },
  { slug: '14-form-validation-upload-errors', id: '299:7551' },
  { slug: '15-file-upload-request', id: '299:6803' },
  { slug: '16-searchable-dropdown', id: '299:7279' },
  { slug: '17-date-time-slot', id: '299:7413' },
  { slug: '18-submitted-result-actions', id: '299:8373' },
  { slug: '19-kpi', id: '28:11443' },
  { slug: '20-table-view', id: '299:8558' },
  { slug: '21-bar-chart', id: '299:7692' },
  { slug: '22-line-donut-scatter', id: '301:7265' },
  { slug: '23-list', id: '21:10025' },
  { slug: '24-code-snippet', id: '84:3233' },
  { slug: '25-error', id: '16:9168' },
  { slug: '26-success', id: '25:10547' },
  { slug: '27-info', id: '25:10751' },
  { slug: '28-empty-state', id: '87:6140' },
  { slug: '29-loading-initial-l1', id: '268:4347' },
  { slug: '30-loading-initial-l2', id: '268:4238' },
  { slug: '31-loading-initial-l3', id: '268:4128' },
  { slug: '32-loading-mao', id: '153:4533' },
  { slug: '34-orb-loader', id: '205:6346' },
  { slug: '35-skeleton', id: '268:4568' },
  { slug: '36-menu', id: '153:5031' },
  { slug: '37-text-input', id: '14:8972' },
  { slug: '38-data-table', id: '14:3620' },
  { slug: '39-liability-summary', id: '299:6936' },
  { slug: '40-agent-thinking-states', id: '205:5931' },
];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'X-Figma-Token': TOKEN } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        } else {
          resolve(JSON.parse(data));
        }
      });
    }).on('error', reject);
  });
}

function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode >= 400) {
        reject(new Error(`Failed to download: HTTP ${res.statusCode}`));
        return;
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function run() {
  console.log(`Starting export of ${frames.length} frames in batches of 5...`);
  const BATCH_SIZE = 5;
  const manifest = {};
  const report = [];

  for (let i = 0; i < frames.length; i += BATCH_SIZE) {
    const batch = frames.slice(i, i + BATCH_SIZE);
    const ids = batch.map(f => f.id).join(',');
    console.log(`\nFetching batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(frames.length / BATCH_SIZE)}: ${batch.map(f => f.slug).join(', ')}`);

    const apiUrl = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(ids)}&scale=2&format=png`;
    const res = await fetchJson(apiUrl);
    
    if (res.err) {
      console.error(`Error in batch: ${res.err}`);
      continue;
    }

    for (const f of batch) {
      const imgUrl = res.images[f.id];
      if (!imgUrl) {
        console.error(`  ⚠️ No URL returned for ${f.slug} (${f.id})`);
        report.push({ slug: f.slug, id: f.id, status: 'NO_URL' });
        continue;
      }

      console.log(`  Downloading ${f.slug}...`);
      const pngBuf = await downloadBuffer(imgUrl);

      // Save raw PNG
      const rawPngPath = path.join(RAW_PNG_DIR, `${f.slug}.png`);
      fs.writeFileSync(rawPngPath, pngBuf);

      // Process with sharp
      let img = sharp(pngBuf);
      let meta = await img.metadata();

      let targetWidth = meta.width;
      let targetHeight = meta.height;

      // Cap at maximum width 2400 px
      if (meta.width > 2400) {
        targetWidth = 2400;
        targetHeight = Math.round((meta.height * 2400) / meta.width);
        img = img.resize(2400, targetHeight, { fit: 'inside' });
      }

      const webpBuffer = await img.webp({ quality: 90 }).toBuffer();
      const finalWebpPath = path.join(OUT_DIR, `${f.slug}.webp`);
      fs.writeFileSync(finalWebpPath, webpBuffer);

      // Final metadata
      const finalMeta = await sharp(webpBuffer).metadata();
      manifest[`${f.slug}.webp`] = {
        width: finalMeta.width,
        height: finalMeta.height,
      };

      const sizeKb = (webpBuffer.length / 1024).toFixed(1);
      console.log(`  ✓ Saved ${f.slug}.webp: ${finalMeta.width}x${finalMeta.height} (${sizeKb} KB)`);

      report.push({
        slug: f.slug,
        id: f.id,
        width: finalMeta.width,
        height: finalMeta.height,
        sizeKb,
        status: 'OK'
      });
    }
  }

  const manifestPath = path.join(OUT_DIR, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\n✅ All screens exported! Manifest saved to: ${manifestPath}`);

  fs.writeFileSync(path.join(OUT_DIR, 'export-report.json'), JSON.stringify(report, null, 2));
}

run().catch(err => {
  console.error('Export failed:', err);
  process.exit(1);
});
