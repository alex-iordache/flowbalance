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

// Use "AIT" placeholder so English UI falls back to Romanian until translated.
const enDescription = 'AIT';

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
  image: { ro: '/img/flows/inner-healing.png', en: '/img/flows/inner-healing.png' },
  comingSoon: true,

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

