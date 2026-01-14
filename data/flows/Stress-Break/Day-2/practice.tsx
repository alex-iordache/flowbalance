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
  id: "StressBreak-Ziua-002",
  position: 2,
  title: { ro: "Stress Break - Day 2", en: "Stress Break - Day 2" },
  name: { ro: "Stress Break - Day 2", en: "Stress Break - Day 2" },
  intro: { ro: "", en: "" },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "", en: "" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
