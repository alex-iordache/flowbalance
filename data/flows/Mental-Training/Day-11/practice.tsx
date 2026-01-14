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
  id: "MentalTraining-Ziua-011",
  position: 11,
  title: { ro: "Mental Training - Day 11", en: "Mental Training - Day 11" },
  name: { ro: "Mental Training - Day 11", en: "Mental Training - Day 11" },
  intro: { ro: "", en: "" },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "", en: "" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
