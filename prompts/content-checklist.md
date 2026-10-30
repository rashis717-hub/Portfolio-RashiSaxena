# Case Study Content Checklist

Use this checklist when drafting or collecting assets for a new case study. Case studies follow the numbered-section editorial structure defined in `DESIGN.md`.

## 1. Metadata & Frontmatter
- [ ] **Title**: Concise product or platform name (e.g. *A2UI: Agent to UI Protocol*).
- [ ] **Slug**: Lowercase hyphenated string matching the filename (e.g. `a2ui.mdx`).
- [ ] **Tagline**: Single-sentence statement describing the design impact.
- [ ] **Summary**: 1–2 paragraphs providing high-level context and business problem.
- [ ] **Role**: Specific UX leadership role (e.g. *Lead UX Designer*, *Design System Lead*).
- [ ] **Platforms**: List of platforms targeted (e.g. `["Web", "Desktop"]`).
- [ ] **Timeline**: Duration and dates (e.g. *Jul 2024 – Jul 2025 (12 mos)*).
- [ ] **Year**: Four-digit integer (e.g. `2025`).
- [ ] **Confidentiality / Visibility**:
  - `visibility: public` — publicly indexed, included in sitemap and home work list.
  - `visibility: private` — protected by passcode gate, excluded from sitemap and search engines.
  - `redact: true/false` — if true, masks customer identifying assets and hides cover.
- [ ] **Tags**: 2–4 domain tags (e.g. `["Enterprise AI", "Agent Experience", "Design Systems"]`).
- [ ] **Order**: Numeric sorting rank for home page list (1 = top).

## 2. Quantitative Evidence & Key Metrics
- [ ] **Primary Metric**: Core business or operational outcome (e.g. *65%* reduction in resolution time).
- [ ] **Secondary Metric**: Scale or adoption metric (e.g. *100+* enterprise sales teams).
- [ ] **Tertiary Metric**: System efficiency or velocity metric (e.g. *2x* faster agent handoff).

## 3. Visual Assets
- [ ] **Cover Image**: High-resolution 16:9 hero preview placed at `/public/work/<slug>/cover.jpg`.
- [ ] **5 to 8 Screen Captures**: Placed in `/public/work/<slug>/`.
  - Every image requires descriptive `alt` text.
  - Every image requires a 1-line `caption` highlighting what the reader should notice.
- [ ] **Before / After Comparison** (optional): Pairs of screens for `<Compare />`.
- [ ] **Annotated UI Walkthrough** (optional): Breakdown diagram for `<Annotated />`.

## 4. Narrative Sections
- [ ] **01 / The Challenge**: The enterprise friction, user pain point, or workflow breakdown.
- [ ] **02 / Stakeholder Perspectives**: Input from cross-functional groups using `<Stakeholders>`:
  - Engineering / FDE perspective: "What I heard" & "How it shaped design".
  - Business / Ops perspective: "What I heard" & "How it shaped design".
  - Executive / Buyer perspective: "What I heard" & "How it shaped design".
- [ ] **03 / Core System Architecture**: Process flow (`<Flow />`) or agentic interaction model.
- [ ] **04 / Critical Decision & Trade-offs**: One key design decision (`<Decision />`):
  - Context & options considered.
  - Technical or organizational trade-offs.
  - Chosen direction and why.
- [ ] **05 / Impact & Key Takeaway**: The ultimate outcome and lessons for future agentic platforms.
