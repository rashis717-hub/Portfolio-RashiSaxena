import fs from 'node:fs';
import zlib from 'node:zlib';

const buf = fs.readFileSync('public/resume.pdf');

// Parse cmaps and streams
const textStreams = [];
const cmaps = [];

let pos = 0;
while (true) {
  const streamIdx = buf.indexOf('stream', pos);
  if (streamIdx === -1) break;
  const newline = buf[streamIdx + 6] === 0x0d ? streamIdx + 8 : streamIdx + 7;
  const endIdx = buf.indexOf('endstream', newline);
  if (endIdx === -1) break;

  const raw = buf.subarray(newline, endIdx);
  try {
    const uncompressed = zlib.inflateSync(raw);
    const str = uncompressed.toString('utf8');
    if (str.includes('/CIDInit') || str.includes('begincmap')) {
      cmaps.push(str);
    } else if (str.includes('BT') && str.includes('ET')) {
      textStreams.push(str);
    }
  } catch (e) {}
  pos = endIdx + 9;
}

// Build cid -> unicode mapping from cmaps
const cidToChar = {};
for (const cmap of cmaps) {
  const regex = /<([0-9A-Fa-f]+)>\s+<([0-9A-Fa-f]+)>/g;
  let m;
  while ((m = regex.exec(cmap)) !== null) {
    const cid = m[1].toUpperCase();
    const unicode = String.fromCharCode(parseInt(m[2], 16));
    cidToChar[cid] = unicode;
  }
}

// Decode text in textStreams
for (let i = 0; i < textStreams.length; i++) {
  console.log(`\n--- Text Stream ${i + 1} ---`);
  const stream = textStreams[i];
  
  // Extract hex strings between < and >
  const decoded = stream.replace(/<([0-9A-Fa-f]+)>/g, (_, hex) => {
    let res = '';
    for (let j = 0; j < hex.length; j += 2) {
      const byte = hex.slice(j, j + 2).toUpperCase();
      res += cidToChar[byte] || `[?${byte}]`;
    }
    return res;
  });
  
  console.log(decoded.split('\n').filter(l => l.includes('Tj') || l.includes('TJ') || l.includes('Td')).slice(0, 40).join('\n'));
}
