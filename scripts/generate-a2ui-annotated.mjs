import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const OUT_DIR = path.resolve('public/work/a2ui/diagrams');
const RAW_DIR = path.resolve('/tmp/a2ui-figma-raw-png');
const TMP_DIR = path.resolve('/tmp/a2ui-annot-build');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });

const annotations = [
  {
    slug: 'annot-01-end-to-end',
    rawImage: '01-end-to-end-flow.png',
    originalWidth: 1440,
    originalHeight: 1613,
    renderHeight: 2000,
    frameWidth: 1560,
    title: 'End-to-End Conversation Flow',
    notes: [
      {
        num: 1,
        text: 'Answered questions collapse to one line: “Answered 2 questions”, marked “Used by the agent”',
        relY: 345,
        badgeX: 1240,
      },
      {
        num: 2,
        text: 'Decisions: the agent’s judgement calls, pre-selected, with “1 changed by you”',
        relY: 455,
        badgeX: 1240,
      },
      {
        num: 3,
        text: 'Plan completed, 6 of 6, with an execution summary',
        relY: 565,
        badgeX: 1240,
      },
      {
        num: 4,
        text: 'Permission asked first, before the email is sent',
        relY: 840,
        badgeX: 1240,
      },
      {
        num: 5,
        text: 'Results as KPI cards and a table, not text',
        relY: 1040,
        badgeX: 1240,
      },
    ]
  },
  {
    slug: 'annot-02-permission',
    rawImage: '11-permission-outcomes-destructive.png',
    originalWidth: 1440,
    originalHeight: 1028,
    renderHeight: 1350,
    frameWidth: 1560,
    title: 'Permission & Destructive Actions',
    notes: [
      {
        num: 1,
        text: 'The consequence is stated in one line: “This cancels an approved leave. It can’t be undone.”',
        relY: 625,
        badgeX: 1240,
      },
      {
        num: 2,
        text: 'What, System, Who’s affected, Reversible: the four things a person needs to decide',
        relY: 715,
        badgeX: 1240,
      },
      {
        num: 3,
        text: 'Cancel first, and the destructive action in red',
        relY: 825,
        badgeX: 1240,
      },
    ]
  },
  {
    slug: 'annot-03-plan-v2',
    rawImage: '09-plan-modify-v2.png',
    originalWidth: 1440,
    originalHeight: 1028,
    renderHeight: 1350,
    frameWidth: 1560,
    title: 'Plan Modification & Versioning',
    notes: [
      {
        num: 1,
        text: 'Version badge: v2 replaces v1, and the banner says why',
        relY: 410,
        badgeX: 1240,
      },
      {
        num: 2,
        text: 'Changed steps are flagged, with the new value shown',
        relY: 575,
        badgeX: 1240,
      },
      {
        num: 3,
        text: 'Data sources are named',
        relY: 845,
        badgeX: 1240,
      },
      {
        num: 4,
        text: 'Begin, Modify plan, Don’t start',
        relY: 905,
        badgeX: 1240,
      },
    ]
  },
  {
    slug: 'annot-04-question',
    rawImage: '03-question-multiselect-other.png',
    originalWidth: 1440,
    originalHeight: 1028,
    renderHeight: 1350,
    frameWidth: 1560,
    title: 'Structured Multi-Select Question',
    notes: [
      {
        num: 1,
        text: 'Progress chips show where you are in the questions',
        relY: 380,
        badgeX: 1240,
      },
      {
        num: 2,
        text: 'Options carry a short description',
        relY: 510,
        badgeX: 1240,
      },
      {
        num: 3,
        text: 'Other opens a text field',
        relY: 780,
        badgeX: 1240,
      },
      {
        num: 4,
        text: 'Skip all, Back and Next',
        relY: 880,
        badgeX: 1240,
      },
    ]
  }
];

function generateAnnotatedHtml(item, theme) {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#F6F5F3' : '#0C0D12';
  const textMuted = isDark ? '#96989F' : '#53555B';
  const border = isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(12, 13, 18, 0.14)';
  const badgeBg = isDark ? '#262830' : '#EAEAE7';
  const badgeBorder = isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(12, 13, 18, 0.25)';
  const leaderLineColor = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(12, 13, 18, 0.25)';
  const noteCardBg = isDark ? '#15161A' : '#FFFFFF';

  const frameScale = item.frameWidth / item.originalWidth;
  const frameHeight = Math.round(item.originalHeight * frameScale);
  const rawPath = path.join(RAW_DIR, item.rawImage);

  // Layout positions
  const startX = 60;
  const startY = 80;
  const notesColLeft = startX + item.frameWidth + 90;
  const notesColWidth = 630;

  // Compute scaled note Ys
  const noteItems = item.notes.map((n, i) => {
    const scaledBadgeY = Math.round(startY + n.relY * frameScale);
    const scaledBadgeX = Math.round(startX + (n.badgeX || 1200) * frameScale);
    
    // Distribute note cards vertically evenly or aligned with elements
    const minCardSpacing = 160;
    const cardY = Math.max(startY + i * minCardSpacing, scaledBadgeY - 40);

    return {
      ...n,
      scaledBadgeX,
      scaledBadgeY,
      cardY,
    };
  });

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
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
      width: 2400px;
      height: ${item.renderHeight}px;
      position: relative;
      overflow: hidden;
    }

    .frame-container {
      position: absolute;
      left: ${startX}px;
      top: ${startY}px;
      width: ${item.frameWidth}px;
      height: ${frameHeight}px;
      border-radius: 20px;
      border: 2px solid ${border};
      overflow: hidden;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
      background: #FFFFFF;
    }

    .frame-img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }

    .notes-column {
      position: absolute;
      left: ${notesColLeft}px;
      top: ${startY}px;
      width: ${notesColWidth}px;
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .note-card {
      background: ${noteCardBg};
      border: 2px solid ${border};
      border-radius: 20px;
      padding: 24px 28px;
      display: flex;
      gap: 20px;
      align-items: flex-start;
      box-shadow: 0 4px 20px rgba(0,0,0,0.03);
    }

    .badge {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: ${badgeBg};
      border: 2px solid ${badgeBorder};
      color: ${textColor};
      font-family: 'Geist Mono', monospace;
      font-size: 22px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .badge-on-frame {
      position: absolute;
      transform: translate(-50%, -50%);
      z-index: 10;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .note-text {
      font-size: 23px;
      line-height: 1.45;
      color: ${textColor};
      font-weight: 450;
      padding-top: 4px;
    }

    svg.overlay {
      position: absolute;
      left: 0;
      top: 0;
      width: 2400px;
      height: ${item.renderHeight}px;
      pointer-events: none;
      z-index: 5;
    }
  </style>
</head>
<body>
  <!-- Frame Image -->
  <div class="frame-container">
    <img class="frame-img" src="file://${rawPath}" />
  </div>

  <!-- SVG Leader Lines -->
  <svg class="overlay">
    ${noteItems.map((n, i) => {
      const startPointX = n.scaledBadgeX;
      const startPointY = n.scaledBadgeY;
      const targetCardX = notesColLeft;
      // Connect to the vertical middle of the badge inside the note card
      const targetCardY = startY + i * (140) + 46;

      // Draw curved leader line
      const cp1X = startPointX + 100;
      const cp1Y = startPointY;
      const cp2X = targetCardX - 80;
      const cp2Y = targetCardY;

      return `
        <circle cx="${startPointX}" cy="${startPointY}" r="5" fill="${textColor}" />
        <path d="M ${startPointX} ${startPointY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${targetCardX} ${targetCardY}" 
              stroke="${leaderLineColor}" stroke-width="2.5" stroke-dasharray="6 4" fill="none" />
      `;
    }).join('')}
  </svg>

  <!-- Badges on Frame -->
  ${noteItems.map(n => `
    <div class="badge badge-on-frame" style="left: ${n.scaledBadgeX}px; top: ${n.scaledBadgeY}px;">
      ${n.num}
    </div>
  `).join('')}

  <!-- Notes Column on the Right -->
  <div class="notes-column">
    ${noteItems.map(n => `
      <div class="note-card">
        <div class="badge">${n.num}</div>
        <div class="note-text">${n.text}</div>
      </div>
    `).join('')}
  </div>
</body>
</html>`;
}

console.log('Rendering annotated screen images (light and dark)...');

for (const item of annotations) {
  for (const theme of ['light', 'dark']) {
    const filename = `${item.slug}.${theme}.png`;
    const htmlFilename = `${item.slug}.${theme}.html`;
    const htmlPath = path.join(TMP_DIR, htmlFilename);
    const outPngPath = path.join(OUT_DIR, filename);

    const htmlContent = generateAnnotatedHtml(item, theme);
    fs.writeFileSync(htmlPath, htmlContent);

    console.log(`Rendering ${filename} (${item.renderHeight}px height)...`);

    const cmd = `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --default-background-color=00000000 --screenshot="${outPngPath}" --window-size=2400,${item.renderHeight} file://${htmlPath}`;
    execSync(cmd, { stdio: 'pipe' });

    const sipsOut = execSync(`sips -g pixelWidth -g pixelHeight "${outPngPath}"`, { encoding: 'utf8' });
    const widthMatch = sipsOut.match(/pixelWidth:\s*(\d+)/);
    const heightMatch = sipsOut.match(/pixelHeight:\s*(\d+)/);
    const width = widthMatch ? parseInt(widthMatch[1], 10) : 2400;
    const height = heightMatch ? parseInt(heightMatch[1], 10) : item.renderHeight;

    console.log(`  ✓ ${filename}: ${width}x${height}`);
  }
}

// Update diagrams manifest.json
const manifestPath = path.join(OUT_DIR, 'manifest.json');
let manifest = {};
if (fs.existsSync(manifestPath)) {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
}

for (const item of annotations) {
  for (const theme of ['light', 'dark']) {
    const filename = `${item.slug}.${theme}.png`;
    const outPngPath = path.join(OUT_DIR, filename);
    const sipsOut = execSync(`sips -g pixelWidth -g pixelHeight "${outPngPath}"`, { encoding: 'utf8' });
    const widthMatch = sipsOut.match(/pixelWidth:\s*(\d+)/);
    const heightMatch = sipsOut.match(/pixelHeight:\s*(\d+)/);
    manifest[filename] = {
      width: widthMatch ? parseInt(widthMatch[1], 10) : 2400,
      height: heightMatch ? parseInt(heightMatch[1], 10) : item.renderHeight,
    };
  }
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`Updated manifest with annotated screens: ${manifestPath}`);
