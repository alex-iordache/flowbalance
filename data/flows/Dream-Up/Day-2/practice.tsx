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
  id: "DreamUp-Ziua-002",
  position: 2,
  title: { ro: "Dream Up - Day 2", en: "Dream Up - Day 2" },
  name: { ro: "Dream Up - Day 2", en: "Dream Up - Day 2" },
  intro: { ro: "", en: "" },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "", en: "" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
