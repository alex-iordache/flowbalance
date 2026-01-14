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
  id: "MentalTraining-Ziua-003",
  position: 3,
  title: { ro: "Mental Training - Day 3", en: "Mental Training - Day 3" },
  name: { ro: "Mental Training - Day 3", en: "Mental Training - Day 3" },
  intro: { ro: "", en: "" },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "", en: "" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
