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
  id: "SleepRegeneration-Ziua-010",
  position: 10,
  title: { ro: "Sleep Regeneration - Day 10", en: "Sleep Regeneration - Day 10" },
  name: { ro: "Sleep Regeneration - Day 10", en: "Sleep Regeneration - Day 10" },
  intro: { ro: "", en: "" },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "", en: "" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
