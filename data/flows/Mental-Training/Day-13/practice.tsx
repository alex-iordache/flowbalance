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
  id: "MentalTraining-Ziua-013",
  position: 13,
  title: { ro: "Mental Training - Day 13", en: "Mental Training - Day 13" },
  name: { ro: "Mental Training - Day 13", en: "Mental Training - Day 13" },
  intro: { ro: "", en: "" },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "", en: "" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
