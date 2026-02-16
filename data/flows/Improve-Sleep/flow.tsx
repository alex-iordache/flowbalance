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
import practice_14 from "./Day-14/practice";

const roDescription = (
  <>
    <p>
      Acest program este conceput pentru a sprijini refacerea ciclurilor naturale de somn și pentru a reduce tensiunea
      acumulată în corp și minte pe parcursul zilei.
    </p>
    <p>
      Presiunea constantă de a face mai mult, de a fi productiv și de a rămâne conectat afectează capacitatea organismului
      de a intra în stări profunde de odihnă.
    </p>
    <p>
      Prin practici ghidate de relaxare, respirație și reglare mentală, înveți să îți calmezi sistemul nervos, să reduci
      hiperactivitatea mentală și să creezi condițiile interne necesare pentru un somn odihnitor.
    </p>
    <p>
      Programul este structurat pe 14 zile și include mai multe înregistrări audio, fiecare susținând integrarea somnului
      ca proces natural de regenerare, nu ca luptă sau efort.
    </p>
    <p>
      Practicat constant, acest program ajută la reducerea insomniei, a stresului și a oboselii cronice, sprijinind un
      stil de viață mai echilibrat, cu mai multă claritate, energie și stabilitate emoțională.
    </p>
  </>
);

const enDescription = (
  <>
    <p>
      This program is designed to support the restoration of your natural sleep cycles and reduce the tension that builds
      up in your body and mind throughout the day.
    </p>
    <p>
      The constant pressure to do more, be productive, and stay connected can affect the body’s ability to enter deep
      states of rest.
    </p>
    <p>
      Through guided practices of relaxation, breathing, and mental regulation, you’ll learn to calm your nervous system,
      reduce mental hyperactivity, and create the inner conditions needed for restful sleep.
    </p>
    <p>
      The program is structured over 14 days and includes multiple audio recordings, each supporting sleep as a natural
      process of regeneration—not a fight or an effort.
    </p>
    <p>
      Practiced consistently, this program can help reduce insomnia, stress, and chronic fatigue, supporting a more
      balanced lifestyle with greater clarity, energy, and emotional stability.
    </p>
  </>
);

const flow: Flow = {
  id: "Improve-Sleep",
  position: 8,

  title: { ro: "Somn odihnitor", en: "Improve Sleep" },
  name: { ro: "Somn odihnitor", en: "Improve Sleep" },
  intro: {
    ro: "Creează un ritual stabil care susține somnul natural al corpului tău.",
    en: "Create a steady ritual that supports your body’s natural sleep.",
  },
  description: { ro: roDescription, en: enDescription },
  image: { ro: "/img/flows/somn-odihnitor.webp", en: "/img/flows/somn-odihnitor.webp" },

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,

  totalPractices: 14,
  practices: [
    practice_1,
    practice_2,
    practice_3,
    practice_4,
    practice_5,
    practice_6,
    practice_7,
    practice_8,
    practice_9,
    practice_10,
    practice_11,
    practice_12,
    practice_13,
    practice_14,
  ],
};

export default flow;

