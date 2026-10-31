// Builds the home-page covers from the Pexels photos chosen in Correction C12/C13 (sources and
// photographers: public/work/COVER_SOURCES.md), plus the A2UI cover's component cards.
//
//   node scripts/generate-covers.mjs <folder holding pexels-<id>.jpg originals, 2400px wide>
//
// Every photo gets the same treatment so the covers read as one set: a centred crop, saturation
// eased to 88% and brightness to 94%. Outputs per project: cover.webp (16:10, 1600x1000),
// cover-hover.webp (3:2, 720x480) and cover-thumb.webp (1:1, 800x800).
import sharp from "sharp";
import fs from "fs";
import path from "path";

const source = process.argv[2];
if (!source) {
  console.error("Pass the folder that holds the Pexels originals.");
  process.exit(1);
}

// Add a project here once its photo is chosen. `thumb` positions the square crop.
const covers = [
  { slug: "infrabot", photo: "pexels-4508751.jpg", thumb: "attention" },
  { slug: "a2ui", photo: "pexels-6654126.jpg", thumb: "attention" },
  { slug: "agent-registry", photo: "pexels-1181263.jpg", thumb: "attention" },
  { slug: "salespulze", photo: "pexels-7580644.jpg", thumb: "attention" },
  { slug: "sales-ai", photo: "pexels-7652049.jpg", thumb: "attention" },
];

const tone = (image) => image.modulate({ saturation: 0.88, brightness: 0.94 });

for (const { slug, photo, thumb } of covers) {
  const input = path.join(source, photo);
  const out = `public/work/${slug}`;
  fs.mkdirSync(out, { recursive: true });
  await tone(sharp(input).resize(1600, 1000, { fit: "cover" })).webp({ quality: 90 }).toFile(`${out}/cover.webp`);
  await tone(sharp(input).resize(720, 480, { fit: "cover" })).webp({ quality: 90 }).toFile(`${out}/cover-hover.webp`);
  await tone(sharp(input).resize(800, 800, { fit: "cover", position: thumb })).webp({ quality: 90 }).toFile(`${out}/cover-thumb.webp`);
  console.log(`✓ ${out}/cover.webp, cover-hover.webp, cover-thumb.webp`);
}

// infraBOT cover panel: the compliance summary without the recording's black frame on the right
// and bottom edges (1594x886).
await sharp("public/work/infrabot/screens/06-compliance-summary.webp")
  .extract({ left: 0, top: 0, width: 1594, height: 886 })
  .webp({ quality: 90 })
  .toFile("public/work/infrabot/cover-panel.webp");
console.log("✓ public/work/infrabot/cover-panel.webp (1594x886)");

// A2UI cover cards: the Question, Permission and Plan cards cut from the Figma exports (2400px
// wide), with their rounded corners cut out so they sit cleanly on the photo.
const CARD_W = 640;
const cards = [
  { name: "question", file: "02-question-first-step.webp", box: { left: 714, top: 558, width: 1336, height: 790 } },
  { name: "permission", file: "10-permission-allow.webp", box: { left: 714, top: 1019, width: 1336, height: 555 } },
  { name: "plan", file: "09-plan-modify-v2.webp", box: { left: 714, top: 599, width: 1336, height: 975 } },
];
fs.mkdirSync("public/work/a2ui/cover-cards", { recursive: true });
for (const { name, file, box } of cards) {
  const height = Math.round((box.height / box.width) * CARD_W);
  const radius = 7;
  const mask = Buffer.from(
    `<svg width="${CARD_W}" height="${height}"><rect width="${CARD_W}" height="${height}" rx="${radius}" ry="${radius}"/></svg>`,
  );
  await sharp(`public/work/a2ui/screens/figma/${file}`)
    .extract(box)
    .resize(CARD_W, height)
    .composite([{ input: mask, blend: "dest-in" }])
    .webp({ quality: 90 })
    .toFile(`public/work/a2ui/cover-cards/${name}.webp`);
  console.log(`✓ public/work/a2ui/cover-cards/${name}.webp (${CARD_W}x${height})`);
}
