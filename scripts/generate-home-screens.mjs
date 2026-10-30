import sharp from "sharp";
import fs from "fs";
import path from "path";

// Ensure destination directories exist
fs.mkdirSync("public/work/infrabot", { recursive: true });
fs.mkdirSync("public/work/a2ui", { recursive: true });
fs.mkdirSync("public/work/salespulze", { recursive: true });
fs.mkdirSync("public/home", { recursive: true });

async function generateAll() {
  console.log("Generating specific project screens for home page...");

  // -------------------------------------------------------------
  // INFRABOT
  // -------------------------------------------------------------
  // Cover (1600x1000, 16:10): 06-compliance-summary.webp (1600x900)
  // Clean 16:10 crop (1440x900) capturing title, 4 stat cards & 2 donuts
  await sharp("public/work/infrabot/screens/06-compliance-summary.webp")
    .extract({ left: 50, top: 0, width: 1440, height: 900 })
    .resize(1600, 1000)
    .webp({ quality: 90 })
    .toFile("public/work/infrabot/cover.webp");
  console.log("✓ public/work/infrabot/cover.webp (1600x1000)");

  // Hover (720x480, 3:2): 09-approval-gate.webp
  // Approval panel and the line above it
  await sharp("public/work/infrabot/screens/09-approval-gate.webp")
    .extract({ left: 570, top: 120, width: 1010, height: 673 })
    .resize(720, 480)
    .webp({ quality: 90 })
    .toFile("public/work/infrabot/cover-hover.webp");
  console.log("✓ public/work/infrabot/cover-hover.webp (720x480)");

  // Thumb (800x800, 1:1): 06-compliance-summary.webp
  // The two compliance donuts, square
  const infrabotDonuts = await sharp("public/work/infrabot/screens/06-compliance-summary.webp")
    .extract({ left: 350, top: 460, width: 950, height: 260 })
    .png()
    .toBuffer();
  const infrabotSquare = await sharp(infrabotDonuts)
    .extend({ top: 345, bottom: 345, background: "#FAFAFA" })
    .png()
    .toBuffer();
  await sharp(infrabotSquare)
    .resize(800, 800)
    .webp({ quality: 90 })
    .toFile("public/work/infrabot/cover-thumb.webp");
  console.log("✓ public/work/infrabot/cover-thumb.webp (800x800)");

  // -------------------------------------------------------------
  // A2UI
  // -------------------------------------------------------------
  // Source resolution: 2400x1713 (scale factor = 2400 / 1440 = 5/3)
  // Cover (1600x1000, 16:10): 11-permission-outcomes-destructive.webp
  // Nudged y by +15px in frame coords (+25px in 2400 coords) to cleanly clear "View request" above
  await sharp("public/work/a2ui/screens/figma/11-permission-outcomes-destructive.webp")
    .extract({ left: 550, top: 675, width: 1660, height: 1037 })
    .resize(1600, 1000)
    .webp({ quality: 90 })
    .toFile("public/work/a2ui/cover.webp");
  console.log("✓ public/work/a2ui/cover.webp (1600x1000)");

  // Hover (720x480, 3:2): 09-plan-modify-v2.webp
  // Nudged y by +10px (+16px in 2400 coords) to cleanly clear top orb tip
  await sharp("public/work/a2ui/screens/figma/09-plan-modify-v2.webp")
    .extract({ left: 550, top: 575, width: 1600, height: 1000 })
    .resize(720, 480)
    .webp({ quality: 90 })
    .toFile("public/work/a2ui/cover-hover.webp");
  console.log("✓ public/work/a2ui/cover-hover.webp (720x480)");

  // Thumb (800x800, 1:1): 11-permission-outcomes-destructive.webp
  // Permission outcomes table (What, System, Who affected, Reversible) square
  const a2uiTable = await sharp("public/work/a2ui/screens/figma/11-permission-outcomes-destructive.webp")
    .extract({ left: 520, top: 920, width: 1380, height: 420 })
    .png()
    .toBuffer();
  const a2uiSquare = await sharp(a2uiTable)
    .extend({ top: 480, bottom: 480, background: "#FFFFFF" })
    .png()
    .toBuffer();
  await sharp(a2uiSquare)
    .resize(800, 800)
    .webp({ quality: 90 })
    .toFile("public/work/a2ui/cover-thumb.webp");
  console.log("✓ public/work/a2ui/cover-thumb.webp (800x800)");

  // -------------------------------------------------------------
  // SALESPULZE
  // -------------------------------------------------------------
  // Cover (1600x1000, 16:10): 01-intel-hub.webp (2400x3228)
  // x 0, y 230, width 1440, height 900 in 1440 frame -> 0, 383, 2400, 1500
  await sharp("public/work/salespulze/screens/figma/01-intel-hub.webp")
    .extract({ left: 0, top: 383, width: 2400, height: 1500 })
    .resize(1600, 1000)
    .webp({ quality: 90 })
    .toFile("public/work/salespulze/cover.webp");
  console.log("✓ public/work/salespulze/cover.webp (1600x1000)");

  // Hover (720x480, 3:2): 02-meeting-series.webp (2400x2175)
  // Nudged top to y=150 to include title "Weekly Regional Sales Review" + "AI Inferred" + "High Confidence"
  await sharp("public/work/salespulze/screens/figma/02-meeting-series.webp")
    .extract({ left: 450, top: 150, width: 1367, height: 912 })
    .resize(720, 480)
    .webp({ quality: 90 })
    .toFile("public/work/salespulze/cover-hover.webp");
  console.log("✓ public/work/salespulze/cover-hover.webp (720x480)");

  // Thumb (800x800, 1:1): 01-intel-hub.webp
  // Field health heat map cells with Level tabs, North (6 Critical), South (57 Moderate) square
  await sharp("public/work/salespulze/screens/figma/01-intel-hub.webp")
    .extract({ left: 475, top: 915, width: 835, height: 835 })
    .resize(800, 800)
    .webp({ quality: 90 })
    .toFile("public/work/salespulze/cover-thumb.webp");
  console.log("✓ public/work/salespulze/cover-thumb.webp (800x800)");

  // -------------------------------------------------------------
  // HOW I WORK (800x600, 4:3 WebP in /public/home/)
  // -------------------------------------------------------------
  // 1. how-agent-experience.webp from a2ui 03-question-multiselect-other.webp
  // x 420, y 325, width 820, height 600 -> scaled: 700, 542, 1367, 1000
  await sharp("public/work/a2ui/screens/figma/03-question-multiselect-other.webp")
    .extract({ left: 700, top: 542, width: 1367, height: 1000 })
    .resize(800, 600)
    .webp({ quality: 90 })
    .toFile("public/home/how-agent-experience.webp");
  console.log("✓ public/home/how-agent-experience.webp (800x600)");

  // 2. how-platform-ux.webp from salespulze 01-intel-hub.webp
  // Nudged left by 20px (left=310, width=1750) to prevent West card text touch
  await sharp("public/work/salespulze/screens/figma/01-intel-hub.webp")
    .extract({ left: 310, top: 933, width: 1750, height: 1312 })
    .resize(800, 600)
    .webp({ quality: 90 })
    .toFile("public/home/how-platform-ux.webp");
  console.log("✓ public/home/how-platform-ux.webp (800x600)");

  // 3. how-governed-automation.webp from infrabot 09-approval-gate.webp
  // The approval gate panel
  await sharp("public/work/infrabot/screens/09-approval-gate.webp")
    .extract({ left: 570, top: 135, width: 1010, height: 757 })
    .resize(800, 600)
    .webp({ quality: 90 })
    .toFile("public/home/how-governed-automation.webp");
  console.log("✓ public/home/how-governed-automation.webp (800x600)");

  console.log("\nAll 12 home page screen assets generated successfully!");
}

generateAll();
