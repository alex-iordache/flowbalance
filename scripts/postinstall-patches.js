#!/usr/bin/env node

const { execSync } = require('child_process');

// Vercel builds the Next.js web app only — no Android native compile.
// Cached node_modules there can also make patch-package fail on re-apply.
if (process.env.VERCEL) {
  console.log('postinstall: skipping patch-package on Vercel');
  process.exit(0);
}

execSync('npx patch-package', { stdio: 'inherit' });
