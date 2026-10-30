import { PDFDocument, rgb, StandardFonts, PDFName, PDFString, PDFArray, PDFDict } from 'pdf-lib';
import fs from 'node:fs';

async function updateResume() {
  const existingPdfBytes = fs.readFileSync('public/resume.pdf');
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const page = pdfDoc.getPage(0);
  const { width, height } = page.getSize();
  console.log(`Page dimensions: ${width} x ${height}`);

  // The original placeholder line was at y = 757.839, with height ~10pt
  // Let's cover y = 754 to 768 from x = 48 to x = 550 with clean white
  page.drawRectangle({
    x: 48,
    y: 753,
    width: 502,
    height: 16,
    color: rgb(1, 1, 1),
  });

  // Items to draw:
  // "Hyderabad, India" | "rashis717@gmail.com" | "+91 8840295743" | "linkedin.com/in/rashi-saxena-2k2710" | "Rashi Portfolio"
  const fontSize = 8.5;
  const textColor = rgb(0.294, 0.333, 0.388); // #4B5563 (muted text matching original)
  const linkColor = rgb(0.12, 0.35, 0.75); // subtle professional link color, or same text color with underline
  const sepColor = rgb(0.7, 0.72, 0.75);

  const items = [
    { text: 'Hyderabad, India', url: null },
    { text: '|', isSep: true },
    { text: 'rashis717@gmail.com', url: 'mailto:rashis717@gmail.com' },
    { text: '|', isSep: true },
    { text: '+91 8840295743', url: 'tel:+918840295743' },
    { text: '|', isSep: true },
    { text: 'linkedin.com/in/rashi-saxena-2k2710', url: 'https://www.linkedin.com/in/rashi-saxena-2k2710' },
    { text: '|', isSep: true },
    { text: 'Rashi Portfolio', url: 'https://portfolio-rashi-saxena-5k4mojq05-rashis-projects-9c0eb0ab.vercel.app/', isPortfolio: true },
  ];

  // Calculate total width
  let totalWidth = 0;
  for (const item of items) {
    const f = item.isPortfolio ? fontBold : font;
    item.width = f.widthOfTextAtSize(item.isSep ? '  |  ' : item.text, fontSize);
    totalWidth += item.width;
  }

  console.log(`Total text width: ${totalWidth}pt (available: ~500pt)`);

  const startX = 48.3;
  const y = 757.5;

  let currentX = startX;

  // Helper to add Link annotation
  function addLinkAnnotation(rect, url) {
    const linkAnnot = pdfDoc.context.obj({
      Type: 'Annot',
      Subtype: 'Link',
      Rect: rect,
      Border: [0, 0, 0],
      C: [0, 0, 0],
      A: {
        Type: 'Action',
        S: 'URI',
        URI: PDFString.of(url),
      },
    });

    const linkAnnotRef = pdfDoc.context.register(linkAnnot);

    // Add to page annotations
    let annots = page.node.lookup(PDFName.of('Annots'), PDFArray);
    if (!annots) {
      annots = pdfDoc.context.obj([]);
      page.node.set(PDFName.of('Annots'), annots);
    }
    annots.push(linkAnnotRef);
  }

  for (const item of items) {
    if (item.isSep) {
      page.drawText('  |  ', {
        x: currentX,
        y: y,
        size: fontSize,
        font: font,
        color: sepColor,
      });
      currentX += item.width;
    } else {
      const f = item.isPortfolio ? fontBold : font;
      const color = item.isPortfolio ? rgb(0.1, 0.4, 0.8) : (item.url ? textColor : textColor);
      
      page.drawText(item.text, {
        x: currentX,
        y: y,
        size: fontSize,
        font: f,
        color: color,
      });

      // If it has a URL, draw subtle underline if portfolio and add link annotation
      if (item.isPortfolio) {
        page.drawLine({
          start: { x: currentX, y: y - 1 },
          end: { x: currentX + item.width, y: y - 1 },
          thickness: 0.75,
          color: rgb(0.1, 0.4, 0.8),
        });
      }

      if (item.url) {
        // PDF rect coordinates: [xMin, yMin, xMax, yMax]
        const rect = [currentX - 1, y - 2, currentX + item.width + 1, y + fontSize + 2];
        addLinkAnnotation(rect, item.url);
      }

      currentX += item.width;
    }
  }

  const modifiedPdfBytes = await pdfDoc.save();
  fs.writeFileSync('public/resume.pdf', modifiedPdfBytes);
  // Also copy to out/ if out exists
  if (fs.existsSync('out/resume.pdf')) {
    fs.writeFileSync('out/resume.pdf', modifiedPdfBytes);
  }
  console.log('✓ Successfully updated public/resume.pdf!');
}

updateResume().catch(console.error);
