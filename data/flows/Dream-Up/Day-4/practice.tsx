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
  id: "DreamUp-Ziua-004",
  position: 4,
  title: { ro: "Dream Up - Day 4", en: "Dream Up - Day 4" },
  name: { ro: "Dream Up - Day 4", en: "Dream Up - Day 4" },
  intro: { ro: "", en: "" },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "", en: "" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
