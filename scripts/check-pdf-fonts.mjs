import { PDFDocument, PDFName } from 'pdf-lib';
import fs from 'node:fs';

async function checkFonts() {
  const bytes = fs.readFileSync('public/resume.pdf');
  const pdfDoc = await PDFDocument.load(bytes);
  const page = pdfDoc.getPage(0);
  const resources = page.node.Resources();
  const fontDict = resources.lookup(PDFName.of('Font'));
  console.log('Fonts:', fontDict.toString());
}

checkFonts().catch(console.error);
