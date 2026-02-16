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
      Lipsa încrederii în sine apare atunci când îți pui la îndoială deciziile, te bazezi pe validare externă sau renunți la tine sub presiune.
      În acest program înveți să separi gândurile de fapte, să îți respecți promisiunile mici și să construiești stabilitate interioară.
    </p>
    <p>
      Lucrezi cu experiențe reale, nu cu afirmații forțate, și exersezi consecvența chiar și în momente de nesiguranță.
      Folosește acest flow pentru decizii, limite personale și obiective importante din viața ta de zi cu zi.
    </p>
  </>
);
const enDescription = (
  <>
    <p>
      A lack of self-trust shows up when you doubt your decisions, rely on external validation, or abandon yourself under pressure.
      In this program you’ll learn to separate thoughts from facts, keep small promises to yourself, and build inner stability.
    </p>
    <p>
      You’ll work with real-life experiences—not forced affirmations—and practice consistency even in moments of uncertainty.
      Use this flow for decisions, personal boundaries, and important goals in your daily life.
    </p>
  </>
);


const flow: Flow = {
  id: "Build-Self-Trust",
  position: 19,

  title: { ro: "Încredere în sine", en: "Build Self-Trust" },
  name: { ro: "Încredere în sine", en: "Build Self-Trust" },
  intro: { ro: "Crește încrederea în sine pentru a obține ce îți dorești.", en: "Build self-trust to get what you want." },
  description: { ro: roDescription, en: enDescription },
  image: { ro: "/img/flows/self-trust.webp", en: "/img/flows/self-trust.webp" },

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,

  totalPractices: 10,
  practices: [practice_1, practice_2, practice_3, practice_4, practice_5, practice_6, practice_7, practice_8, practice_9, practice_10],
};

export default flow;
