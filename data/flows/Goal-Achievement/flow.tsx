import type { Flow } from '../types';

import practice_1 from './Day-1/practice';
import practice_2 from './Day-2/practice';
import practice_3 from './Day-3/practice';
import practice_4 from './Day-4/practice';
import practice_5 from './Day-5/practice';
import practice_6 from './Day-6/practice';
import practice_7 from './Day-7/practice';
import practice_8 from './Day-8/practice';
import practice_9 from './Day-9/practice';
import practice_10 from './Day-10/practice';
import practice_11 from './Day-11/practice';
import practice_12 from './Day-12/practice';
import practice_13 from './Day-13/practice';
import practice_14 from './Day-14/practice';
import practice_15 from './Day-15/practice';
import practice_16 from './Day-16/practice';
import practice_17 from './Day-17/practice';
import practice_18 from './Day-18/practice';
import practice_19 from './Day-19/practice';
import practice_20 from './Day-20/practice';
import practice_21 from './Day-21/practice';
import practice_22 from './Day-22/practice';
import practice_23 from './Day-23/practice';
import practice_24 from './Day-24/practice';
import practice_25 from './Day-25/practice';
import practice_26 from './Day-26/practice';
import practice_27 from './Day-27/practice';
import practice_28 from './Day-28/practice';
import practice_29 from './Day-29/practice';
import practice_30 from './Day-30/practice';

const roDescription = (
  <>
    <p>Dificultățile în atingerea obiectivelor nu apar din lipsă de voință, ci din conflicte interioare, amânare, autosabotaj și pierderea conexiunii cu sensul personal. De multe ori, știi ce ai de făcut, dar ceva te oprește să începi sau să continui. Acest program este creat pentru a te ajuta să îți recapeți direcția, energia și încrederea necesare pentru a acționa consecvent în direcția dorită.</p>
    <p>În acest program lucrezi cu mintea conștientă și inconștientă pentru a identifica ce te blochează, ce resurse ai deja și ce abilități este nevoie să dezvolți pentru a-ți atinge obiectivele. Înveți să reduci amânarea, să gestionezi autosabotajul și să creezi o stare interioară care susține acțiunea, nu evitarea. Accentul este pus pe obiective reale, personale, aliniate cu valorile tale, nu pe presiune sau performanță forțată.</p>
    <p>Pe parcursul celor 30 de zile, exersezi zilnic claritatea intenției, motivația internă și încrederea în propriile resurse. Prin exerciții scurte și înregistrări audio ghidate, îți antrenezi mintea să funcționeze în favoarea ta, să îți susțină deciziile și să creeze stabilitate emoțională în procesul de atingere a obiectivelor. Acest program este conceput pentru a fi parcurs pas cu pas, astfel încât schimbările să fie integrate natural și durabil în viața ta.</p>
  </>
)

const enDescription = (
  <>
    <p>
      Difficulties in reaching your goals don’t come from a lack of willpower, but from inner conflict, procrastination,
      self-sabotage, and losing connection to personal meaning. Often, you know what to do, but something stops you from
      starting or continuing. This program is designed to help you regain direction, energy, and confidence so you can
      act consistently toward what you want.
    </p>
    <p>
      In this program you work with both the conscious and unconscious mind to identify what blocks you, what resources
      you already have, and what skills you need to develop in order to achieve your goals. You’ll learn to reduce
      procrastination, manage self-sabotage, and build an inner state that supports action—not avoidance. The focus is on
      real, personal goals aligned with your values, not pressure or forced performance.
    </p>
    <p>
      Over these 30 days, you’ll practice daily intention clarity, inner motivation, and trust in your own resources.
      Through short exercises and guided audio recordings, you train your mind to work in your favor, support your
      decisions, and create emotional stability throughout the goal-achievement process. This program is designed to be
      followed step by step, so changes integrate naturally and last over time.
    </p>
  </>
);


const flow: Flow = {
  id: 'Goal-Achievement',
  position: 34,

  title: { ro: 'Atingerea obiectivelor', en: 'Goal Achievement' },
  name: { ro: 'Atingerea obiectivelor', en: 'Goal Achievement' },
  intro: {
    ro: 'Construiește claritate, motivație și consecvență pentru a transforma visurile tale în realitate.',
    en: 'Build clarity, motivation, and consistency to turn your dreams into reality.',
  },
  description: { ro: roDescription, en: enDescription },
  image: { ro: '/img/flows/goal-achievement.webp', en: '/img/flows/goal-achievement.webp' },

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,

  totalPractices: 30,
  practices: [
    practice_1, practice_2, practice_3, practice_4, practice_5, practice_6, practice_7, practice_8, practice_9, practice_10, practice_11, practice_12, practice_13, practice_14, practice_15, practice_16, practice_17, practice_18, practice_19, practice_20, practice_21, practice_22, practice_23, practice_24, practice_25, practice_26, practice_27, practice_28, practice_29, practice_30
  ],
};

export default flow;
