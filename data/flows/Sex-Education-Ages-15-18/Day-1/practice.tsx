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
  id: "Ages15to18-Ziua-001",
  position: 1,
  title: { ro: "Sex Education Ages 15-18 - Day 1", en: "Sex Education Ages 15-18 - Day 1" },
  name: { ro: "Sex Education Ages 15-18 - Day 1", en: "Sex Education Ages 15-18 - Day 1" },
  intro: { ro: "", en: "" },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "", en: "" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
