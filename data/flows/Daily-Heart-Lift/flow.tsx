import type { Flow } from '../types';
import practice_1 from "./Day-1/practice";

const roDescription = (
  <>
    <p>
      Această înregistrare este un exercițiu zilnic de reconectare cu sinele profund și cu sentimentul de întregire.
    </p>
    <p>
      În această practică, înveți să îți deschizi inima către tine așa cum ești acum, cu tot ce porți, cu lumina și cu
      umbrele tale, fără luptă și fără respingere.
    </p>
    <p>
      Trăită constant, această stare de acceptare ridică nivelul emoțional de bază, aduce o formă calmă de bucurie și
      susține un sentiment profund de sens și apartenență la viață.
    </p>
    <p>
      Aceasta este o singură înregistrare, concepută pentru a fi reluată zilnic, ca un obicei de dimineață sau de seară,
      timp de cel puțin o lună, pentru a susține o inimă mai deschisă, o minte mai blândă și o relație mai armonioasă cu
      tine și cu lumea.
    </p>
  </>
);

const enDescription = (
  <>
    <p>
      This recording is a daily practice of reconnecting with your deeper self and with a sense of wholeness.
    </p>
    <p>
      In this practice you’ll learn to open your heart to yourself as you are right now—with everything you carry, with
      your light and your shadows—without struggle and without rejection.
    </p>
    <p>
      Practiced consistently, this state of acceptance lifts your emotional baseline, brings a calm form of joy, and
      supports a deep sense of meaning and belonging to life.
    </p>
    <p>
      This is a single recording designed to be repeated daily—as a morning or evening habit—for at least one month, to
      support a more open heart, a gentler mind, and a more harmonious relationship with yourself and the world.
    </p>
  </>
);

const flow: Flow = {
  id: "Daily-Heart-Lift",
  position: 29,

  title: { ro: "Sugestii zilnice", en: "Daily Heart Lift" },
  name: { ro: "Sugestii zilnice", en: "Daily Heart Lift" },
  intro: {
    ro: "Modifică starea inimii tale prin acceptare, întregire și sens.",
    en: "Shift your heart state through acceptance, wholeness, and meaning.",
  },
  description: { ro: roDescription, en: enDescription },
  image: { ro: "/img/flows/daily-heart-lift.jpg", en: "/img/flows/daily-heart-lift.jpg" },
  comingSoon: false,

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,

  totalPractices: 1,
  practices: [practice_1],
};

export default flow;

