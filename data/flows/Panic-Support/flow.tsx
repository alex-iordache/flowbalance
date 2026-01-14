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
    <p>{"Panica se simte rapidă; acest flow încetinește totul. Te ancorezi în senzații, lungești expirația și îi oferi sistemului nervos semnale clare că ești în siguranță acum. Începe cu Ziua 1 când valul crește sau exersează din timp pentru a construi încredere."}</p>
  </>
);
const enDescription = (
  <>
    <p>{"Panic feels fast; this flow slows everything down. You’ll anchor in sensation, widen your exhale, and give your nervous system clear signals that you are safe right now. Start with Day 1 when the wave is rising, or practice ahead of time to build confidence."}</p>
  </>
);


const flow: Flow = {
  id: "Panic-Support",
  position: 2,

  title: { ro: "Sprijin în panică", en: "Panic Support" },
  name: { ro: "Sprijin în panică", en: "Panic Support" },
  intro: { ro: "Împământează-te când apare panica—pas cu pas.", en: "Ground yourself when panic hits—one small step at a time." },
  description: { ro: roDescription, en: enDescription },
  image: { ro: "/img/flows/panic-support.png", en: "/img/flows/panic-support.png" },

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,

  totalPractices: 12,
  practices: [practice_1, practice_2, practice_3, practice_4, practice_5, practice_6, practice_7, practice_8, practice_9, practice_10, practice_11, practice_12],
};

export default flow;
