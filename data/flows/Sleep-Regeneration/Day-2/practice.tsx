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
  id: "SleepRegeneration-Ziua-002",
  position: 2,
  title: { ro: "Sleep Regeneration - Day 2", en: "Sleep Regeneration - Day 2" },
  name: { ro: "Sleep Regeneration - Day 2", en: "Sleep Regeneration - Day 2" },
  intro: { ro: "", en: "" },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "", en: "" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
