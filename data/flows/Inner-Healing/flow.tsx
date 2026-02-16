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
      Inner Healing este un program ghidat de reconectare profundă cu corpul, conceput pentru a susține reglarea fizică și
      emoțională prin ascultare, prezență și relaxare conștientă.
    </p>
    <p>
      De multe ori, corpul începe să vorbească prin tensiuni, dureri sau oboseală atunci când ritmul vieții depășește
      capacitatea noastră de adaptare. Acest program te ajută să încetinești, să observi mesajele corpului și să creezi un
      spațiu sigur în care mintea și corpul pot colabora, nu lupta.
    </p>
    <p>
      Prin exerciții audio scurte și practici zilnice simple, înveți să reduci tensiunile fizice, să influențezi starea
      corpului prin atenție și respirație și să recunoști impactul emoțiilor și gândurilor asupra sănătății tale. Inner
      Healing nu este despre „a forța vindecarea”, ci despre a sprijini procesele naturale ale corpului prin relaxare,
      claritate și auto-compasiune.
    </p>
    <p>
      Programul se desfășoară pe 14 zile, fiecare zi incluzând o lecție scurtă de conștientizare și o înregistrare audio
      care te ghidează în conectarea cu diferite zone ale corpului și cu stările asociate acestora. Practicat consecvent,
      acest flow susține un stil de viață mai echilibrat, crește nivelul de energie și contribuie la o relație mai sănătoasă
      și mai respectuoasă cu propriul corp, ca partener esențial de viață.
    </p>
  </>
);

const enDescription = (
  <>
    <p>
      Inner Healing is a guided program for deep reconnection with the body, designed to support physical and emotional
      regulation through listening, presence, and conscious relaxation.
    </p>
    <p>
      Often, the body starts speaking through tension, pain, or fatigue when the pace of life exceeds our capacity to
      adapt. This program helps you slow down, notice the body’s messages, and create a safe space where mind and body
      can collaborate—rather than fight.
    </p>
    <p>
      Through short audio exercises and simple daily practices, you learn to reduce physical tension, influence your
      state through attention and breath, and recognise the impact of emotions and thoughts on your health. Inner Healing
      is not about “forcing healing”, but about supporting the body’s natural processes through relaxation, clarity, and
      self-compassion.
    </p>
    <p>
      The program unfolds over 14 days. Each day includes a short awareness lesson and an audio recording that guides you
      in connecting with different areas of the body and the states associated with them. Practiced consistently, this
      flow supports a more balanced lifestyle, increases energy, and contributes to a healthier, more respectful
      relationship with your own body—as an essential life partner.
    </p>
  </>
);

const flow: Flow = {
  id: 'Inner-Healing',
  position: 33,

  title: { ro: 'Vindecare interioară', en: 'Inner Healing' },
  name: { ro: 'Vindecare interioară', en: 'Inner Healing' },
  intro: {
    ro: 'Reconectează-te cu corpul tău ca aliat, nu ca problemă de rezolvat.',
    en: 'Reconnect with your body as an ally, not a problem to fix.',
  },
  description: { ro: roDescription, en: enDescription },
  image: { ro: '/img/flows/inner-healing.webp', en: '/img/flows/inner-healing.webp' },

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

