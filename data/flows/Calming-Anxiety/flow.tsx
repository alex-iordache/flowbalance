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

const roDescription = (
  <>
    <p>
      Anxietatea apare atunci când mintea și corpul rămân blocate într-o stare de alertă, anticipând pericole care nu sunt
      prezente aici și acum. Acest program de <strong>14 zile de exerciții</strong> este creat pentru a te ajuta să îți
      calmezi sistemul nervos, să reduci reactivitatea emoțională și să construiești treptat o stare internă de siguranță
      și stabilitate. Prin exerciții ghidate zilnice și înregistrări audio special concepute, înveți să observi anxietatea
      fără să te lupți cu ea, să îți reglezi respirația și atenția și să creezi spațiu între stimul și reacție. Practicat
      consecvent, programul te sprijină să reduci frecvența și intensitatea atacurilor de panică, să îți recapeți
      claritatea mentală și să îți dezvolți capacitatea de a face față situațiilor dificile cu mai mult calm, încredere și
      prezență.
    </p>
  </>
);

const enDescription = (
  <>
    <p>
      Anxiety shows up when the mind and body stay stuck in a state of alert, anticipating dangers that aren’t here and
      now. This <strong>14-day program</strong> is designed to help you calm your nervous system, reduce emotional
      reactivity, and gradually build an inner sense of safety and stability. Through daily guided exercises and
      specially designed audio recordings, you learn to notice anxiety without fighting it, regulate your breathing and
      attention, and create space between trigger and reaction. Practiced consistently, the program supports you in
      reducing the frequency and intensity of panic attacks, regaining mental clarity, and facing difficult situations
      with more calm, confidence, and presence.
    </p>
  </>
);

const flow: Flow = {
  id: 'Calming-Anxiety',
  position: 31,

  title: { ro: 'Calmarea anxietății', en: 'Calming Anxiety' },
  name: { ro: 'Calmarea anxietății', en: 'Calming Anxiety' },
  intro: {
    ro: 'Conștientizează. Reglează. Recapătă-ți calmul interior.',
    en: 'Become aware. Regulate. Regain your inner calm.',
  },
  description: { ro: roDescription, en: enDescription },
  image: { ro: '/img/flows/calming-anxiety.webp', en: '/img/flows/calming-anxiety.webp' },

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
