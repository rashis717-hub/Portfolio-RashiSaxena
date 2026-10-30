import fs from 'node:fs';
import path from 'node:path';

const SCREENS_DIR = path.resolve('public/work/a2ui/screens/figma');
const DIAGRAMS_DIR = path.resolve('public/work/a2ui/diagrams');

const screensManifest = JSON.parse(fs.readFileSync(path.join(SCREENS_DIR, 'manifest.json'), 'utf8'));
const diagramsManifest = JSON.parse(fs.readFileSync(path.join(DIAGRAMS_DIR, 'manifest.json'), 'utf8'));

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>A2UI Case Study — Visuals Contact Sheet</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap');
    
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Geist', sans-serif;
      background: #FAFAF9;
      color: #0C0D12;
      padding: 60px 80px;
      line-height: 1.5;
    }
    header {
      margin-bottom: 60px;
      border-bottom: 1.5px solid rgba(12, 13, 18, 0.12);
      padding-bottom: 30px;
    }
    .mono { font-family: 'Geist Mono', monospace; font-size: 14px; text-transform: uppercase; letter-spacing: 0.08em; color: #53555B; }
    h1 { font-size: 40px; font-weight: 500; margin-top: 8px; margin-bottom: 12px; }
    h2 { font-size: 26px; font-weight: 500; margin: 50px 0 24px; padding-bottom: 12px; border-bottom: 1px solid rgba(12, 13, 18, 0.1); }
    
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 30px;
    }
    .card {
      background: #FFFFFF;
      border: 1px solid rgba(12, 13, 18, 0.12);
      border-radius: 14px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .card-preview {
      background: #F2F2EF;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 240px;
    }
    .card-preview.dark-preview {
      background: #090A0E;
    }
    .card-preview img {
      max-width: 100%;
      height: auto;
      max-height: 280px;
      object-fit: contain;
      border-radius: 6px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.06);
    }
    .card-meta {
      padding: 16px 20px;
      border-top: 1px solid rgba(12, 13, 18, 0.08);
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .card-filename {
      font-family: 'Geist Mono', monospace;
      font-size: 13px;
      font-weight: 500;
      color: #0C0D12;
    }
    .card-dims {
      font-family: 'Geist Mono', monospace;
      font-size: 12px;
      color: #53555B;
    }
    
    .privacy-box {
      background: #FFFFFF;
      border: 1px solid rgba(12, 13, 18, 0.15);
      border-radius: 16px;
      padding: 32px;
      margin-bottom: 50px;
    }
    .privacy-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      font-size: 15px;
    }
    .privacy-table th, .privacy-table td {
      border: 1px solid rgba(12, 13, 18, 0.1);
      padding: 12px 16px;
      text-align: left;
    }
    .privacy-table th {
      background: #F8F8F6;
      font-family: 'Geist Mono', monospace;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
  </style>
</head>
<body>
  <header>
    <div class="mono">A2UI Visual Assets · Verification Contact Sheet</div>
    <h1>A2UI Screens, Annotated Views & Diagrams</h1>
    <p style="color: #53555B; font-size: 17px; max-width: 800px;">
      Generated per Prompt A2UI-IMAGES. Contains 39 exported Figma screens (WebP at 2x, quality 90), 4 annotated screens (light & dark, 2400px), and 5 architectural diagrams (light & dark, 2400px).
    </p>
  </header>

  <div class="privacy-box">
    <div class="mono" style="margin-bottom: 8px;">Audit Report</div>
    <h3 style="font-size: 22px; margin-bottom: 12px;">Data Privacy & Sensitive Information Findings</h3>
    <p style="color: #53555B; margin-bottom: 16px;">
      All screens were audited for real personal or customer data. The designs depict realistic enterprise scenarios using Covasant/CAMS mock data. Below is the full inventory for your review:
    </p>
    <table class="privacy-table">
      <thead>
        <tr>
          <th>Category</th>
          <th>Discovered Values in Figma Screens</th>
          <th>Screen Location</th>
          <th>Recommendation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Personal Names</strong></td>
          <td>“Priya Raman” (manager notified on leave request submission and withdrawal)</td>
          <td><code>10-permission-allow</code>, <code>11-permission-outcomes-destructive</code></td>
          <td>Sample name for persona flow. Can keep or blur if based on an actual employee.</td>
        </tr>
        <tr>
          <td><strong>Domain & System</strong></td>
          <td><code>agentregistry_cams.covasant.com</code>, “Agent Registry”, “CAMS”, “Instance 03”</td>
          <td>Browser chrome header on all full screens</td>
          <td>Covasant internal platform identity. Confirm if public portfolio display is permitted.</td>
        </tr>
        <tr>
          <td><strong>Request / Ticket IDs</strong></td>
          <td><code>LR-20418</code>, <code>LR-19877</code>, <code>RPT-2026-Q4-0071</code></td>
          <td>Permission cards, summary banners, and report download references</td>
          <td>Fictional structured ticket IDs. Safe for portfolio display.</td>
        </tr>
        <tr>
          <td><strong>Financial & HR Metrics</strong></td>
          <td>
            • Q4 PTO liability: $1,863,514.17 (1,240 employees)<br>
            • India: ₹4,86,32,150.00 (₹4.86 Cr) @ ₹84.00/$<br>
            • US: $1,284,560.00 ($1.28M)<br>
            • Revenue: $2,000K, 1200 actions, Quality: 85/100
          </td>
          <td><code>19-kpi</code>, <code>20-table-view</code>, <code>39-liability-summary</code></td>
          <td>Explicitly marked in Figma caption as <em>“sample for this preview / projected sample rate”</em>. Safe as portfolio demonstration data.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>Part 2: Annotated Screens (4 graphics × 2 themes = 8 images)</h2>
  <div class="grid">
    ${['annot-01-end-to-end', 'annot-02-permission', 'annot-03-plan-v2', 'annot-04-question'].flatMap(slug => [
      `
      <div class="card">
        <div class="card-preview">
          <img src="/work/a2ui/diagrams/${slug}.light.png" alt="${slug} light" loading="lazy">
        </div>
        <div class="card-meta">
          <div class="card-filename">${slug}.light.png</div>
          <div class="card-dims">${diagramsManifest[`${slug}.light.png`]?.width || 2400} × ${diagramsManifest[`${slug}.light.png`]?.height || 1350} px</div>
        </div>
      </div>
      `,
      `
      <div class="card">
        <div class="card-preview dark-preview">
          <img src="/work/a2ui/diagrams/${slug}.dark.png" alt="${slug} dark" loading="lazy">
        </div>
        <div class="card-meta">
          <div class="card-filename">${slug}.dark.png</div>
          <div class="card-dims">${diagramsManifest[`${slug}.dark.png`]?.width || 2400} × ${diagramsManifest[`${slug}.dark.png`]?.height || 1350} px</div>
        </div>
      </div>
      `
    ]).join('')}
  </div>

  <h2>Part 3: Diagrams (5 diagrams × 2 themes = 10 images)</h2>
  <div class="grid">
    ${['d01-a2ui-flow', 'd02-moments', 'd03-catalogue', 'd04-adaptation', 'd05-states'].flatMap(slug => [
      `
      <div class="card">
        <div class="card-preview">
          <img src="/work/a2ui/diagrams/${slug}.light.png" alt="${slug} light" loading="lazy">
        </div>
        <div class="card-meta">
          <div class="card-filename">${slug}.light.png</div>
          <div class="card-dims">${diagramsManifest[`${slug}.light.png`]?.width || 2400} × ${diagramsManifest[`${slug}.light.png`]?.height || 1350} px</div>
        </div>
      </div>
      `,
      `
      <div class="card">
        <div class="card-preview dark-preview">
          <img src="/work/a2ui/diagrams/${slug}.dark.png" alt="${slug} dark" loading="lazy">
        </div>
        <div class="card-meta">
          <div class="card-filename">${slug}.dark.png</div>
          <div class="card-dims">${diagramsManifest[`${slug}.dark.png`]?.width || 2400} × ${diagramsManifest[`${slug}.dark.png`]?.height || 1350} px</div>
        </div>
      </div>
      `
    ]).join('')}
  </div>

  <h2>Part 1: Exported Real Screens from Figma (39 WebP files at 2x)</h2>
  <div class="grid">
    ${Object.entries(screensManifest).map(([filename, meta]) => `
      <div class="card">
        <div class="card-preview">
          <img src="/work/a2ui/screens/figma/${filename}" alt="${filename}" loading="lazy">
        </div>
        <div class="card-meta">
          <div class="card-filename">${filename}</div>
          <div class="card-dims">${meta.width} × ${meta.height} px</div>
        </div>
      </div>
    `).join('')}
  </div>
</body>
</html>`;

fs.writeFileSync(path.resolve('public/work/a2ui/contact-sheet.html'), html);
console.log('Contact sheet written to public/work/a2ui/contact-sheet.html');
