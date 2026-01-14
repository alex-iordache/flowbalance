import type { Flow } from '../types';
import practice_1 from "./Day-1/practice";
import practice_2 from "./Day-2/practice";
import practice_3 from "./Day-3/practice";
import practice_4 from "./Day-4/practice";
import practice_5 from "./Day-5/practice";
import practice_6 from "./Day-6/practice";
import practice_7 from "./Day-7/practice";
import practice_8 from "./Day-8/practice";
import practice_9 from "./Day-9/practice";
import practice_10 from "./Day-10/practice";
import practice_11 from "./Day-11/practice";
import practice_12 from "./Day-12/practice";

const roDescription = (
  <>
    <p>{"Împământarea este una dintre cele mai rapide ieșiri din spirale mentale. Practicile de aici aduc atenția în tălpi, respirație și simțuri, ca mintea să nu mai plutească înaintea vieții. Folosește-l înainte de conversații dificile, după mult ecran sau când te simți „neancorat.”"}</p>
  </>
);
const enDescription = (
  <>
    <p>{"Grounding is the fastest way to exit mental spirals. These practices bring attention into feet, breath, and the senses so your mind can stop floating ahead of life. Use it before difficult conversations, after screen time, or whenever you feel unrooted."}</p>
  </>
);


const flow: Flow = {
  id: "Grounding",
  position: 33,

  title: { ro: "Împământare", en: "Grounding" },
  name: { ro: "Împământare", en: "Grounding" },
  intro: { ro: "Revino pe pământ: stabil, prezent, aici.", en: "Come back to the ground: stable, present, here." },
  description: { ro: roDescription, en: enDescription },
  image: { ro: "/img/flow-bg.png", en: "/img/flow-bg.png" },
  comingSoon: true,

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,

  totalPractices: 12,
  practices: [practice_1, practice_2, practice_3, practice_4, practice_5, practice_6, practice_7, practice_8, practice_9, practice_10, practice_11, practice_12],
};

export default flow;
