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
  id: "MentalTraining-Ziua-012",
  position: 12,
  title: { ro: "Mental Training - Day 12", en: "Mental Training - Day 12" },
  name: { ro: "Mental Training - Day 12", en: "Mental Training - Day 12" },
  intro: { ro: "", en: "" },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "", en: "" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
