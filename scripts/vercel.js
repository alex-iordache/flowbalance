#!/usr/bin/env node

const { spawnSync } = require('node:child_process');
const readline = require('node:readline');

function run(cmd, args) {
  const res = spawnSync(cmd, args, { stdio: 'inherit' });
  if (res.status !== 0) {
    process.exit(res.status ?? 1);
  }
}

function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(String(answer || '').trim());
    });
  });
}

async function main() {
  // Usage:
  //   npm run vercel -- "your message"
  // or:
  //   npm run vercel   (will prompt)
  const msgFromArgs = process.argv.slice(2).join(' ').trim();
  const message = msgFromArgs || (await prompt('Commit message: '));

  if (!message) {
    console.error('Aborted: empty commit message.');
    process.exit(1);
  }

  run('git', ['add', '.']);
  run('git', ['commit', '-m', message]);
  run('git', ['push', 'origin', 'main']);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

