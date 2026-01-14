import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>{""}</p>
  </>
);
const enDescription = (
  <>
    <p>{""}</p>
  </>
);


const practice: Practice = {
  id: "SleepRegeneration-Ziua-005",
  position: 5,
  title: { ro: "Sleep Regeneration - Day 5", en: "Sleep Regeneration - Day 5" },
  name: { ro: "Sleep Regeneration - Day 5", en: "Sleep Regeneration - Day 5" },
  intro: { ro: "", en: "" },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "", en: "" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
