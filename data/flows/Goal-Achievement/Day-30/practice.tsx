import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Într-un final, toate visurile tale dacă ai curajul să te ții de ele. Fiecare mare realizare a fost văzută la început ca fiind ceva imposibil.</p>
    <p>Pentru ziua aceasta fă o listă cu toate realizările pe care le-ai avut de când ai început acest program.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să accesezi copilul interior și să depășești acele anumite blocaje, pentru a elibera noul tu!</p>
  </>
)


const practice: Practice = {
  id: 'Goal-Achievement-Day-30',
  position: 30,
  title: { ro: 'Ziua 30', en: 'Day 30' },
  name: { ro: 'Ziua 30', en: 'Day 30' },
  intro: {
    ro: 'Într-un final, toate visurile tale dacă ai curajul să te ții de ele. Fiecare mare realizare a fost văzută l…',
    en: 'AIT',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/copilul-interior.mp3', en: 'audioFiles/copilul-interior.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
