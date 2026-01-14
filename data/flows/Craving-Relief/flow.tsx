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

const roDescription = (
  <>
    <p>
      Poftele intense apar ca o nevoie urgentă și pot prelua controlul atunci când ești stresat, obosit sau copleșit.
      În acest program înveți să recunoști mecanismele dependenței, să creezi o pauză între impuls și reacție și să îți calmezi sistemul nervos înainte de a acționa.
    </p>
    <p>
      Lucrezi cu nevoile emoționale din spatele poftelor și exersezi răspunsuri conștiente care înlocuiesc automatismul.
      Folosește acest flow pentru mâncare, nicotină, scrolling sau orice obicei compulsiv care îți consumă energia.
    </p>
  </>
);
const enDescription = (
  <>
    <p>
      Intense cravings can show up as an urgent need and take over when you’re stressed, tired, or overwhelmed.
      In this program you’ll learn to recognize the mechanisms of addiction, create a pause between impulse and reaction, and calm your nervous system before you act.
    </p>
    <p>
      You’ll work with the emotional needs underneath cravings and practice conscious responses that replace automatic habits.
      Use this flow for food, nicotine, scrolling, or any compulsive habit that drains your energy.
    </p>
  </>
);


const flow: Flow = {
  id: "Craving-Relief",
  position: 3,

  title: { ro: "Controlul Compulsiilor", en: "Craving Relief" },
  name: { ro: "Controlul Compulsiilor", en: "Craving Relief" },
  intro: { ro: "Transformă compulsia în reacție conștientă.", en: "Turn compulsion into a conscious response." },
  description: { ro: roDescription, en: enDescription },
  image: { ro: "/img/flows/craving-relief.png", en: "/img/flows/craving-relief.png" },

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,

  totalPractices: 10,
  practices: [practice_1, practice_2, practice_3, practice_4, practice_5, practice_6, practice_7, practice_8, practice_9, practice_10],
};

export default flow;
