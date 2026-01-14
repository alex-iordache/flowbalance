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
  id: "ReleaseAnxiety-Ziua-001",
  position: 1,
  title: { ro: "Release Anxiety - Day 1", en: "Release Anxiety - Day 1" },
  name: { ro: "Release Anxiety - Day 1", en: "Release Anxiety - Day 1" },
  intro: { ro: "", en: "" },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "", en: "" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
