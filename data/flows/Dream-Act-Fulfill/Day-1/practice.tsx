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
  id: "DreamActFulfill-Ziua-001",
  position: 1,
  title: { ro: "Dream Act Fulfill - Day 1", en: "Dream Act Fulfill - Day 1" },
  name: { ro: "Dream Act Fulfill - Day 1", en: "Dream Act Fulfill - Day 1" },
  intro: { ro: "", en: "" },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "", en: "" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
