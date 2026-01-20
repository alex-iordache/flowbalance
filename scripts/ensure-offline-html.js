/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function ensureFileCopy({ from, to }) {
  if (!fs.existsSync(from)) return;
  const dir = path.dirname(to);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(to)) {
    fs.copyFileSync(from, to);
    console.log(`[ensure-offline-html] copied ${path.relative(process.cwd(), from)} -> ${path.relative(process.cwd(), to)}`);
  }
}

function main() {
  const root = process.cwd();
  const src = path.join(root, 'public', 'offline.html');
  const outDest = path.join(root, 'out', 'offline.html');
  const iosDest = path.join(root, 'ios', 'App', 'App', 'public', 'offline.html');

  ensureFileCopy({ from: src, to: outDest });
  // If iOS public exists locally (after a sync), ensure offline.html exists there too.
  ensureFileCopy({ from: src, to: iosDest });
}

main();

