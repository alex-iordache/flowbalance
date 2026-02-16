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
    <p>
      Acest program de 30 de zile este conceput pentru a te ajuta să îți calmezi sistemul nervos și să creezi un obicei
      zilnic de reglare a stresului, chiar și în perioadele aglomerate sau imprevizibile. Prin exerciții ghidate de
      respirație, conștientizare corporală și antrenament al atenției, înveți să reduci reactivitatea, să îți încetinești
      ritmul interior și să revii la o stare de echilibru funcțional. Fiecare înregistrare susține integrarea calmului ca
      răspuns automat, nu ca soluție de moment. Practicat constant, acest program crește reziliența emoțională,
      claritatea mentală și capacitatea de a face față presiunilor zilnice cu mai multă stabilitate și prezență.
    </p>
    <p>
      <strong>30 de zile nu schimbă viața peste noapte. Dar schimbă direcția.</strong> Stresul nu dispare pentru că îl
      ignorăm, ci pentru că învățăm să-l traversăm altfel. Zi după zi. Practica zilnică e ca o piatră pusă la temelia
      unei Rome interioare mai stabile. Nu e despre perfecțiune, ci despre consecvență. Dacă vrei ca ceva să se schimbe
      cu adevărat, începe cu ritualuri zilnice noi. Restul va urma.
    </p>
  </>
);

const enDescription = (
  <>
    <p>
      This 30-day program is designed to help you calm your nervous system and build a daily habit of stress regulation,
      even during busy or unpredictable times. Through guided breathing, body awareness, and attention training, you learn
      to reduce reactivity, slow your inner pace, and return to a state of functional balance. Each recording supports
      integrating calm as an automatic response, not a quick fix. Practiced consistently, this program increases
      emotional resilience, mental clarity, and the ability to meet daily pressures with more stability and presence.
    </p>
    <p>
      <strong>30 days don’t change your life overnight. But they change the direction.</strong> Stress doesn’t go away
      because we ignore it, but because we learn to move through it differently. Day by day. Daily practice is like a
      stone in the foundation of a more stable inner world. It’s not about perfection, but consistency. If you want
      something to really change, start with new daily rituals. The rest will follow.
    </p>
  </>
);

const flow: Flow = {
  id: 'Stress-Soothing',
  position: 30,

  title: { ro: 'Diminuează stresul', en: 'Stress Soothing' },
  name: { ro: 'Diminuează stresul', en: 'Stress Soothing' },
  intro: {
    ro: 'Construiește, pas cu pas, un obicei de calm și reglare emoțională.',
    en: 'Build, step by step, a habit of calm and emotional regulation.',
  },
  description: { ro: roDescription, en: enDescription },
  image: { ro: '/img/flows/stress-soothing.webp', en: '/img/flows/stress-soothing.webp' },

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,

  totalPractices: 30,
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
    practice_15,
    practice_16,
    practice_17,
    practice_18,
    practice_19,
    practice_20,
    practice_21,
    practice_22,
    practice_23,
    practice_24,
    practice_25,
    practice_26,
    practice_27,
    practice_28,
    practice_29,
    practice_30,
  ],
};

export default flow;
