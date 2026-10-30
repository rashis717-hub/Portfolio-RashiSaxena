import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const OUT_DIR = path.resolve('public/work/a2ui/diagrams');
const TMP_DIR = path.resolve('/tmp/a2ui-diagrams-build');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}
if (!fs.existsSync(TMP_DIR)) {
  fs.mkdirSync(TMP_DIR, { recursive: true });
}

// Design Tokens for Diagrams (grey-only, no pink)
const themeTokens = {
  light: {
    fg: '#0C0D12',
    fgMuted: '#53555B',
    fgQuiet: '#8B8D94',
    border: 'rgba(12, 13, 18, 0.12)',
    borderSubtle: 'rgba(12, 13, 18, 0.06)',
    cardBg: '#FFFFFF',
    cardSubtleBg: '#F8F8F6',
    pillBg: '#F2F2EF',
    pillBorder: 'rgba(12, 13, 18, 0.1)',
    pillText: '#0C0D12',
    emphasisBg: '#EAEAE7',
    emphasisBorder: 'rgba(12, 13, 18, 0.25)',
    emphasisText: '#0C0D12',
    badgeBg: '#E4E4E0',
    badgeText: '#2D2E32',
    laneBg: 'rgba(255, 255, 255, 0.65)',
    arrowColor: '#71737A',
    arrowHead: '#3B3C40',
  },
  dark: {
    fg: '#F6F5F3',
    fgMuted: '#96989F',
    fgQuiet: '#63656C',
    border: 'rgba(255, 255, 255, 0.14)',
    borderSubtle: 'rgba(255, 255, 255, 0.07)',
    cardBg: '#15161A',
    cardSubtleBg: '#111215',
    pillBg: '#1E2026',
    pillBorder: 'rgba(255, 255, 255, 0.12)',
    pillText: '#F6F5F3',
    emphasisBg: '#2A2C34',
    emphasisBorder: 'rgba(255, 255, 255, 0.3)',
    emphasisText: '#FFFFFF',
    badgeBg: '#262830',
    badgeText: '#D2D3D8',
    laneBg: 'rgba(21, 22, 26, 0.65)',
    arrowColor: '#8E9097',
    arrowHead: '#D2D3D8',
  }
};

function getCommonStyles(theme) {
  const t = themeTokens[theme];
  return `
    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    body {
      background: transparent;
      font-family: 'Geist', -apple-system, BlinkMacSystemFont, sans-serif;
      color: ${t.fg};
      width: 2400px;
      margin: 0;
      padding: 80px 100px;
    }

    .mono-label {
      font-family: 'Geist Mono', monospace;
      font-size: 24px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: ${t.fgMuted};
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .mono-label::before {
      content: '';
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: ${t.fgMuted};
    }

    .headline {
      font-size: 52px;
      font-weight: 500;
      letter-spacing: -0.03em;
      line-height: 1.15;
      color: ${t.fg};
      margin-bottom: 56px;
    }

    .card {
      background: ${t.cardBg};
      border: 2px solid ${t.border};
      border-radius: 24px;
      padding: 36px;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: ${t.pillBg};
      border: 1.5px solid ${t.pillBorder};
      color: ${t.pillText};
      border-radius: 9999px;
      padding: 12px 24px;
      font-size: 24px;
      font-weight: 500;
      line-height: 1.3;
    }

    .pill-emphasis {
      background: ${t.emphasisBg};
      border-color: ${t.emphasisBorder};
      color: ${t.emphasisText};
    }

    .badge-validated {
      font-family: 'Geist Mono', monospace;
      font-size: 18px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      background: ${t.badgeBg};
      color: ${t.badgeText};
      border: 1.5px solid ${t.border};
      border-radius: 9999px;
      padding: 6px 16px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .badge-validated::before {
      content: '✓';
      font-weight: 600;
      font-size: 16px;
    }

    .step-num {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: ${t.emphasisBg};
      border: 2px solid ${t.emphasisBorder};
      color: ${t.fg};
      font-family: 'Geist Mono', monospace;
      font-size: 22px;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
  `;
}

// 1. d01-a2ui-flow: Swimlane with Person, Agent, Client + catalogue box at bottom
function renderD01(theme) {
  const t = themeTokens[theme];
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${getCommonStyles(theme)}
    
    .swimlane-container {
      display: flex;
      flex-direction: column;
      gap: 32px;
      width: 100%;
    }

    .lanes-grid {
      display: grid;
      grid-template-columns: 260px 1fr;
      gap: 24px;
      align-items: stretch;
    }

    .lane-label-col {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .lane-label-card {
      background: ${t.cardSubtleBg};
      border: 2px solid ${t.border};
      border-radius: 20px;
      padding: 32px 28px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 200px;
    }

    .lane-tag {
      font-family: 'Geist Mono', monospace;
      font-size: 20px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: ${t.fgMuted};
      margin-bottom: 8px;
    }

    .lane-title {
      font-size: 32px;
      font-weight: 500;
      color: ${t.fg};
    }

    .lanes-content-col {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .lane-row {
      background: ${t.laneBg};
      border: 2px solid ${t.border};
      border-radius: 20px;
      height: 200px;
      padding: 24px 36px;
      display: flex;
      align-items: center;
      position: relative;
    }

    .flow-steps-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 20px;
      width: 100%;
      height: 100%;
      align-items: center;
    }

    .step-box {
      background: ${t.cardBg};
      border: 2px solid ${t.border};
      border-radius: 16px;
      padding: 20px 22px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.03);
    }

    .step-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .step-text {
      font-size: 22px;
      line-height: 1.35;
      font-weight: 400;
      color: ${t.fg};
    }

    .catalogue-shared-box {
      background: ${t.cardSubtleBg};
      border: 2px dashed ${t.border};
      border-radius: 24px;
      padding: 36px 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 32px;
      margin-top: 12px;
    }

    .catalogue-info {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-width: 500px;
    }

    .catalogue-heading {
      font-size: 28px;
      font-weight: 500;
      color: ${t.fg};
    }

    .catalogue-desc {
      font-size: 22px;
      color: ${t.fgMuted};
    }

    .catalogue-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      flex: 1;
      justify-content: flex-end;
    }

    .arrow-indicator {
      display: inline-flex;
      align-items: center;
      color: ${t.arrowColor};
      font-family: 'Geist Mono', monospace;
      font-size: 18px;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="mono-label">DIAGRAM 01 / PROTOCOL FLOW</div>
  <h1 class="headline">How an agent sends an interface</h1>

  <div class="swimlane-container">
    <!-- Main 3-Lane Diagram -->
    <div style="display: grid; grid-template-columns: 280px repeat(6, 1fr); gap: 24px; align-items: stretch;">
      <!-- Lane Row 1: PERSON -->
      <div class="lane-label-card" style="height: auto; min-height: 180px;">
        <div class="lane-tag">Lane 1</div>
        <div class="lane-title">Person</div>
      </div>
      <!-- Step 1 in Person -->
      <div class="step-box" style="grid-column: 2 / span 1;">
        <div class="step-header">
          <div class="step-num">1</div>
          <span class="arrow-indicator">Sends ➔</span>
        </div>
        <div class="step-text">Sends a message</div>
      </div>
      <!-- Empty space in Person for steps 2-4 -->
      <div style="grid-column: 3 / span 3; display: flex; align-items: center; justify-content: center; border-bottom: 1.5px dashed ${t.borderSubtle};">
        <span style="font-family: 'Geist Mono', monospace; font-size: 18px; color: ${t.fgQuiet}; letter-spacing: 0.05em;">Awaiting response…</span>
      </div>
      <!-- Step 5 in Person -->
      <div class="step-box" style="grid-column: 6 / span 1;">
        <div class="step-header">
          <div class="step-num">5</div>
          <span class="arrow-indicator">Action ➔</span>
        </div>
        <div class="step-text">Interacts; the action is sent back to the agent</div>
      </div>
      <div style="grid-column: 7 / span 1; border-bottom: 1.5px dashed ${t.borderSubtle};"></div>

      <!-- Lane Row 2: AGENT -->
      <div class="lane-label-card" style="height: auto; min-height: 220px;">
        <div class="lane-tag">Lane 2</div>
        <div class="lane-title">Agent</div>
      </div>
      <div style="grid-column: 2 / span 1; display: flex; align-items: center; justify-content: center;">
        <svg width="60" height="60" viewBox="0 0 60 60"><path d="M30 10 L30 50 M20 40 L30 50 L40 40" stroke="${t.arrowColor}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <!-- Step 2 in Agent -->
      <div class="step-box" style="grid-column: 3 / span 1;">
        <div class="step-header">
          <div class="step-num">2</div>
          <span class="badge-validated">Validated</span>
        </div>
        <div class="step-text">Generates A2UI messages describing the interface (structure and data)</div>
      </div>
      <!-- Step 3 in Agent to Client -->
      <div class="step-box" style="grid-column: 4 / span 1;">
        <div class="step-header">
          <div class="step-num">3</div>
          <span class="arrow-indicator">Stream ➔</span>
        </div>
        <div class="step-text">Messages stream to the client</div>
      </div>
      <div style="grid-column: 5 / span 1; display: flex; align-items: center; justify-content: center; border-bottom: 1.5px dashed ${t.borderSubtle};">
        <svg width="60" height="60" viewBox="0 0 60 60"><path d="M50 30 L10 30 M20 20 L10 30 L20 40" stroke="${t.arrowColor}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <!-- Step 6 in Agent -->
      <div class="step-box" style="grid-column: 6 / span 2; border-color: ${t.emphasisBorder}; background: ${t.cardSubtleBg};">
        <div class="step-header">
          <div class="step-num">6</div>
          <span class="arrow-indicator" style="color: ${t.fg}; font-weight: 600;">↺ Loops back to 4</span>
        </div>
        <div class="step-text"><strong>Responds with updated A2UI messages</strong>, streaming new components back to the client</div>
      </div>

      <!-- Lane Row 3: CLIENT -->
      <div class="lane-label-card" style="height: auto; min-height: 200px;">
        <div class="lane-tag">Lane 3</div>
        <div class="lane-title">Client</div>
      </div>
      <div style="grid-column: 2 / span 3; border-top: 1.5px dashed ${t.borderSubtle};"></div>
      <!-- Step 4 in Client -->
      <div class="step-box" style="grid-column: 5 / span 1; border-color: ${t.emphasisBorder};">
        <div class="step-header">
          <div class="step-num">4</div>
          <span class="badge-validated">Validated</span>
        </div>
        <div class="step-text">Validates and renders with its own components, from the catalogue</div>
      </div>
      <div style="grid-column: 6 / span 1; display: flex; align-items: center; justify-content: center;">
        <svg width="60" height="60" viewBox="0 0 60 60"><path d="M30 50 L30 10 M20 20 L30 10 L40 20" stroke="${t.arrowColor}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div style="grid-column: 7 / span 1; border-top: 1.5px dashed ${t.borderSubtle};"></div>
    </div>

    <!-- Bottom Shared Box: Catalogue -->
    <div class="catalogue-shared-box">
      <div class="catalogue-info">
        <div class="catalogue-heading">Catalogue: components the agent is allowed to use</div>
        <div class="catalogue-desc">Pre-approved schema defining structure, data binding, allowed actions, and safe fallbacks.</div>
      </div>
      <div class="catalogue-pills">
        <div class="pill pill-emphasis">Question</div>
        <div class="pill">Decisions</div>
        <div class="pill">Plan</div>
        <div class="pill pill-emphasis">Permission</div>
        <div class="pill">Form</div>
        <div class="pill">KPI Cards</div>
        <div class="pill">Data Table</div>
        <div class="pill">Charts</div>
        <div class="pill">Loading Orb</div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// 2. d02-moments: 3-column table
function renderD02(theme) {
  const t = themeTokens[theme];
  const rows = [
    { moment: "Missing detail", bad: "A question buried in a paragraph", comp: "Question" },
    { moment: "Judgement calls", bad: "Assumptions made silently", comp: "Decisions" },
    { moment: "Proposed work", bad: "A plan described in sentences", comp: "Plan" },
    { moment: "Taking an action", bad: "Permission in one sentence", comp: "Permission", highlight: true },
    { moment: "Structured input", bad: "Slow back and forth", comp: "Form" },
    { moment: "Results", bad: "Walls of text, pasted tables", comp: "KPI, Table, Charts" },
    { moment: "Working", bad: "Silence", comp: "Loading and thinking, Execution summary" },
    { moment: "Problems and empties", bad: "Raw errors", comp: "Error, Success, Info, Empty state" }
  ];

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${getCommonStyles(theme)}

    .table-container {
      width: 100%;
      border: 2px solid ${t.border};
      border-radius: 24px;
      overflow: hidden;
      background: ${t.cardBg};
    }

    .table-header {
      display: grid;
      grid-template-columns: 460px 1fr 640px;
      background: ${t.cardSubtleBg};
      border-bottom: 2px solid ${t.border};
      padding: 28px 48px;
      font-family: 'Geist Mono', monospace;
      font-size: 20px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: ${t.fgMuted};
    }

    .table-row {
      display: grid;
      grid-template-columns: 460px 1fr 640px;
      padding: 30px 48px;
      align-items: center;
      border-bottom: 1.5px solid ${t.borderSubtle};
      transition: background 0.15s ease;
    }

    .table-row:last-child {
      border-bottom: none;
    }

    .table-row.row-emphasis {
      background: ${t.cardSubtleBg};
    }

    .col-moment {
      font-size: 28px;
      font-weight: 500;
      color: ${t.fg};
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .col-moment-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: ${t.fgMuted};
    }

    .col-bad {
      font-size: 24px;
      line-height: 1.4;
      color: ${t.fgMuted};
      padding-right: 40px;
    }

    .col-comp {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
    }
  </style>
</head>
<body>
  <div class="mono-label">DIAGRAM 02 / CONVERSATION MOMENTS</div>
  <h1 class="headline">Where text fails in an agent conversation</h1>

  <div class="table-container">
    <div class="table-header">
      <div>Moment</div>
      <div>What goes wrong with text</div>
      <div>Component</div>
    </div>
    ${rows.map(r => `
      <div class="table-row ${r.highlight ? 'row-emphasis' : ''}">
        <div class="col-moment">
          <span class="col-moment-dot"></span>
          <span>${r.moment}</span>
        </div>
        <div class="col-bad">${r.bad}</div>
        <div class="col-comp">
          ${r.comp.split(', ').map((c, i) => `
            <span class="pill ${r.highlight && i === 0 ? 'pill-emphasis' : ''}">${c}</span>
          `).join('')}
        </div>
      </div>
    `).join('')}
  </div>
</body>
</html>`;
}

// 3. d03-catalogue: 6 columns of components
function renderD03(theme) {
  const t = themeTokens[theme];
  const families = [
    { name: "Ask", items: ["Question", "Form", "Text input"], highlight: "Question" },
    { name: "Decide", items: ["Decisions", "Permission"], highlight: "Permission" },
    { name: "Plan and run", items: ["Plan", "Execution summary", "Loading and thinking"], highlight: "Plan" },
    { name: "Show", items: ["KPI", "Table", "Charts", "List", "Code snippet"], highlight: "KPI" },
    { name: "Status", items: ["Error", "Success", "Info", "Empty state"], highlight: null },
    { name: "Navigate", items: ["Menu", "Agent shell"], highlight: null },
  ];

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${getCommonStyles(theme)}

    .catalogue-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 24px;
      width: 100%;
      margin-bottom: 48px;
    }

    .family-card {
      background: ${t.cardBg};
      border: 2px solid ${t.border};
      border-radius: 24px;
      padding: 36px 28px;
      display: flex;
      flex-direction: column;
      gap: 24px;
      min-height: 480px;
    }

    .family-header {
      border-bottom: 1.5px solid ${t.borderSubtle};
      padding-bottom: 20px;
    }

    .family-tag {
      font-family: 'Geist Mono', monospace;
      font-size: 18px;
      font-weight: 500;
      color: ${t.fgMuted};
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 8px;
    }

    .family-title {
      font-size: 32px;
      font-weight: 500;
      color: ${t.fg};
      letter-spacing: -0.02em;
    }

    .family-items {
      display: flex;
      flex-direction: column;
      gap: 14px;
      flex: 1;
    }

    .catalogue-pill {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: ${t.pillBg};
      border: 1.5px solid ${t.pillBorder};
      color: ${t.pillText};
      border-radius: 9999px;
      padding: 14px 22px;
      font-size: 22px;
      font-weight: 500;
      line-height: 1.25;
    }

    .catalogue-pill.active {
      background: ${t.emphasisBg};
      border-color: ${t.emphasisBorder};
      color: ${t.emphasisText};
    }

    .footer-note {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px 36px;
      background: ${t.cardSubtleBg};
      border: 2px solid ${t.border};
      border-radius: 20px;
    }

    .footer-left {
      font-family: 'Geist Mono', monospace;
      font-size: 22px;
      font-weight: 500;
      color: ${t.fg};
      letter-spacing: 0.05em;
    }

    .footer-right {
      font-size: 22px;
      color: ${t.fgMuted};
    }
  </style>
</head>
<body>
  <div class="mono-label">DIAGRAM 03 / COMPONENT FAMILIES</div>
  <h1 class="headline">The catalogue: six families</h1>

  <div class="catalogue-grid">
    ${families.map((f, i) => `
      <div class="family-card">
        <div class="family-header">
          <div class="family-tag">0${i + 1} / Family</div>
          <div class="family-title">${f.name}</div>
        </div>
        <div class="family-items">
          ${f.items.map(item => `
            <div class="catalogue-pill ${item === f.highlight ? 'active' : ''}">
              <span>${item}</span>
              ${item === f.highlight ? '<span style="font-size:16px;">●</span>' : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `).join('')}
  </div>

  <div class="footer-note">
    <div class="footer-left">60+ frames designed</div>
    <div class="footer-right">Two design phases covering initial loads, interactive steps, and terminal states</div>
  </div>
</body>
</html>`;
}

// 4. d04-adaptation: 2 columns "Inside CAMS (custom catalogue)" vs "From outside (basic primitives)"
function renderD04(theme) {
  const t = themeTokens[theme];
  const rows = [
    {
      comp: "Question",
      cams: "Step card with progress chips, options and descriptions",
      outside: "Plain text with numbered choices"
    },
    {
      comp: "Permission",
      cams: "Card with what, system, who is affected, reversible, and a confirm button",
      outside: "Text summary with two basic buttons",
      highlight: true
    },
    {
      comp: "Plan",
      cams: "Plan card with steps, time, data sources, Begin, Modify, Don't start",
      outside: "Numbered list in text"
    },
    {
      comp: "KPI",
      cams: "KPI tiles with change versus last period",
      outside: "One line of text per metric"
    },
    {
      comp: "Table",
      cams: "Data table with badges and a top-N label",
      outside: "Simple table"
    }
  ];

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${getCommonStyles(theme)}

    .grid-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin-bottom: 40px;
    }

    .columns-header {
      display: grid;
      grid-template-columns: 320px 1fr 1fr;
      gap: 24px;
      padding: 0 12px;
    }

    .col-head-title {
      font-family: 'Geist Mono', monospace;
      font-size: 20px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: ${t.fgMuted};
    }

    .adaptation-row {
      display: grid;
      grid-template-columns: 320px 1fr 1fr;
      gap: 24px;
      align-items: stretch;
    }

    .comp-pill-box {
      display: flex;
      align-items: center;
      padding: 24px 32px;
      background: ${t.cardSubtleBg};
      border: 2px solid ${t.border};
      border-radius: 20px;
    }

    .comp-name {
      font-size: 28px;
      font-weight: 500;
      color: ${t.fg};
    }

    .surface-card {
      background: ${t.cardBg};
      border: 2px solid ${t.border};
      border-radius: 20px;
      padding: 28px 36px;
      display: flex;
      align-items: center;
      font-size: 24px;
      line-height: 1.45;
      color: ${t.fg};
    }

    .surface-card.outside {
      background: ${t.cardSubtleBg};
      color: ${t.fgMuted};
      border-style: dashed;
    }

    .surface-card.highlight {
      border-color: ${t.emphasisBorder};
      background: ${t.emphasisBg};
      color: ${t.emphasisText};
    }

    .footer-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 32px;
      border-top: 1.5px solid ${t.border};
    }

    .footer-note-text {
      font-family: 'Geist Mono', monospace;
      font-size: 20px;
      color: ${t.fgMuted};
    }
  </style>
</head>
<body>
  <div class="mono-label">DIAGRAM 04 / SURFACE ADAPTATION</div>
  <h1 class="headline">The same message, rendered for two surfaces</h1>

  <div class="grid-container">
    <div class="columns-header">
      <div class="col-head-title">Component</div>
      <div class="col-head-title">Inside CAMS (custom catalogue)</div>
      <div class="col-head-title">From outside (basic primitives)</div>
    </div>

    ${rows.map(r => `
      <div class="adaptation-row">
        <div class="comp-pill-box">
          <div class="comp-name">${r.comp}</div>
        </div>
        <div class="surface-card ${r.highlight ? 'highlight' : ''}">
          ${r.cams}
        </div>
        <div class="surface-card outside">
          ${r.outside}
        </div>
      </div>
    `).join('')}
  </div>

  <div class="footer-bar">
    <div class="footer-note-text">Illustrative</div>
    <div class="footer-note-text">The agent's payload schema stays identical; the client adapts the presentation.</div>
  </div>
</body>
</html>`;
}

// 5. d05-states: 2 rows of lifecycle nodes
function renderD05(theme) {
  const t = themeTokens[theme];

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${getCommonStyles(theme)}

    .states-container {
      display: flex;
      flex-direction: column;
      gap: 40px;
      width: 100%;
    }

    .lifecycle-row-card {
      background: ${t.cardBg};
      border: 2px solid ${t.border};
      border-radius: 24px;
      padding: 44px 52px;
      display: flex;
      flex-direction: column;
      gap: 36px;
    }

    .row-title-area {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1.5px solid ${t.borderSubtle};
      padding-bottom: 24px;
    }

    .row-title {
      font-size: 34px;
      font-weight: 500;
      color: ${t.fg};
      letter-spacing: -0.02em;
    }

    .row-type-badge {
      font-family: 'Geist Mono', monospace;
      font-size: 20px;
      color: ${t.fgMuted};
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .nodes-flow {
      display: flex;
      align-items: center;
      gap: 32px;
      flex-wrap: wrap;
    }

    .state-node {
      border: 2px solid ${t.border};
      border-radius: 20px;
      padding: 24px 32px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      min-width: 280px;
      background: ${t.cardBg};
    }

    .state-node.active-state {
      border-color: ${t.emphasisBorder};
      background: ${t.cardSubtleBg};
    }

    .state-node.terminal-state {
      background: ${t.cardSubtleBg};
      border-style: dashed;
      opacity: 0.82;
    }

    .state-node-badge {
      font-family: 'Geist Mono', monospace;
      font-size: 18px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: ${t.fgMuted};
    }

    .state-node-title {
      font-size: 28px;
      font-weight: 500;
      color: ${t.fg};
    }

    .state-node-desc {
      font-size: 20px;
      line-height: 1.4;
      color: ${t.fgMuted};
    }

    .arrow-divider {
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${t.arrowColor};
    }

    .terminal-legend {
      display: flex;
      align-items: center;
      gap: 14px;
      font-family: 'Geist Mono', monospace;
      font-size: 20px;
      color: ${t.fgMuted};
      margin-top: 12px;
    }

    .terminal-legend::before {
      content: '';
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px dashed ${t.border};
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="mono-label">DIAGRAM 05 / COMPONENT LIFECYCLE</div>
  <h1 class="headline">Every component knows its states</h1>

  <div class="states-container">
    <!-- Row 1: Question -->
    <div class="lifecycle-row-card">
      <div class="row-title-area">
        <div class="row-title">Question Component</div>
        <div class="row-type-badge">Input & Answer Flow</div>
      </div>
      <div class="nodes-flow">
        <div class="state-node active-state">
          <div class="state-node-badge">Initial State</div>
          <div class="state-node-title">Active</div>
          <div class="state-node-desc">Interactive inputs, options, and progress chips displayed</div>
        </div>

        <div class="arrow-divider">
          <svg width="48" height="24" viewBox="0 0 48 24"><path d="M0 12 L40 12 M30 4 L40 12 L30 20" stroke="${t.arrowColor}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>

        <div class="state-node terminal-state" style="flex: 1; max-width: 600px;">
          <div class="state-node-badge">Terminal State (Quieter)</div>
          <div class="state-node-title">Answered</div>
          <div class="state-node-desc">Collapses to a single summary line: “Answered 2 questions”, marked “Used by the agent”</div>
        </div>
      </div>
    </div>

    <!-- Row 2: Permission -->
    <div class="lifecycle-row-card">
      <div class="row-title-area">
        <div class="row-title">Permission Component</div>
        <div class="row-type-badge">Decision & Consequence Flow</div>
      </div>
      <div class="nodes-flow" style="align-items: flex-start;">
        <div class="state-node active-state" style="margin-top: 50px;">
          <div class="state-node-badge">Initial State</div>
          <div class="state-node-title">Pending</div>
          <div class="state-node-desc">Awaits user choice. Consequence outcomes and risk table visible.</div>
        </div>

        <div class="arrow-divider" style="margin-top: 100px;">
          <svg width="48" height="24" viewBox="0 0 48 24"><path d="M0 12 L40 12 M30 4 L40 12 L30 20" stroke="${t.arrowColor}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>

        <!-- 3 branches -->
        <div style="display: flex; flex-direction: column; gap: 20px; flex: 1;">
          <div style="display: flex; align-items: center; gap: 24px;">
            <div class="state-node terminal-state" style="flex: 1;">
              <div class="state-node-badge">Terminal</div>
              <div class="state-node-title">Allowed</div>
              <div class="state-node-desc">Action confirmed and executed by agent; recorded in audit log.</div>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 24px;">
            <div class="state-node terminal-state" style="flex: 1;">
              <div class="state-node-badge">Terminal</div>
              <div class="state-node-title">Denied</div>
              <div class="state-node-desc">Action blocked by user; agent plans alternative or asks for clarification.</div>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 24px;">
            <div class="state-node active-state" style="flex: 1; border-color: ${t.border};">
              <div class="state-node-badge">Transient</div>
              <div class="state-node-title">Superseded</div>
              <div class="state-node-desc">Conversation moved on before decision was made; stale request dimmed.</div>
            </div>

            <div class="arrow-divider">
              <svg width="48" height="24" viewBox="0 0 48 24"><path d="M0 12 L40 12 M30 4 L40 12 L30 20" stroke="${t.arrowColor}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>

            <div class="state-node terminal-state" style="flex: 1;">
              <div class="state-node-badge">Resumed</div>
              <div class="state-node-title">Re-asked</div>
              <div class="state-node-desc">Fresh confirmation card appears when the topic matters again.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="terminal-legend">
    Terminal states are visually quieter: dashed hairline borders and subdued background.
  </div>
</body>
</html>`;
}

const diagrams = [
  { id: 'd01-a2ui-flow', render: renderD01, height: 1350 },
  { id: 'd02-moments', render: renderD02, height: 1450 },
  { id: 'd03-catalogue', render: renderD03, height: 1100 },
  { id: 'd04-adaptation', render: renderD04, height: 1380 },
  { id: 'd05-states', render: renderD05, height: 1680 },
];

const manifest = {};

console.log('Generating A2UI Diagram HTML files and rendering transparent PNGs at 2400px width...');

for (const d of diagrams) {
  for (const theme of ['light', 'dark']) {
    const filename = `${d.id}.${theme}.png`;
    const htmlFilename = `${d.id}.${theme}.html`;
    const htmlPath = path.join(TMP_DIR, htmlFilename);
    const outPngPath = path.join(OUT_DIR, filename);

    const htmlContent = d.render(theme);
    fs.writeFileSync(htmlPath, htmlContent);

    console.log(`Rendering ${filename} (${d.height}px window height)...`);

    // Use Chrome headless with transparent background
    const cmd = `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --default-background-color=00000000 --screenshot="${outPngPath}" --window-size=2400,${d.height} file://${htmlPath}`;
    execSync(cmd, { stdio: 'pipe' });

    // Inspect actual dimensions with sips
    const sipsOut = execSync(`sips -g pixelWidth -g pixelHeight "${outPngPath}"`, { encoding: 'utf8' });
    const widthMatch = sipsOut.match(/pixelWidth:\s*(\d+)/);
    const heightMatch = sipsOut.match(/pixelHeight:\s*(\d+)/);
    const width = widthMatch ? parseInt(widthMatch[1], 10) : 2400;
    const height = heightMatch ? parseInt(heightMatch[1], 10) : d.height;

    manifest[filename] = { width, height };
    console.log(`✓ ${filename}: ${width}x${height}`);
  }
}

const manifestPath = path.join(OUT_DIR, 'manifest.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`Manifest written to ${manifestPath}`);
