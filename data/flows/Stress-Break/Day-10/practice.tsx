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
  id: "StressBreak-Ziua-010",
  position: 10,
  title: { ro: "Stress Break - Day 10", en: "Stress Break - Day 10" },
  name: { ro: "Stress Break - Day 10", en: "Stress Break - Day 10" },
  intro: { ro: "", en: "" },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "", en: "" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
