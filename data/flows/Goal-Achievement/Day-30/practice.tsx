import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Într-un final, toate visurile tale dacă ai curajul să te ții de ele. Fiecare mare realizare a fost văzută la început ca fiind ceva imposibil.</p>
    <p>Pentru ziua aceasta fă o listă cu toate realizările pe care le-ai avut de când ai început acest program.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să accesezi copilul interior și să depășești acele anumite blocaje, pentru a elibera noul tu!</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      In the end, all your dreams can become real if you have the courage to stay with them. Every great achievement was
      once seen as something impossible.
    </p>
    <p>
      For today, make a list of all the accomplishments you’ve had since you started this program.
    </p>
    <p>
      Listen to this audio recording—it will help you connect with your inner child and move through certain blocks, so
      you can free the new you.
    </p>
  </>
);


const practice: Practice = {
  id: 'Goal-Achievement-Day-30',
  position: 30,
  title: { ro: 'Ziua 30', en: 'Day 30' },
  name: { ro: 'Ziua 30', en: 'Day 30' },
  intro: {
    ro: 'Într-un final, toate visurile tale dacă ai curajul să te ții de ele. Fiecare mare realizare a fost văzută l…',
    en: 'Celebrate your progress: list your accomplishments from this program.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/copilul-interior.mp3', en: 'audioFiles/copilul-interior.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
