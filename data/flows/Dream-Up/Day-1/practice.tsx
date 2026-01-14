import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>{"Write down all the qualities you need to realize your dream."}</p>
  </>
);
const enDescription = (
  <>
    <p>{"Write down all the qualities you need to realize your dream."}</p>
  </>
);


const practice: Practice = {
  id: "DreamUp-Ziua-001",
  position: 1,
  title: { ro: "Dream Up - Day 1", en: "Dream Up - Day 1" },
  name: { ro: "Dream Up - Day 1", en: "Dream Up - Day 1" },
  intro: { ro: "", en: "" },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "https://www.simonanicolaescu.ro/wp-content/uploads/2021/10/08-analiza-vietii-personale.mp3", en: "https://www.simonanicolaescu.ro/wp-content/uploads/2021/10/08-analiza-vietii-personale.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
