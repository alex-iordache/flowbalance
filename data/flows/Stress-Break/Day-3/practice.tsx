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
  id: "StressBreak-Ziua-003",
  position: 3,
  title: { ro: "Stress Break - Day 3", en: "Stress Break - Day 3" },
  name: { ro: "Stress Break - Day 3", en: "Stress Break - Day 3" },
  intro: { ro: "", en: "" },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "", en: "" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
