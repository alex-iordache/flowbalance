import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Cheia pentru gestionarea corectă a timpului este vizualizarea valorii fiecărui moment. Cu toții suntem ocupați…întrebarea este: “Pentru ce sau pentru cine suntem ocupați?”</p>
    <p>Pentru ziua aceasta te invit să îți stabilești un interval orar în care nu vrei să fii deranjat/ă (fără telefon, fără email) și să te concentrezi pe ceva important pentru tine, care are legătură cu obiectivul tău principal.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să îți îmbunătățești productivitatea și starea de bine.</p>
  </>
)


const practice: Practice = {
  id: 'Goal-Achievement-Day-14',
  position: 14,
  title: { ro: 'Ziua 14', en: 'Day 14' },
  name: { ro: 'Ziua 14', en: 'Day 14' },
  intro: {
    ro: 'Cheia pentru gestionarea corectă a timpului este vizualizarea valorii fiecărui moment. Cu toții suntem ocup…',
    en: 'AIT',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/incepe-ziua-cu-bucurie.mp3', en: 'audioFiles/incepe-ziua-cu-bucurie.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
