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
  id: "DreamUp-Ziua-012",
  position: 12,
  title: { ro: "Dream Up - Day 12", en: "Dream Up - Day 12" },
  name: { ro: "Dream Up - Day 12", en: "Dream Up - Day 12" },
  intro: { ro: "", en: "" },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "", en: "" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
