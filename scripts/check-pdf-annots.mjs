import { PDFDocument } from 'pdf-lib';
import fs from 'node:fs';

async function checkAnnots() {
  const bytes = fs.readFileSync('public/resume.pdf');
  const pdfDoc = await PDFDocument.load(bytes);
  const page = pdfDoc.getPage(0);
  console.log('Page count:', pdfDoc.getPageCount());
  console.log('Page 1 size:', page.getWidth(), page.getHeight());
  
  const annots = page.node.Annots();
  console.log('Annots count:', annots ? annots.size() : 0);
  if (annots) {
    for (let i = 0; i < annots.size(); i++) {
      const a = annots.get(i);
      console.log('Annot', i, a.toString());
    }
  }
}

checkAnnots().catch(console.error);
