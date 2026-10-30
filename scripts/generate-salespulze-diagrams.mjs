// Generates the SalesPulze and Sales AI diagrams (Prompt SP-4) as light and dark PNGs, 2400 px wide.
// Each diagram is an HTML page built from the site's grey diagram tokens, captured in headless Chrome
// with a transparent background and grayscale text anti-aliasing.
// Usage: node --experimental-websocket scripts/generate-salespulze-diagrams.mjs
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const TMP_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'sp-diagrams-'));
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

// Grey-only tokens, shared with the A2UI and Agent Registry diagrams.
const themeTokens = {
  light: {
    fg: '#0C0D12', fgMuted: '#53555B', fgQuiet: '#8B8D94',
    border: 'rgba(12, 13, 18, 0.12)', cardBg: '#FFFFFF', cardSubtleBg: '#F8F8F6',
    pillBg: '#F2F2EF', pillBorder: 'rgba(12, 13, 18, 0.1)',
    emphasisBg: '#EAEAE7', emphasisBorder: 'rgba(12, 13, 18, 0.25)',
    barBg: '#EDEDEA', barFill: '#B9BAB6', arrow: '#71737A',
  },
  dark: {
    fg: '#F6F5F3', fgMuted: '#96989F', fgQuiet: '#63656C',
    border: 'rgba(255, 255, 255, 0.14)', cardBg: '#15161A', cardSubtleBg: '#111215',
    pillBg: '#1E2026', pillBorder: 'rgba(255, 255, 255, 0.12)',
    emphasisBg: '#2A2C34', emphasisBorder: 'rgba(255, 255, 255, 0.3)',
    barBg: '#1E2026', barFill: '#55575E', arrow: '#8E9097',
  },
};

function page(theme, label, headline, css, body) {
  const t = themeTokens[theme];
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
    html, body { background: transparent; }
    body { width: 2400px; padding: 80px 100px; font-family: 'Geist', sans-serif; color: ${t.fg}; }
    .mono-label { font-family: 'Geist Mono', monospace; font-size: 24px; font-weight: 500; text-transform: uppercase;
      letter-spacing: 0.12em; color: ${t.fgMuted}; margin-bottom: 20px; display: flex; align-items: center; gap: 12px; }
    .mono-label::before { content: ''; width: 12px; height: 12px; border-radius: 50%; background: ${t.fgMuted}; }
    .headline { font-size: 52px; font-weight: 500; letter-spacing: -0.03em; line-height: 1.15; margin-bottom: 56px; }
    .card { background: ${t.cardBg}; border: 2px solid ${t.border}; border-radius: 24px; padding: 36px; }
    .pill { display: inline-flex; align-items: center; background: ${t.pillBg}; border: 1.5px solid ${t.pillBorder};
      border-radius: 9999px; padding: 12px 24px; font-size: 26px; font-weight: 500; line-height: 1.3; }
    .mono { font-family: 'Geist Mono', monospace; text-transform: uppercase; letter-spacing: 0.1em; font-size: 20px; color: ${t.fgMuted}; }
    .num { width: 48px; height: 48px; border-radius: 50%; background: ${t.emphasisBg}; border: 2px solid ${t.emphasisBorder};
      font-family: 'Geist Mono', monospace; font-size: 22px; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; }
    .arrow { color: ${t.arrow}; font-size: 40px; line-height: 1; display: flex; align-items: center; justify-content: center; }
    .muted { color: ${t.fgMuted}; }
    ${css(t)}
    .card.emph, .pill.emph { background: ${t.emphasisBg}; border-color: ${t.emphasisBorder}; }
  </style></head><body><div class="mono-label">${label}</div><div class="headline">${headline}</div>${body}</body></html>`;
}

const diagrams = [
  {
    dir: 'salespulze', name: 'd01-meeting-to-action',
    render: (theme) => {
      const steps = ['A meeting happens', 'AI reads the transcript', 'Signals and scores are produced',
        'Each level sees its view', 'An action item has an owner', 'The next meeting follows up'];
      return page(theme, 'SalesPulze · Diagram 01', 'From a meeting to an action',
        () => `.row { display: flex; align-items: stretch; gap: 0; } .step { flex: 1; min-height: 260px; display: flex; flex-direction: column; gap: 28px; }
          .step p { font-size: 30px; line-height: 1.3; font-weight: 500; } .row .arrow { width: 64px; flex: none; }`,
        `<div class="row">${steps.map((s, i) => `${i ? '<div class="arrow">→</div>' : ''}
          <div class="card step${i === 3 ? ' emph' : ''}"><span class="num">${i + 1}</span><p>${s}</p></div>`).join('')}</div>`);
    },
  },
  {
    dir: 'salespulze', name: 'd02-information-architecture',
    render: (theme) => {
      const groups = [
        ['Platform', ['Intel Hub', 'Meeting Repository', 'Action Center']],
        ['Administration', ['Admin Dashboard', 'Unassigned Meetings', 'Users and Roles', 'Scopes and Structure', 'Cost Insights', 'Business Segments']],
        ['Settings', ['System Configuration']],
        ['Info', ['Setup Requirements']],
      ];
      return page(theme, 'SalesPulze · Diagram 02', 'Four sidebar groups',
        () => `.cols { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; align-items: start; }
          .group { display: flex; flex-direction: column; gap: 20px; } .group h3 { font-size: 34px; font-weight: 500; letter-spacing: -0.02em; }
          .items { display: flex; flex-direction: column; gap: 14px; } .items .pill { width: 100%; justify-content: flex-start; border-radius: 16px; padding: 18px 24px; }`,
        `<div class="cols">${groups.map(([g, items], i) => `<div class="card group${i === 0 ? ' emph' : ''}">
          <span class="mono">Group ${i + 1}</span><h3>${g}</h3>
          <div class="items">${items.map((x) => `<span class="pill">${x}</span>`).join('')}</div></div>`).join('')}</div>`);
    },
  },
  {
    dir: 'salespulze', name: 'd03-hierarchy-dashboards',
    render: (theme) => {
      const levels = ['MD and President', 'AVP and Segment Manager', 'GM, Regional and Zonal Manager', 'Branch Manager', 'Field Sales Manager'];
      const inputs = ['Functional role', 'Node type', 'Hierarchy level'];
      const boards = ['National', 'Zonal', 'Area', 'Marketing', 'Finance', 'Admin'];
      return page(theme, 'SalesPulze · Diagram 03', 'The hierarchy decides the dashboard',
        () => `.wrap { display: grid; grid-template-columns: 820px 64px 1fr; gap: 32px; align-items: center; }
          .ladder { display: flex; flex-direction: column; gap: 14px; } .rung { display: flex; align-items: center; gap: 24px; padding: 26px 32px; }
          .rung span.t { font-size: 30px; font-weight: 500; } .flow { display: grid; grid-template-columns: 1fr 64px 1fr; gap: 24px; align-items: center; }
          .stack { display: flex; flex-direction: column; gap: 16px; } .stack .pill { justify-content: center; padding: 22px 24px; border-radius: 16px; font-size: 28px; }
          .boards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; } .boards .card { padding: 30px; font-size: 28px; font-weight: 500; text-align: center; }`,
        `<div class="wrap">
          <div class="ladder"><span class="mono" style="margin-bottom:8px">The hierarchy</span>
            ${levels.map((l, i) => `<div class="card rung" style="margin-left:${i * 40}px"><span class="num">${i + 1}</span><span class="t">${l}</span></div>`).join('')}</div>
          <div class="arrow">→</div>
          <div><div class="flow">
            <div class="stack"><span class="mono">Detected from</span>${inputs.map((x, i) => `<span class="pill${i === 2 ? ' emph' : ''}">${x}</span>`).join('')}</div>
            <div class="arrow">→</div>
            <div class="stack"><span class="mono">Dashboard shown</span><div class="boards">${boards.map((b) => `<div class="card">${b}</div>`).join('')}</div></div>
          </div></div></div>`);
    },
  },
  {
    dir: 'salespulze', name: 'd04-ai-trust',
    render: (theme) => page(theme, 'SalesPulze · Diagram 04', 'Three patterns carry every AI output',
      () => `.cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; align-items: stretch; }
        .col { display: flex; flex-direction: column; gap: 24px; } .col h3 { font-size: 38px; font-weight: 500; letter-spacing: -0.02em; }
        .list { display: flex; flex-direction: column; gap: 14px; } .list .pill { border-radius: 16px; padding: 20px 26px; font-size: 28px; }`,
      `<div class="cols">
        <div class="card col emph"><span class="mono">Pattern 1</span><h3>Confidence</h3><div class="list">
          <span class="pill">High: 90% and above</span><span class="pill">Medium: 70 to 89%</span><span class="pill">Low: below 70%</span></div></div>
        <div class="card col"><span class="mono">Pattern 2</span><h3>Evidence</h3><div class="list">
          <span class="pill">Linked to the moment in the transcript</span></div></div>
        <div class="card col"><span class="mono">Pattern 3</span><h3>Review</h3><div class="list">
          <span class="pill">Flag</span><span class="pill">Revert</span><span class="pill">Audit trail</span></div></div>
      </div>`),
  },
  {
    dir: 'salespulze', name: 'd05-score-model',
    render: (theme) => {
      const bars = [['Reach expansion', 25], ['Throughput and revenue recovery', 25], ['Action item quality', 20], ['Decisions made', 15], ['Sentiment and engagement', 15]];
      return page(theme, 'SalesPulze · Diagram 05', 'How the scores are built',
        (t) => `.grid { display: grid; grid-template-columns: 1fr 1.6fr 1fr; gap: 32px; align-items: stretch; }
          .col { display: flex; flex-direction: column; gap: 24px; } .col h3 { font-size: 38px; font-weight: 500; letter-spacing: -0.02em; }
          .formula { display: flex; flex-direction: column; gap: 14px; align-items: flex-start; } .op { font-family: 'Geist Mono', monospace; font-size: 30px; color: ${t.fgMuted}; padding-left: 24px; }
          .bars { display: flex; flex-direction: column; gap: 22px; } .bar { display: grid; grid-template-columns: 1fr 80px; gap: 6px 16px; align-items: center; }
          .bar .l { font-size: 26px; font-weight: 500; grid-column: 1 / 3; } .track { height: 28px; border-radius: 14px; background: ${t.barBg}; border: 1.5px solid ${t.border}; overflow: hidden; }
          .fill { height: 100%; background: ${t.barFill}; border-radius: 14px; } .w { font-family: 'Geist Mono', monospace; font-size: 26px; text-align: right; }`,
        `<div class="grid">
          <div class="card col"><span class="mono">Score 1</span><h3>Hygiene score</h3><div class="formula">
            <span class="pill">Attendance</span><span class="op">+</span><span class="pill">Duration</span><span class="op">+</span><span class="pill">Frequency</span></div></div>
          <div class="card col emph"><span class="mono">Score 2</span><h3>Capability score</h3><div class="bars">
            ${bars.map(([l, w]) => `<div class="bar"><span class="l">${l}</span><div class="track"><div class="fill" style="width:${w * 4}%"></div></div><span class="w">${w}%</span></div>`).join('')}</div></div>
          <div class="card col"><span class="mono">Score 3</span><h3>Meeting cost</h3><div class="formula">
            <span class="pill">Duration</span><span class="op">×</span><span class="pill">cost per minute (configurable)</span></div></div>
        </div>`);
    },
  },
  {
    dir: 'sales-ai', name: 'd01-four-tools-one-layer',
    render: (theme) => {
      const tools = [['Huddle.AI', 'Meeting intelligence'], ['Insights.AI', 'Sales thermometer'],
        ['MAP.AI', 'Market action planner, built by BCG'], ['Pitch.AI', 'Pitch agent, built by BCG']];
      return page(theme, 'Sales AI · Diagram 01', 'Four tools, one persona-based layer',
        () => `.tools, .arrows4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }
          .tool h3 { font-size: 36px; font-weight: 500; letter-spacing: -0.02em; margin-bottom: 12px; } .tool p { font-size: 26px; line-height: 1.35; }
          .arrows4 .arrow, .arrows2 .arrow { height: 96px; } .layer { text-align: center; padding: 44px; }
          .layer h3 { font-size: 40px; font-weight: 500; letter-spacing: -0.02em; margin-bottom: 10px; } .layer p { font-size: 28px; }
          .people, .arrows2 { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; width: 1200px; margin: 0 auto; }
          .person { text-align: center; font-size: 32px; font-weight: 500; padding: 34px; }`,
        `<div class="tools">${tools.map(([n, d]) => `<div class="card tool"><h3>${n}</h3><p class="muted">${d}</p></div>`).join('')}</div>
         <div class="arrows4">${tools.map(() => '<div class="arrow">↓</div>').join('')}</div>
         <div class="card layer emph"><h3>Persona-based layer</h3><p class="muted">One navigation, one design language</p></div>
         <div class="arrows2"><div class="arrow">↓</div><div class="arrow">↓</div></div>
         <div class="people"><div class="card person">Area Sales Manager</div><div class="card person">Other roles</div></div>`);
    },
  },
];

// Annotated screens: the Figma export on the left at 68% width, notes on the right, numbered badges on the
// elements and thin grey elbow leader lines. Badge positions are in the export's own pixels (2400 wide).
function annotated({ name, screen, label, headline, notes }) {
  return {
    dir: 'salespulze', name,
    render: (theme) => {
      const t = themeTokens[theme];
      const src = path.resolve(`public/work/salespulze/screens/figma/${screen}.webp`);
      const [srcW, srcH] = screen === '01-intel-hub' ? [2400, 3228] : [2400, 2175];
      const frameW = 1496, k = frameW / srcW, frameH = Math.round(srcH * k);
      const notesX = frameW + 120, gutterX = frameW + 40;
      let nextY = 0;
      const placed = notes.map((n) => {
        const bx = Math.round(n.x * k), by = Math.round(n.y * k);
        const ny = Math.max(by, nextY);
        nextY = ny + 150;
        return { ...n, bx, by, ny };
      });
      const lines = placed.map((n) => `<polyline points="${n.bx + 26},${n.by} ${gutterX},${n.by} ${notesX - 24},${n.ny}" fill="none" stroke="${t.arrow}" stroke-width="2"/>`).join('');
      return page(theme, label, headline,
        () => `.stage { position: relative; height: ${Math.max(frameH, nextY)}px; }
          .frame { position: absolute; left: 0; top: 0; width: ${frameW}px; height: ${frameH}px; border: 2px solid ${t.border}; border-radius: 12px; overflow: hidden; }
          .frame img { width: 100%; display: block; } svg { position: absolute; inset: 0; overflow: visible; }
          .badge { position: absolute; transform: translate(-50%, -50%); width: 52px; height: 52px; border-radius: 50%; background: ${t.emphasisBg};
            border: 2px solid ${t.emphasisBorder}; color: ${t.fg}; font-family: 'Geist Mono', monospace; font-size: 24px; font-weight: 600;
            display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 4px ${theme === 'dark' ? 'rgba(12,13,18,0.85)' : 'rgba(255,255,255,0.9)'}; }
          .note { position: absolute; left: ${notesX}px; width: ${2200 - notesX}px; display: flex; gap: 20px; transform: translateY(-26px); }
          .note p { font-size: 28px; line-height: 1.35; font-weight: 500; padding-top: 8px; }`,
        `<div class="stage"><div class="frame"><img src="file://${src}"></div>
          <svg width="2200" height="${Math.max(frameH, nextY)}">${lines}</svg>
          ${placed.map((n) => `<div class="badge" style="left:${n.bx}px;top:${n.by}px">${n.num}</div>
            <div class="note" style="top:${n.ny}px"><span class="num">${n.num}</span><p>${n.text}</p></div>`).join('')}</div>`);
    },
  };
}

diagrams.push(
  annotated({
    name: 'annot-01-intel-hub', screen: '01-intel-hub', label: 'SalesPulze · Annotated screen', headline: 'Intel Hub',
    notes: [
      { num: 1, x: 927, y: 686, text: 'Key numbers: meetings ahead, open tasks, hygiene and capability' },
      { num: 2, x: 1760, y: 612, text: 'AI executive insights, with a confidence label' },
      { num: 4, x: 1560, y: 1218, text: 'Scope and level selectors: the hierarchy decides the view' },
      { num: 3, x: 1000, y: 933, text: 'Field operations health: one cell per entity, coloured by status, with a legend' },
      { num: 5, x: 1290, y: 1742, text: 'Performance over time, and product discussion coverage' },
    ].sort((a, b) => a.num - b.num),
  }),
  annotated({
    name: 'annot-02-meeting-series', screen: '02-meeting-series', label: 'SalesPulze · Annotated screen', headline: 'Meeting series',
    notes: [
      { num: 1, x: 1325, y: 200, text: '“AI inferred” and “High confidence” badges' },
      { num: 2, x: 2392, y: 252, text: 'Flag this series: a person can challenge the AI' },
      { num: 3, x: 905, y: 466, text: 'Execution health over time' },
      { num: 4, x: 1150, y: 1250, text: 'Positive and negative drivers: the score explains itself' },
      { num: 5, x: 2340, y: 1490, text: 'Calendar, and a prep pack with a focus note for the next meeting' },
    ],
  }),
);

// Minimal DevTools-protocol client: measure each page's height, then capture it with a transparent background.
const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=9335', '--disable-lcd-text',
  '--force-device-scale-factor=1', `--user-data-dir=${path.join(TMP_DIR, 'profile')}`, 'about:blank'], { stdio: 'ignore' });
let tabs;
for (let i = 0; i < 40 && !tabs; i++) {
  await new Promise((r) => setTimeout(r, 500));
  try { tabs = await (await fetch('http://127.0.0.1:9335/json')).json(); } catch {}
}
const ws = new WebSocket(tabs.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = {};
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (pending[m.id]) { pending[m.id](m.result); delete pending[m.id]; } };
const send = (method, params = {}) => new Promise((r) => { pending[++id] = r; ws.send(JSON.stringify({ id, method, params })); });

await send('Emulation.setDefaultBackgroundColorOverride', { color: { r: 0, g: 0, b: 0, a: 0 } });
const manifests = {};
for (const d of diagrams) {
  const outDir = path.resolve(`public/work/${d.dir}/diagrams`);
  fs.mkdirSync(outDir, { recursive: true });
  manifests[outDir] ??= fs.existsSync(path.join(outDir, 'manifest.json')) ? JSON.parse(fs.readFileSync(path.join(outDir, 'manifest.json'), 'utf8')) : {};
  for (const theme of ['light', 'dark']) {
    const htmlPath = path.join(TMP_DIR, `${d.name}.${theme}.html`);
    fs.writeFileSync(htmlPath, d.render(theme));
    await send('Emulation.setDeviceMetricsOverride', { width: 2400, height: 1000, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: `file://${htmlPath}` });
    await new Promise((r) => setTimeout(r, 1500));
    const h = (await send('Runtime.evaluate', { expression: 'document.fonts.ready.then(() => document.body.scrollHeight)', awaitPromise: true, returnByValue: true })).result.value;
    await send('Emulation.setDeviceMetricsOverride', { width: 2400, height: h, deviceScaleFactor: 1, mobile: false });
    await new Promise((r) => setTimeout(r, 300));
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    const file = `${d.name}.${theme}.png`;
    fs.writeFileSync(path.join(outDir, file), Buffer.from(shot.data, 'base64'));
    manifests[outDir][file] = { width: 2400, height: h };
    console.log(`${d.dir}/${file} 2400x${h}`);
  }
}
for (const [dir, m] of Object.entries(manifests)) {
  fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify(Object.fromEntries(Object.entries(m).sort()), null, 2) + '\n');
}
chrome.kill();
process.exit(0);
