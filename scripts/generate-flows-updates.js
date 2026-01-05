/**
 * One-time generator for the `flows-updates` branch.
 *
 * - Replaces `data/flows/index.ts` to export ONLY the new flows.
 * - Creates one folder per flow with a `flow.ts` containing EN placeholders
 *   (RO values are temporarily set to the EN strings; we’ll translate in the next step).
 *
 * Run:
 *   node scripts/generate-flows-updates.js
 */
/* eslint-disable no-console */

const fs = require('fs/promises');
const path = require('path');

const repoRoot = path.join(__dirname, '..');
const flowsRoot = path.join(repoRoot, 'data', 'flows');

function titleCase(input) {
  return input
    .trim()
    .split(/\s+/g)
    .map(w => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
}

function slugify(input) {
  // Keep it deterministic, similar to data/flows/utils.ts
  return input
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

const categories = [
  {
    name: 'Emotional Regulation',
    flows: [
      'Calming Anxiety',
      'Panic Support',
      'Craving Relief',
      'Ease Overwhelm',
      'Stress Soothing',
      'Calm Your Nervous System',
      'Improve sleep',
    ],
  },
  {
    name: 'Performance Boost',
    flows: [
      'Boost Performance',
      'Improve Focus',
      'Productivity Support',
      'Mental Clarity',
      'Calm Under Pressure',
      'Decision Confidence',
      'Energy Balance',
    ],
  },
  {
    name: 'Mindset',
    flows: [
      'Positive Mindset',
      'Mindset during Competitions',
      'Public Speaking Confidence',
      'Goal Achievement',
      'Build Self-Trust',
      'Boost Confidence',
      'Healthy Money Mindset',
    ],
  },
  {
    name: 'Stories',
    flows: ['Calm Stories', 'Reflection Stories', 'Growth Stories', 'Insight Stories'],
  },
  {
    name: 'Heart Balance',
    flows: [
      'Heartful Gratitude',
      'Boost Motivation',
      'Heart-Centered Balance',
      'Self Compassion',
      'Daily Heart Lift',
      'Heartful Affirmations',
    ],
  },
  {
    name: 'Somatic Release',
    flows: ['Body Release', 'Grounding', 'Shake Method', 'Nervous System Reset'],
  },
];

function renderFlowTs({ id, position, displayName, imagePath }) {
  return `import type { Flow } from '../types';

const flow: Flow = {
  id: ${JSON.stringify(id)},
  position: ${position},

  title: { ro: ${JSON.stringify(displayName)}, en: ${JSON.stringify(displayName)} },
  name: { ro: ${JSON.stringify(displayName)}, en: ${JSON.stringify(displayName)} },
  intro: { ro: '', en: '' },
  description: { ro: '', en: '' },
  image: { ro: ${JSON.stringify(imagePath)}, en: ${JSON.stringify(imagePath)} },

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,

  totalPractices: 0,
  practices: [],
};

export default flow;
`;
}

async function main() {
  const allFlows = [];
  for (const category of categories) {
    for (const flowName of category.flows) {
      allFlows.push(flowName);
    }
  }

  // Generate flow modules
  const imports = [];
  const flowVars = [];
  let position = 1;

  for (const flowNameRaw of allFlows) {
    const displayName = titleCase(flowNameRaw);
    const folderName = slugify(displayName);
    const id = folderName;
    const varName = `flow_${position}_${folderName.replace(/-/g, '_')}`;

    const flowDir = path.join(flowsRoot, folderName);
    await fs.mkdir(flowDir, { recursive: true });
    await fs.writeFile(
      path.join(flowDir, 'flow.ts'),
      renderFlowTs({
        id,
        position,
        displayName,
        imagePath: '/img/flow-bg.jpg',
      }),
      'utf8',
    );

    imports.push(`import ${varName} from "./${folderName}/flow";`);
    flowVars.push(`  ${varName},`);
    position += 1;
  }

  const indexTs = `import type { Flow, Practice, Localized, LocalizedText, LocalizedUrl, Language } from './types';
import { t } from './types';

${imports.join('\n')}

export { t };
export type { Flow, Practice, Localized, LocalizedText, LocalizedUrl, Language };

export const defaultFlows: Flow[] = [
${flowVars.join('\n')}
];
`;

  await fs.writeFile(path.join(flowsRoot, 'index.ts'), indexTs, 'utf8');

  console.log(`Generated ${allFlows.length} flows into data/flows/*`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

