import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const OUT_DIR = path.resolve('public/work/agent-registry/diagrams');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Quiet Precision palette (monochromatic grey only, light & dark)
const PALETTES = {
  light: {
    bg: 'transparent',
    surface: '#FFFFFF',
    surfaceSubtle: '#F9FAFB',
    border: '#E5E7EB',
    borderStrong: '#D1D5DB',
    textPrimary: '#111827',
    textSecondary: '#4B5563',
    textMuted: '#9CA3AF',
    nodeBg: '#FFFFFF',
    connector: '#9CA3AF',
    badgeBg: '#F3F4F6',
    badgeText: '#374151',
  },
  dark: {
    bg: 'transparent',
    surface: '#18181B',
    surfaceSubtle: '#27272A',
    border: '#27272A',
    borderStrong: '#3F3F46',
    textPrimary: '#F9FAFB',
    textSecondary: '#A1A1AA',
    textMuted: '#71717A',
    nodeBg: '#18181B',
    connector: '#52525B',
    badgeBg: '#27272A',
    badgeText: '#E4E4E7',
  }
};

const WIDTH = 2400;
const HEIGHT = 1350;

function createSvgWrapper(content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <style>
      .font-sans { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
      .font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; }
    </style>
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#9CA3AF" />
    </marker>
    <marker id="arrow-dark" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#52525B" />
    </marker>
  </defs>
  ${content}
</svg>`;
}

// Diagram 1: Single-Pod Multi-Tenant Runtime & Secret Separation
function renderDiagram1(theme) {
  const p = PALETTES[theme];
  const arrowId = theme === 'dark' ? 'arrow-dark' : 'arrow';

  return `
    <!-- Canvas container -->
    <rect x="80" y="80" width="2240" height="1190" rx="16" fill="${p.surfaceSubtle}" stroke="${p.border}" stroke-width="2"/>
    
    <!-- Title block -->
    <text x="140" y="160" class="font-sans" font-size="28" font-weight="700" fill="${p.textPrimary}">Architecture: Single-Pod Multi-Tenant Runtime &amp; Configuration Decoupling</text>
    <text x="140" y="195" class="font-sans" font-size="18" fill="${p.textSecondary}">Frontline agent instances share one pod; behavioral config is injected via ConfigMaps while secrets sync automatically to GCP Secret Manager.</text>

    <!-- Column 1: Registry Portal / UI Inputs -->
    <rect x="140" y="260" width="580" height="920" rx="12" fill="${p.surface}" stroke="${p.borderStrong}" stroke-width="2"/>
    <text x="180" y="320" class="font-sans" font-size="22" font-weight="600" fill="${p.textPrimary}">1. Agent Registry Platform</text>
    <text x="180" y="350" class="font-sans" font-size="16" fill="${p.textMuted}">Single source of truth (Draft / Active)</text>

    <!-- Sub-box A: agent_config -->
    <rect x="180" y="390" width="500" height="310" rx="8" fill="${p.surfaceSubtle}" stroke="${p.border}" stroke-width="1.5"/>
    <rect x="200" y="415" width="160" height="30" rx="6" fill="${p.badgeBg}"/>
    <text x="215" y="436" class="font-mono" font-size="14" font-weight="600" fill="${p.badgeText}">agent_config</text>
    <text x="200" y="480" class="font-sans" font-size="18" font-weight="600" fill="${p.textPrimary}">Behavioral Runtime Schema</text>
    <text x="200" y="515" class="font-sans" font-size="15" fill="${p.textSecondary}">• Prompts, persona templates, routing rules</text>
    <text x="200" y="545" class="font-sans" font-size="15" fill="${p.textSecondary}">• Per-tenant skill &amp; override definitions</text>
    <text x="200" y="575" class="font-sans" font-size="15" fill="${p.textSecondary}">• Stored in Registry DB as immutable Config Records</text>
    <text x="200" y="605" class="font-sans" font-size="15" fill="${p.textSecondary}">• Stamped into Helm ConfigMaps: cm-{tenant}-{agent}</text>

    <!-- Sub-box B: env_config -->
    <rect x="180" y="730" width="500" height="390" rx="8" fill="${p.surfaceSubtle}" stroke="${p.border}" stroke-width="1.5"/>
    <rect x="200" y="755" width="150" height="30" rx="6" fill="${p.badgeBg}"/>
    <text x="215" y="776" class="font-mono" font-size="14" font-weight="600" fill="${p.badgeText}">env_config</text>
    <text x="200" y="820" class="font-sans" font-size="18" font-weight="600" fill="${p.textPrimary}">Contextual Secrets &amp; Credentials</text>
    <text x="200" y="855" class="font-sans" font-size="15" fill="${p.textSecondary}">• API keys, backend endpoints, DB connection credentials</text>
    <text x="200" y="885" class="font-sans" font-size="15" fill="${p.textSecondary}">• Portal never stores secret values in database</text>
    <text x="200" y="915" class="font-sans" font-size="15" fill="${p.textSecondary}">• Secret reconciled directly to GCP Secret Manager</text>
    <text x="200" y="945" class="font-sans" font-size="15" fill="${p.textSecondary}">• Secret name: sm-{env}-{tenant}-{agent}-{ver}-{hash8}</text>
    <text x="200" y="975" class="font-sans" font-size="15" fill="${p.textSecondary}">• Mounted via ExternalSecret / Kubernetes Secret</text>

    <!-- Connectors Column 1 -> 2 -->
    <path d="M 720 545 L 940 545" stroke="${p.connector}" stroke-width="2" stroke-dasharray="6,6" marker-end="url(#${arrowId})"/>
    <path d="M 720 925 L 940 925" stroke="${p.connector}" stroke-width="2" stroke-dasharray="6,6" marker-end="url(#${arrowId})"/>

    <!-- Column 2: Reconciliation & Storage -->
    <rect x="940" y="260" width="520" height="920" rx="12" fill="${p.surface}" stroke="${p.borderStrong}" stroke-width="2"/>
    <text x="980" y="320" class="font-sans" font-size="22" font-weight="600" fill="${p.textPrimary}">2. GitOps &amp; Cloud Reconciliation</text>
    <text x="980" y="350" class="font-sans" font-size="16" fill="${p.textMuted}">JenkinsX &amp; GCP Controller</text>

    <!-- Box: GitOps Manifest Repo -->
    <rect x="980" y="390" width="440" height="310" rx="8" fill="${p.surfaceSubtle}" stroke="${p.border}" stroke-width="1.5"/>
    <text x="1000" y="440" class="font-sans" font-size="18" font-weight="600" fill="${p.textPrimary}">GitOps Manifest Repository</text>
    <text x="1000" y="475" class="font-sans" font-size="15" fill="${p.textSecondary}">• Helmfile releases rendered per environment</text>
    <text x="1000" y="505" class="font-sans" font-size="15" fill="${p.textSecondary}">• Gotmpl values: values_gotmpl_path</text>
    <text x="1000" y="535" class="font-sans" font-size="15" fill="${p.textSecondary}">• Base env: auto_merge=true into cluster</text>
    <text x="1000" y="565" class="font-sans" font-size="15" fill="${p.textSecondary}">• Promoted env: PR raised &amp; manual merge</text>

    <!-- Box: GCP Secret Manager -->
    <rect x="980" y="730" width="440" height="390" rx="8" fill="${p.surfaceSubtle}" stroke="${p.border}" stroke-width="1.5"/>
    <text x="1000" y="780" class="font-sans" font-size="18" font-weight="600" fill="${p.textPrimary}">GCP Secret Manager (GSM)</text>
    <text x="1000" y="815" class="font-sans" font-size="15" fill="${p.textSecondary}">• IAM-gated zero-trust secrets store</text>
    <text x="1000" y="845" class="font-sans" font-size="15" fill="${p.textSecondary}">• Accessible only by jx-boot-job-role</text>
    <text x="1000" y="875" class="font-sans" font-size="15" fill="${p.textSecondary}">• Volume-mounted JSON format to pod</text>
    <text x="1000" y="905" class="font-sans" font-size="15" fill="${p.textSecondary}">• No SDK runtime dependencies inside agent</text>

    <!-- Connectors Column 2 -> 3 -->
    <path d="M 1460 545 L 1680 545" stroke="${p.connector}" stroke-width="2" marker-end="url(#${arrowId})"/>
    <path d="M 1460 925 L 1680 925" stroke="${p.connector}" stroke-width="2" marker-end="url(#${arrowId})"/>

    <!-- Column 3: Kubernetes Runtime Cluster -->
    <rect x="1680" y="260" width="580" height="920" rx="12" fill="${p.surface}" stroke="${p.borderStrong}" stroke-width="2"/>
    <text x="1720" y="320" class="font-sans" font-size="22" font-weight="600" fill="${p.textPrimary}">3. Kubernetes Cluster (GKE)</text>
    <text x="1720" y="350" class="font-sans" font-size="16" fill="${p.textMuted}">Single Pod, Multi-Tenant Isolation</text>

    <!-- Pod container -->
    <rect x="1720" y="390" width="500" height="730" rx="10" fill="${p.surfaceSubtle}" stroke="${p.borderStrong}" stroke-width="2" stroke-dasharray="4,4"/>
    <text x="1750" y="435" class="font-sans" font-size="18" font-weight="700" fill="${p.textPrimary}">Agent Workload Pod (Shared)</text>
    
    <!-- Tenant Request Context -->
    <rect x="1750" y="470" width="440" height="150" rx="8" fill="${p.surface}" stroke="${p.border}" stroke-width="1.5"/>
    <text x="1770" y="505" class="font-sans" font-size="16" font-weight="600" fill="${p.textPrimary}">API Gateway Ingress &amp; Tenant Context</text>
    <text x="1770" y="535" class="font-sans" font-size="14" fill="${p.textSecondary}">• Request arrives with Tenant-ID header</text>
    <text x="1770" y="560" class="font-sans" font-size="14" fill="${p.textSecondary}">• Multi-Agent Orchestrator (MAO) routes request</text>
    <text x="1770" y="585" class="font-sans" font-size="14" fill="${p.textSecondary}">• A2A protocol dynamically invokes target agent</text>

    <!-- Volume Mounted Config -->
    <rect x="1750" y="650" width="440" height="200" rx="8" fill="${p.surface}" stroke="${p.border}" stroke-width="1.5"/>
    <text x="1770" y="685" class="font-sans" font-size="16" font-weight="600" fill="${p.textPrimary}">Volume-Mounted Configuration</text>
    <text x="1770" y="715" class="font-mono" font-size="13" fill="${p.badgeText}">/config/agent_config.json</text>
    <text x="1770" y="740" class="font-sans" font-size="14" fill="${p.textSecondary}">Resolved per-tenant at request time</text>
    <text x="1770" y="775" class="font-mono" font-size="13" fill="${p.badgeText}">/config/env_config.json</text>
    <text x="1770" y="800" class="font-sans" font-size="14" fill="${p.textSecondary}">Mounted secret credentials from GSM</text>

    <!-- Running Agents Box -->
    <rect x="1750" y="880" width="440" height="210" rx="8" fill="${p.surface}" stroke="${p.border}" stroke-width="1.5"/>
    <text x="1770" y="915" class="font-sans" font-size="16" font-weight="600" fill="${p.textPrimary}">Co-Tenant Execution Context</text>
    <text x="1770" y="945" class="font-sans" font-size="14" fill="${p.textSecondary}">• Tenant A (Acme Retail) $\rightarrow$ Version 1.0.0</text>
    <text x="1770" y="975" class="font-sans" font-size="14" fill="${p.textSecondary}">• Tenant B (Riverford) $\rightarrow$ Version 1.1.0</text>
    <text x="1770" y="1005" class="font-sans" font-size="14" fill="${p.textSecondary}">• Single pod serves all tenants with clean isolation</text>
    <text x="1770" y="1035" class="font-sans" font-size="14" fill="${p.textSecondary}">• Health checks: /health/live and /health/ready</text>
  `;
}

// Diagram 2: Three-Gate Relay Promotion Lifecycle
function renderDiagram2(theme) {
  const p = PALETTES[theme];
  const arrowId = theme === 'dark' ? 'arrow-dark' : 'arrow';

  return `
    <rect x="80" y="80" width="2240" height="1190" rx="16" fill="${p.surfaceSubtle}" stroke="${p.border}" stroke-width="2"/>
    
    <text x="140" y="160" class="font-sans" font-size="28" font-weight="700" fill="${p.textPrimary}">The Three-Gate Promotion Relay</text>
    <text x="140" y="195" class="font-sans" font-size="18" fill="${p.textSecondary}">Promotions move per-tenant across isolated stages. Gate 1A auto-deploys to Base; Gate 1B and Gate 2 require dual human sign-off.</text>

    <!-- Step 1: Base Environment Deployment -->
    <rect x="140" y="270" width="480" height="890" rx="12" fill="${p.surface}" stroke="${p.borderStrong}" stroke-width="2"/>
    <rect x="170" y="300" width="130" height="30" rx="6" fill="${p.badgeBg}"/>
    <text x="185" y="321" class="font-mono" font-size="13" font-weight="600" fill="${p.badgeText}">STAGE 1: BASE</text>
    <text x="170" y="370" class="font-sans" font-size="22" font-weight="700" fill="${p.textPrimary}">DEV Environment</text>
    <text x="170" y="400" class="font-sans" font-size="16" fill="${p.textMuted}">Base Entry-Point (is_base: true)</text>

    <rect x="170" y="440" width="420" height="320" rx="8" fill="${p.surfaceSubtle}" stroke="${p.border}" stroke-width="1.5"/>
    <text x="195" y="480" class="font-sans" font-size="18" font-weight="600" fill="${p.textPrimary}">Gate 1A: Automatic Gate</text>
    <text x="195" y="515" class="font-sans" font-size="15" fill="${p.textSecondary}">• Triggered by: Deploy To DEV button</text>
    <text x="195" y="545" class="font-sans" font-size="15" fill="${p.textSecondary}">• Approver: None (Self-approving check)</text>
    <text x="195" y="575" class="font-sans" font-size="15" fill="${p.textSecondary}">• GitOps merge: auto_merge = true</text>
    <text x="195" y="605" class="font-sans" font-size="15" fill="${p.textSecondary}">• Deployment: Background scheduler queues</text>
    <text x="195" y="635" class="font-sans" font-size="15" fill="${p.textSecondary}">• Status: Deployment Queued $\rightarrow$ Running</text>
    <text x="195" y="665" class="font-sans" font-size="15" fill="${p.textSecondary}">• Milestone: Ready To Promote</text>

    <rect x="170" y="790" width="420" height="320" rx="8" fill="${p.surfaceSubtle}" stroke="${p.border}" stroke-width="1.5"/>
    <text x="195" y="830" class="font-sans" font-size="18" font-weight="600" fill="${p.textPrimary}">Prerequisites for Promotion</text>
    <text x="195" y="865" class="font-sans" font-size="15" fill="${p.textSecondary}">1. Every mapped agent must show Running</text>
    <text x="195" y="895" class="font-sans" font-size="15" fill="${p.textSecondary}">2. MAO (Gateway) mapping must exist</text>
    <text x="195" y="925" class="font-sans" font-size="15" fill="${p.textSecondary}">3. Must be on latest version (e.g. 1.0.0)</text>
    <text x="195" y="955" class="font-sans" font-size="15" fill="${p.textSecondary}">4. Next env config records pre-provisioned</text>

    <!-- Arrow 1 -> 2 -->
    <path d="M 620 540 L 700 540" stroke="${p.connector}" stroke-width="2" marker-end="url(#${arrowId})"/>

    <!-- Step 2: Gate 1B Tenant Admin -->
    <rect x="700" y="270" width="480" height="890" rx="12" fill="${p.surface}" stroke="${p.borderStrong}" stroke-width="2"/>
    <rect x="730" y="300" width="130" height="30" rx="6" fill="${p.badgeBg}"/>
    <text x="745" y="321" class="font-mono" font-size="13" font-weight="600" fill="${p.badgeText}">GATE 1B</text>
    <text x="730" y="370" class="font-sans" font-size="22" font-weight="700" fill="${p.textPrimary}">Tenant Admin Review</text>
    <text x="730" y="400" class="font-sans" font-size="16" fill="${p.textMuted}">Screen: Promotion Requests (Tenant Admin)</text>

    <rect x="730" y="440" width="420" height="420" rx="8" fill="${p.surfaceSubtle}" stroke="${p.border}" stroke-width="1.5"/>
    <text x="755" y="480" class="font-sans" font-size="18" font-weight="600" fill="${p.textPrimary}">Tenant-Level Governance</text>
    <text x="755" y="515" class="font-sans" font-size="15" fill="${p.textSecondary}">• Reviewer Role: Tenant Admin / Super Admin</text>
    <text x="755" y="545" class="font-sans" font-size="15" fill="${p.textSecondary}">• Card expands to show all mapped agents</text>
    <text x="755" y="575" class="font-sans" font-size="15" fill="${p.textSecondary}">• View Specs: side-by-side config comparison</text>
    <text x="755" y="605" class="font-sans" font-size="15" fill="${p.textSecondary}">• Highlights Added, Modified, Removed lines</text>
    <text x="755" y="635" class="font-sans" font-size="15" fill="${p.textSecondary}">• Actions: Reject (requires reason) | Approve</text>
    <text x="755" y="665" class="font-sans" font-size="15" fill="${p.textSecondary}">• Atomicity: Entire tenant batch approved together</text>

    <rect x="730" y="890" width="420" height="220" rx="8" fill="${p.surfaceSubtle}" stroke="${p.border}" stroke-width="1.5"/>
    <text x="755" y="930" class="font-sans" font-size="18" font-weight="600" fill="${p.textPrimary}">Outcome on Gate 1B Approval</text>
    <text x="755" y="965" class="font-sans" font-size="15" fill="${p.textSecondary}">• Source version locks as Promoted</text>
    <text x="755" y="995" class="font-sans" font-size="15" fill="${p.textSecondary}">• Moves to Gate 2 queue as Awaiting Approval</text>

    <!-- Arrow 2 -> 3 -->
    <path d="M 1180 540 L 1260 540" stroke="${p.connector}" stroke-width="2" marker-end="url(#${arrowId})"/>

    <!-- Step 3: Gate 2 Cloud Ops -->
    <rect x="1260" y="270" width="480" height="890" rx="12" fill="${p.surface}" stroke="${p.borderStrong}" stroke-width="2"/>
    <rect x="1290" y="300" width="130" height="30" rx="6" fill="${p.badgeBg}"/>
    <text x="1305" y="321" class="font-mono" font-size="13" font-weight="600" fill="${p.badgeText}">GATE 2</text>
    <text x="1290" y="370" class="font-sans" font-size="22" font-weight="700" fill="${p.textPrimary}">Cloud Ops Sign-off</text>
    <text x="1290" y="400" class="font-sans" font-size="16" fill="${p.textMuted}">Screen: Promotion Requests (Cloud Ops)</text>

    <rect x="1290" y="440" width="420" height="420" rx="8" fill="${p.surfaceSubtle}" stroke="${p.border}" stroke-width="1.5"/>
    <text x="1315" y="480" class="font-sans" font-size="18" font-weight="600" fill="${p.textPrimary}">Infrastructure &amp; Quota Check</text>
    <text x="1315" y="515" class="font-sans" font-size="15" fill="${p.textSecondary}">• Reviewer Role: Cloud Operations Engineers</text>
    <text x="1315" y="545" class="font-sans" font-size="15" fill="${p.textSecondary}">• Tab format: Multi-tenant table review</text>
    <text x="1315" y="575" class="font-sans" font-size="15" fill="${p.textSecondary}">• Checks cluster namespace and quota</text>
    <text x="1315" y="605" class="font-sans" font-size="15" fill="${p.textSecondary}">• Verifies external secrets mappings</text>
    <text x="1315" y="635" class="font-sans" font-size="15" fill="${p.textSecondary}">• Actions: Reject Tenant | Approve Tenant</text>
    <text x="1315" y="665" class="font-sans" font-size="15" fill="${p.textSecondary}">• Rejection is final (terminal for that version)</text>

    <rect x="1290" y="890" width="420" height="220" rx="8" fill="${p.surfaceSubtle}" stroke="${p.border}" stroke-width="1.5"/>
    <text x="1315" y="930" class="font-sans" font-size="18" font-weight="600" fill="${p.textPrimary}">Outcome on Gate 2 Approval</text>
    <text x="1315" y="965" class="font-sans" font-size="15" fill="${p.textSecondary}">• Next-env deployment queued by scheduler</text>
    <text x="1315" y="995" class="font-sans" font-size="15" fill="${p.textSecondary}">• GitOps branch &amp; PR automatically generated</text>

    <!-- Arrow 3 -> 4 -->
    <path d="M 1740 540 L 1820 540" stroke="${p.connector}" stroke-width="2" marker-end="url(#${arrowId})"/>

    <!-- Step 4: Terminal Next-Env State & Rollback -->
    <rect x="1820" y="270" width="450" height="890" rx="12" fill="${p.surface}" stroke="${p.borderStrong}" stroke-width="2"/>
    <rect x="1850" y="300" width="130" height="30" rx="6" fill="${p.badgeBg}"/>
    <text x="1865" y="321" class="font-mono" font-size="13" font-weight="600" fill="${p.badgeText}">STAGE 2: PILOT</text>
    <text x="1850" y="370" class="font-sans" font-size="22" font-weight="700" fill="${p.textPrimary}">Pilot-T Environment</text>
    <text x="1850" y="400" class="font-sans" font-size="16" fill="${p.textMuted}">Non-base (auto_merge: false)</text>

    <rect x="1850" y="440" width="390" height="320" rx="8" fill="${p.surfaceSubtle}" stroke="${p.border}" stroke-width="1.5"/>
    <text x="1875" y="480" class="font-sans" font-size="18" font-weight="600" fill="${p.textPrimary}">PR Raised (Terminal State)</text>
    <text x="1875" y="515" class="font-sans" font-size="15" fill="${p.textSecondary}">• Registry does not self-merge</text>
    <text x="1875" y="545" class="font-sans" font-size="15" fill="${p.textSecondary}">• Pull request awaiting manual merge</text>
    <text x="1875" y="575" class="font-sans" font-size="15" fill="${p.textSecondary}">• Direct Deploy is permanently disabled</text>
    <text x="1875" y="605" class="font-sans" font-size="15" fill="${p.textSecondary}">• Read-only state for compliance</text>

    <rect x="1850" y="790" width="390" height="320" rx="8" fill="${p.surfaceSubtle}" stroke="${p.border}" stroke-width="1.5"/>
    <text x="1875" y="830" class="font-sans" font-size="18" font-weight="600" fill="${p.textPrimary}">Rollback Recovery</text>
    <text x="1875" y="865" class="font-sans" font-size="15" fill="${p.textSecondary}">• Rollback Current Deployment button</text>
    <text x="1875" y="895" class="font-sans" font-size="15" fill="${p.textSecondary}">• Select target prior version</text>
    <text x="1875" y="925" class="font-sans" font-size="15" fill="${p.textSecondary}">• Only redeploys agents with deltas</text>
    <text x="1875" y="955" class="font-sans" font-size="15" fill="${p.textSecondary}">• Automated PR generated for rollback</text>
  `;
}

// Diagram 3: Tenant Versioning & Revision Forking Model
function renderDiagram3(theme) {
  const p = PALETTES[theme];
  const arrowId = theme === 'dark' ? 'arrow-dark' : 'arrow';

  return `
    <rect x="80" y="80" width="2240" height="1190" rx="16" fill="${p.surfaceSubtle}" stroke="${p.border}" stroke-width="2"/>
    
    <text x="140" y="160" class="font-sans" font-size="28" font-weight="700" fill="${p.textPrimary}">Tenant Versioning: The Immutable Revision Forking Model</text>
    <text x="140" y="195" class="font-sans" font-size="18" fill="${p.textSecondary}">Deployed versions are locked to ensure absolute GitOps auditability. Subsequent updates never overwrite; they fork clean revisions.</text>

    <!-- Branch A: Unpromoted Draft Flow -->
    <rect x="140" y="270" width="1030" height="420" rx="12" fill="${p.surface}" stroke="${p.borderStrong}" stroke-width="2"/>
    <text x="180" y="325" class="font-sans" font-size="20" font-weight="700" fill="${p.textPrimary}">Scenario 1: In-Place Editing Before Base Deployment</text>
    <text x="180" y="355" class="font-sans" font-size="15" fill="${p.textMuted}">Tenant Version 1.0.0 is Draft or Ready For Deployment (not yet deployed)</text>

    <!-- Node 1 -->
    <rect x="180" y="400" width="240" height="230" rx="8" fill="${p.surfaceSubtle}" stroke="${p.border}" stroke-width="1.5"/>
    <text x="205" y="445" class="font-sans" font-size="16" font-weight="600" fill="${p.textPrimary}">Draft / Ready</text>
    <text x="205" y="475" class="font-mono" font-size="14" fill="${p.badgeText}">Version: 1.0.0</text>
    <text x="205" y="515" class="font-sans" font-size="14" fill="${p.textSecondary}">• Edit skills</text>
    <text x="205" y="540" class="font-sans" font-size="14" fill="${p.textSecondary}">• Change configs</text>
    <text x="205" y="565" class="font-sans" font-size="14" fill="${p.textSecondary}">• Modifies in-place</text>

    <!-- Arrow -->
    <path d="M 420 515 L 500 515" stroke="${p.connector}" stroke-width="2" marker-end="url(#${arrowId})"/>

    <!-- Node 2 -->
    <rect x="500" y="400" width="240" height="230" rx="8" fill="${p.surfaceSubtle}" stroke="${p.border}" stroke-width="1.5"/>
    <text x="525" y="445" class="font-sans" font-size="16" font-weight="600" fill="${p.textPrimary}">Deploy To DEV</text>
    <text x="525" y="475" class="font-mono" font-size="14" fill="${p.badgeText}">Deployment Locks</text>
    <text x="525" y="515" class="font-sans" font-size="14" fill="${p.textSecondary}">• Passes Gate 1A</text>
    <text x="525" y="540" class="font-sans" font-size="14" fill="${p.textSecondary}">• Status: Running</text>
    <text x="525" y="565" class="font-sans" font-size="14" fill="${p.textSecondary}">• Ready To Promote</text>

    <!-- Arrow -->
    <path d="M 740 515 L 820 515" stroke="${p.connector}" stroke-width="2" marker-end="url(#${arrowId})"/>

    <!-- Node 3 -->
    <rect x="820" y="400" width="310" height="230" rx="8" fill="${p.surfaceSubtle}" stroke="${p.border}" stroke-width="1.5"/>
    <text x="845" y="445" class="font-sans" font-size="16" font-weight="600" fill="${p.textPrimary}">Post-Deploy Edit</text>
    <text x="845" y="475" class="font-mono" font-size="14" fill="${p.badgeText}">Forks Minor Revision</text>
    <text x="845" y="515" class="font-sans" font-size="14" fill="${p.textSecondary}">• Edit Mapping creates v1.1.0</text>
    <text x="845" y="540" class="font-sans" font-size="14" fill="${p.textSecondary}">• Previous v1.0.0 locked</text>
    <text x="845" y="565" class="font-sans" font-size="14" fill="${p.textSecondary}">• Re-deployable cleanly</text>

    <!-- Branch B: Promoted / Rejected Forking Flow -->
    <rect x="1230" y="270" width="1030" height="420" rx="12" fill="${p.surface}" stroke="${p.borderStrong}" stroke-width="2"/>
    <text x="1270" y="325" class="font-sans" font-size="20" font-weight="700" fill="${p.textPrimary}">Scenario 2: Editing After Promotion or Rejection</text>
    <text x="1270" y="355" class="font-sans" font-size="15" fill="${p.textMuted}">Version was Promoted (or Rejected) $\rightarrow$ Strict Major Forking Required</text>

    <!-- Node 1 -->
    <rect x="1270" y="400" width="240" height="230" rx="8" fill="${p.surfaceSubtle}" stroke="${p.border}" stroke-width="1.5"/>
    <text x="1295" y="445" class="font-sans" font-size="16" font-weight="600" fill="${p.textPrimary}">Promoted v1.0.0</text>
    <text x="1295" y="475" class="font-mono" font-size="14" fill="${p.badgeText}">Immutable Lock</text>
    <text x="1295" y="515" class="font-sans" font-size="14" fill="${p.textSecondary}">• Live in Pilot-T</text>
    <text x="1295" y="540" class="font-sans" font-size="14" fill="${p.textSecondary}">• Deploy disabled</text>
    <text x="1295" y="565" class="font-sans" font-size="14" fill="${p.textSecondary}">• History preserved</text>

    <!-- Arrow -->
    <path d="M 1510 515 L 1590 515" stroke="${p.connector}" stroke-width="2" marker-end="url(#${arrowId})"/>

    <!-- Node 2 -->
    <rect x="1590" y="400" width="260" height="230" rx="8" fill="${p.surfaceSubtle}" stroke="${p.border}" stroke-width="1.5"/>
    <text x="1615" y="445" class="font-sans" font-size="16" font-weight="600" fill="${p.textPrimary}">Edit Mapping</text>
    <text x="1615" y="475" class="font-mono" font-size="14" fill="${p.badgeText}">Major Revision Fork</text>
    <text x="1615" y="515" class="font-sans" font-size="14" fill="${p.textSecondary}">• Registry cuts v2.0.0</text>
    <text x="1615" y="540" class="font-sans" font-size="14" fill="${p.textSecondary}">• Unlocked copy generated</text>
    <text x="1615" y="565" class="font-sans" font-size="14" fill="${p.textSecondary}">• Change log recorded</text>

    <!-- Arrow -->
    <path d="M 1850 515 L 1930 515" stroke="${p.connector}" stroke-width="2" marker-end="url(#${arrowId})"/>

    <!-- Node 3 -->
    <rect x="1930" y="400" width="290" height="230" rx="8" fill="${p.surfaceSubtle}" stroke="${p.border}" stroke-width="1.5"/>
    <text x="1955" y="445" class="font-sans" font-size="16" font-weight="600" fill="${p.textPrimary}">New Cycle</text>
    <text x="1955" y="475" class="font-mono" font-size="14" fill="${p.badgeText}">Deploy &amp; Promote</text>
    <text x="1955" y="515" class="font-sans" font-size="14" fill="${p.textSecondary}">• Deploy To DEV (v2.0.0)</text>
    <text x="1955" y="540" class="font-sans" font-size="14" fill="${p.textSecondary}">• Passes Gate 1A</text>
    <text x="1955" y="565" class="font-sans" font-size="14" fill="${p.textSecondary}">• Ready To Promote again</text>

    <!-- Bottom summary table -->
    <rect x="140" y="730" width="2120" height="430" rx="12" fill="${p.surface}" stroke="${p.borderStrong}" stroke-width="2"/>
    <text x="180" y="785" class="font-sans" font-size="20" font-weight="700" fill="${p.textPrimary}">Status Banner Taxonomy &amp; Safety Guarantees</text>
    
    <g transform="translate(180, 810)">
      <!-- Row 1 -->
      <rect x="0" y="10" width="2040" height="50" rx="6" fill="${p.surfaceSubtle}"/>
      <text x="20" y="42" class="font-mono" font-size="14" font-weight="700" fill="${p.textPrimary}">Draft</text>
      <text x="320" y="42" class="font-sans" font-size="14" fill="${p.textSecondary}">Version exists but no agent is complete yet.</text>
      <text x="1100" y="42" class="font-sans" font-size="14" fill="${p.textMuted}">Action: Complete mapping configuration in drawer</text>

      <!-- Row 2 -->
      <rect x="0" y="70" width="2040" height="50" rx="6" fill="${p.surface}"/>
      <text x="20" y="102" class="font-mono" font-size="14" font-weight="700" fill="${p.textPrimary}">Ready For Deployment</text>
      <text x="320" y="102" class="font-sans" font-size="14" fill="${p.textSecondary}">At least one agent is complete; shows count (e.g. 1/1).</text>
      <text x="1100" y="102" class="font-sans" font-size="14" fill="${p.textMuted}">Action: Click Deploy To &lt;env&gt; to initiate Gate 1A</text>

      <!-- Row 3 -->
      <rect x="0" y="130" width="2040" height="50" rx="6" fill="${p.surfaceSubtle}"/>
      <text x="20" y="162" class="font-mono" font-size="14" font-weight="700" fill="${p.textPrimary}">Deployment In Progress</text>
      <text x="320" y="162" class="font-sans" font-size="14" fill="${p.textSecondary}">Agents are queued or deploying; polling every 30s.</text>
      <text x="1100" y="162" class="font-sans" font-size="14" fill="${p.textMuted}">Action: Controls modifying version are safely disabled</text>

      <!-- Row 4 -->
      <rect x="0" y="190" width="2040" height="50" rx="6" fill="${p.surface}"/>
      <text x="20" y="222" class="font-mono" font-size="14" font-weight="700" fill="${p.textPrimary}">Ready To Promote</text>
      <text x="320" y="222" class="font-sans" font-size="14" fill="${p.textSecondary}">Every agent is Running and MAO gateway is mapped.</text>
      <text x="1100" y="222" class="font-sans" font-size="14" fill="${p.textMuted}">Action: Promote to &lt;next-env&gt; opens Gate 1B/G2</text>

      <!-- Row 5 -->
      <rect x="0" y="250" width="2040" height="50" rx="6" fill="${p.surfaceSubtle}"/>
      <text x="20" y="282" class="font-mono" font-size="14" font-weight="700" fill="${p.textPrimary}">Partially Deployed</text>
      <text x="320" y="282" class="font-sans" font-size="14" fill="${p.textSecondary}">One or more agents failed, or MAO mapping was skipped.</text>
      <text x="1100" y="282" class="font-sans" font-size="14" fill="${p.textMuted}">Action: Retry failed agent on card, or add MAO config</text>

      <!-- Row 6 -->
      <rect x="0" y="310" width="2040" height="50" rx="6" fill="${p.surface}"/>
      <text x="20" y="342" class="font-mono" font-size="14" font-weight="700" fill="${p.textPrimary}">Promoted (Locked)</text>
      <text x="320" y="342" class="font-sans" font-size="14" fill="${p.textSecondary}">Version passed gates; next env version created.</text>
      <text x="1100" y="342" class="font-sans" font-size="14" fill="${p.textMuted}">Action: Edit Mapping forks major revision v(N+1).0.0</text>
    </g>
  `;
}

async function run() {
  const diagrams = [
    { name: 'd01-single-pod-runtime', fn: renderDiagram1, desc: 'Single-Pod Multi-Tenant Runtime & Secret Separation' },
    { name: 'd02-three-gate-relay', fn: renderDiagram2, desc: 'Three-Gate Promotion Relay Flow' },
    { name: 'd03-revision-forking-model', fn: renderDiagram3, desc: 'Tenant Versioning & Revision Forking Model' },
  ];

  const manifest = {};

  for (const d of diagrams) {
    for (const theme of ['light', 'dark']) {
      const fileName = `${d.name}.${theme}.png`;
      const filePath = path.join(OUT_DIR, fileName);
      const svg = createSvgWrapper(d.fn(theme));
      
      await sharp(Buffer.from(svg))
        .png()
        .toFile(filePath);
      
      manifest[fileName] = {
        file: fileName,
        path: `/work/agent-registry/diagrams/${fileName}`,
        width: WIDTH,
        height: HEIGHT,
        theme,
        title: d.desc
      };
      console.log(`✓ Rendered ${fileName}`);
    }
  }

  fs.writeFileSync(path.join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('Saved diagrams manifest.json!');
}

run().catch(console.error);
