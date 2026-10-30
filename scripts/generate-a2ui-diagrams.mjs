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

// 1. d01-a2ui-flow: Sequence diagram (Correction C11-A)
function renderD01(theme) {
  const t = themeTokens[theme];
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    ${getCommonStyles(theme)}
    
    .seq-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .seq-diagram-card {
      background: ${t.cardBg};
      border: 2px solid ${t.border};
      border-radius: 28px;
      padding: 60px 80px 48px;
      position: relative;
    }

    .lifelines-header {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 80px;
      margin-bottom: 24px;
      text-align: center;
    }

    .lifeline-pill {
      background: ${t.pillBg};
      border: 2px solid ${t.border};
      border-radius: 9999px;
      padding: 16px 32px;
      font-family: 'Geist Mono', monospace;
      font-size: 24px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: ${t.fg};
      display: inline-block;
      width: fit-content;
      margin: 0 auto;
    }

    .svg-canvas {
      width: 100%;
      height: 1060px;
      display: block;
    }
  </style>
</head>
<body>
  <div class="seq-container">
    <div class="mono-label">A2UI Protocol · Sequence Flow</div>
    <div class="headline">How an agent describes an interface, and the client renders it safely</div>

    <div class="seq-diagram-card">
      <div class="lifelines-header">
        <div><div class="lifeline-pill">Person</div></div>
        <div><div class="lifeline-pill">Client (the app)</div></div>
        <div><div class="lifeline-pill">Agent</div></div>
      </div>

      <svg class="svg-canvas" viewBox="0 0 2040 1060">
        <defs>
          <marker id="arrow-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="${t.fg}" />
          </marker>
          <marker id="arrow-l" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M 10 1.5 L 2 5 L 10 8.5 z" fill="${t.fg}" />
          </marker>
          <marker id="arrow-u" viewBox="0 0 10 10" refX="5" refY="2" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M 1.5 10 L 5 2 L 8.5 10 z" fill="${t.fgMuted}" />
          </marker>
        </defs>

        <!-- Vertical Lifelines -->
        <line x1="340" y1="0" x2="340" y2="920" stroke="${t.border}" stroke-width="2" stroke-dasharray="8 8" />
        <line x1="1020" y1="0" x2="1020" y2="920" stroke="${t.border}" stroke-width="2" stroke-dasharray="8 8" />
        <line x1="1700" y1="0" x2="1700" y2="920" stroke="${t.border}" stroke-width="2" stroke-dasharray="8 8" />

        <!-- Step 1: Person -> Client -->
        <g>
          <circle cx="340" cy="70" r="18" fill="${t.fg}" />
          <text x="340" y="77" fill="${theme === 'dark' ? '#15161A' : '#FFFFFF'}" font-family="'Geist Mono', monospace" font-size="16" font-weight="700" text-anchor="middle">1</text>
          <text x="680" y="56" fill="${t.fg}" font-family="'Geist', sans-serif" font-size="22" font-weight="500" text-anchor="middle">Sends a message</text>
          <line x1="362" y1="70" x2="1020" y2="70" stroke="${t.fg}" stroke-width="3" marker-end="url(#arrow-r)" />
        </g>

        <!-- Step 2: Client -> Agent -->
        <g>
          <circle cx="1020" cy="160" r="18" fill="${t.fg}" />
          <text x="1020" y="167" fill="${theme === 'dark' ? '#15161A' : '#FFFFFF'}" font-family="'Geist Mono', monospace" font-size="16" font-weight="700" text-anchor="middle">2</text>
          <text x="1360" y="146" fill="${t.fg}" font-family="'Geist', sans-serif" font-size="22" font-weight="500" text-anchor="middle">Forwards the message</text>
          <line x1="1042" y1="160" x2="1700" y2="160" stroke="${t.fg}" stroke-width="3" marker-end="url(#arrow-r)" />
        </g>

        <!-- Step 3: Agent -> Client -->
        <g>
          <circle cx="1700" cy="250" r="18" fill="${t.fg}" />
          <text x="1700" y="257" fill="${theme === 'dark' ? '#15161A' : '#FFFFFF'}" font-family="'Geist Mono', monospace" font-size="16" font-weight="700" text-anchor="middle">3</text>
          <text x="1360" y="236" fill="${t.fg}" font-family="'Geist', sans-serif" font-size="22" font-weight="500" text-anchor="middle">Streams A2UI messages: structure and data</text>
          <line x1="1678" y1="250" x2="1020" y2="250" stroke="${t.fg}" stroke-width="3" marker-end="url(#arrow-l)" />
          <g transform="translate(1040, 235)">
            <rect width="130" height="30" rx="15" fill="${t.badgeBg}" stroke="${t.border}" stroke-width="1.5" />
            <text x="65" y="21" fill="${t.badgeText}" font-family="'Geist Mono', monospace" font-size="14" font-weight="600" text-anchor="middle">✓ Validated</text>
          </g>
        </g>

        <!-- Step 4: Client to itself -->
        <g transform="translate(680, 315)">
          <rect width="680" height="70" rx="16" fill="${t.cardSubtleBg}" stroke="${t.fg}" stroke-width="2.5" />
          <circle cx="40" cy="35" r="18" fill="${t.fg}" />
          <text x="40" y="42" fill="${theme === 'dark' ? '#15161A' : '#FFFFFF'}" font-family="'Geist Mono', monospace" font-size="16" font-weight="700" text-anchor="middle">4</text>
          <text x="75" y="42" fill="${t.fg}" font-family="'Geist', sans-serif" font-size="20" font-weight="500">Validates, then renders with its own components, from the catalogue</text>
          <g transform="translate(525, 20)">
            <rect width="130" height="30" rx="15" fill="${t.badgeBg}" stroke="${t.border}" stroke-width="1.5" />
            <text x="65" y="21" fill="${t.badgeText}" font-family="'Geist Mono', monospace" font-size="14" font-weight="600" text-anchor="middle">✓ Validated</text>
          </g>
        </g>

        <!-- Step 5: Client -> Person -->
        <g>
          <circle cx="1020" cy="450" r="18" fill="${t.fg}" />
          <text x="1020" y="457" fill="${theme === 'dark' ? '#15161A' : '#FFFFFF'}" font-family="'Geist Mono', monospace" font-size="16" font-weight="700" text-anchor="middle">5</text>
          <text x="680" y="436" fill="${t.fg}" font-family="'Geist', sans-serif" font-size="22" font-weight="500" text-anchor="middle">Shows the interface</text>
          <line x1="998" y1="450" x2="340" y2="450" stroke="${t.fg}" stroke-width="3" marker-end="url(#arrow-l)" />
        </g>

        <!-- Step 6: Person -> Client -->
        <g>
          <circle cx="340" cy="540" r="18" fill="${t.fg}" />
          <text x="340" y="547" fill="${theme === 'dark' ? '#15161A' : '#FFFFFF'}" font-family="'Geist Mono', monospace" font-size="16" font-weight="700" text-anchor="middle">6</text>
          <text x="680" y="526" fill="${t.fg}" font-family="'Geist', sans-serif" font-size="22" font-weight="500" text-anchor="middle">Interacts: answers, chooses, approves</text>
          <line x1="362" y1="540" x2="1020" y2="540" stroke="${t.fg}" stroke-width="3" marker-end="url(#arrow-r)" />
        </g>

        <!-- Step 7: Client -> Agent -->
        <g>
          <circle cx="1020" cy="630" r="18" fill="${t.fg}" />
          <text x="1020" y="637" fill="${theme === 'dark' ? '#15161A' : '#FFFFFF'}" font-family="'Geist Mono', monospace" font-size="16" font-weight="700" text-anchor="middle">7</text>
          <text x="1360" y="616" fill="${t.fg}" font-family="'Geist', sans-serif" font-size="22" font-weight="500" text-anchor="middle">Sends the action back</text>
          <line x1="1042" y1="630" x2="1700" y2="630" stroke="${t.fg}" stroke-width="3" marker-end="url(#arrow-r)" />
        </g>

        <!-- Step 8: Agent -> Client -->
        <g>
          <circle cx="1700" cy="720" r="18" fill="${t.fg}" />
          <text x="1700" y="727" fill="${theme === 'dark' ? '#15161A' : '#FFFFFF'}" font-family="'Geist Mono', monospace" font-size="16" font-weight="700" text-anchor="middle">8</text>
          <text x="1360" y="706" fill="${t.fg}" font-family="'Geist', sans-serif" font-size="22" font-weight="500" text-anchor="middle">Responds with updated A2UI messages</text>
          <line x1="1678" y1="720" x2="1020" y2="720" stroke="${t.fg}" stroke-width="3" marker-end="url(#arrow-l)" />
        </g>

        <!-- Loopback arrow -->
        <path d="M 1010 720 C 850 720, 850 430, 960 395" fill="none" stroke="${t.fgMuted}" stroke-width="2.5" stroke-dasharray="6 6" marker-end="url(#arrow-u)" />
        <text x="810" y="550" fill="${t.fgMuted}" font-family="'Geist Mono', monospace" font-size="18" font-weight="500" text-anchor="middle" transform="rotate(-90, 810, 550)">Repeat from step 4</text>

        <!-- Catalogue Band spanning Client and Agent -->
        <g transform="translate(800, 820)">
          <rect width="1120" height="200" rx="20" fill="${t.cardSubtleBg}" stroke="${t.border}" stroke-width="2" stroke-dasharray="8 8" />
          <text x="560" y="45" fill="${t.fg}" font-family="'Geist', sans-serif" font-size="24" font-weight="600" text-anchor="middle">Catalogue: the components the agent is allowed to use</text>
          <text x="560" y="78" fill="${t.fgMuted}" font-family="'Geist', sans-serif" font-size="18" text-anchor="middle">Pre-approved schema defining structure, data binding, allowed actions and safe fallbacks</text>
          
          <!-- Chips -->
          <g transform="translate(50, 110)">
            <rect x="0" y="0" width="100" height="44" rx="22" fill="${t.pillBg}" stroke="${t.border}" stroke-width="1.5" />
            <text x="50" y="28" fill="${t.fg}" font-family="'Geist Mono', monospace" font-size="16" font-weight="500" text-anchor="middle">Question</text>

            <rect x="115" y="0" width="105" height="44" rx="22" fill="${t.pillBg}" stroke="${t.border}" stroke-width="1.5" />
            <text x="167" y="28" fill="${t.fg}" font-family="'Geist Mono', monospace" font-size="16" font-weight="500" text-anchor="middle">Decisions</text>

            <rect x="235" y="0" width="75" height="44" rx="22" fill="${t.pillBg}" stroke="${t.border}" stroke-width="1.5" />
            <text x="272" y="28" fill="${t.fg}" font-family="'Geist Mono', monospace" font-size="16" font-weight="500" text-anchor="middle">Plan</text>

            <rect x="325" y="0" width="115" height="44" rx="22" fill="${t.pillBg}" stroke="${t.border}" stroke-width="1.5" />
            <text x="382" y="28" fill="${t.fg}" font-family="'Geist Mono', monospace" font-size="16" font-weight="500" text-anchor="middle">Permission</text>

            <rect x="455" y="0" width="80" height="44" rx="22" fill="${t.pillBg}" stroke="${t.border}" stroke-width="1.5" />
            <text x="495" y="28" fill="${t.fg}" font-family="'Geist Mono', monospace" font-size="16" font-weight="500" text-anchor="middle">Form</text>

            <rect x="550" y="0" width="110" height="44" rx="22" fill="${t.pillBg}" stroke="${t.border}" stroke-width="1.5" />
            <text x="605" y="28" fill="${t.fg}" font-family="'Geist Mono', monospace" font-size="16" font-weight="500" text-anchor="middle">KPI Cards</text>

            <rect x="675" y="0" width="115" height="44" rx="22" fill="${t.pillBg}" stroke="${t.border}" stroke-width="1.5" />
            <text x="732" y="28" fill="${t.fg}" font-family="'Geist Mono', monospace" font-size="16" font-weight="500" text-anchor="middle">Data Table</text>

            <rect x="805" y="0" width="90" height="44" rx="22" fill="${t.pillBg}" stroke="${t.border}" stroke-width="1.5" />
            <text x="850" y="28" fill="${t.fg}" font-family="'Geist Mono', monospace" font-size="16" font-weight="500" text-anchor="middle">Charts</text>

            <rect x="910" y="0" width="115" height="44" rx="22" fill="${t.pillBg}" stroke="${t.border}" stroke-width="1.5" />
            <text x="967" y="28" fill="${t.fg}" font-family="'Geist Mono', monospace" font-size="16" font-weight="500" text-anchor="middle">Loading Orb</text>
          </g>
        </g>
      </svg>
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
