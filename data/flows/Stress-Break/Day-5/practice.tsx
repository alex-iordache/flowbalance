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
  id: "StressBreak-Ziua-005",
  position: 5,
  title: { ro: "Stress Break - Day 5", en: "Stress Break - Day 5" },
  name: { ro: "Stress Break - Day 5", en: "Stress Break - Day 5" },
  intro: { ro: "", en: "" },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "", en: "" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
