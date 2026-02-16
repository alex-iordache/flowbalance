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
import practice_13 from "./Day-13/practice";

const roDescription = (
  <>
    <p>
      Dificultățile legate de bani și atingerea obiectivelor apar adesea din tensiune, grabă, frică sau din tipare vechi învățate fără să fie conștientizate.
      În acest program înveți să îți observi relația cu banii fără judecată, să creezi spațiu între impuls și decizie și să asociezi banii cu siguranța, nu cu stresul.
    </p>
    <p>
      Lucrezi cu obiective reale, cu toleranța emoțională și cu capacitatea de a alege conștient, pas cu pas.
      Folosește acest flow pentru claritate financiară, stabilitate interioară și o relație mai matură cu banii, în viața ta de zi cu zi.
    </p>
  </>
);
const enDescription = (
  <>
    <p>
      Money challenges and goal achievement often come from tension, urgency, fear, or old patterns learned without awareness.
      In this program, you’ll learn to observe your relationship with money without judgment, create space between impulse and decision, and link money with safety—not stress.
    </p>
    <p>
      You’ll work with real goals, emotional tolerance, and the ability to choose consciously, step by step.
      Use this flow for financial clarity, inner steadiness, and a more mature relationship with money in everyday life.
    </p>
  </>
);


const flow: Flow = {
  id: "Healthy-Money-Mindset",
  position: 21,

  title: { ro: "Relație sănătoasă cu banii", en: "Healthy Money Mindset" },
  name: { ro: "Relație sănătoasă cu banii", en: "Healthy Money Mindset" },
  intro: { ro: "Construiește o relație eficientă, matură și stabilă cu banii și visurile tale.", en: "Build an effective, mature, and steady relationship with money and your dreams." },
  description: { ro: roDescription, en: enDescription },
  image: { ro: "/img/flows/healthy-money-mindset.webp", en: "/img/flows/healthy-money-mindset.webp" },
  comingSoon: false,

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,

  totalPractices: 13,
  practices: [practice_1, practice_2, practice_3, practice_4, practice_5, practice_6, practice_7, practice_8, practice_9, practice_10, practice_11, practice_12, practice_13],
};

export default flow;
