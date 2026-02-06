import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Cheia pentru gestionarea corectă a timpului este vizualizarea valorii fiecărui moment. Cu toții suntem ocupați…întrebarea este: “Pentru ce sau pentru cine suntem ocupați?”</p>
    <p>Pentru ziua aceasta te invit să îți stabilești un interval orar în care nu vrei să fii deranjat/ă (fără telefon, fără email) și să te concentrezi pe ceva important pentru tine, care are legătură cu obiectivul tău principal.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să îți îmbunătățești productivitatea și starea de bine.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      The key to managing time well is recognising the value of each moment. We’re all busy… the question is: “Busy for
      what—or for whom?”
    </p>
    <p>
      For today, set a time window when you don’t want to be disturbed (no phone, no email) and focus on something
      important to you that is connected to your main goal.
    </p>
    <p>
      Listen to this audio recording—it will help you improve your productivity and your sense of wellbeing.
    </p>
  </>
);


const practice: Practice = {
  id: 'Goal-Achievement-Day-14',
  position: 14,
  title: { ro: 'Ziua 14', en: 'Day 14' },
  name: { ro: 'Ziua 14', en: 'Day 14' },
  intro: {
    ro: 'Cheia pentru gestionarea corectă a timpului este vizualizarea valorii fiecărui moment. Cu toții suntem ocup…',
    en: 'Create protected time to focus on what matters for your goal.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/incepe-ziua-cu-bucurie.mp3', en: 'audioFiles/incepe-ziua-cu-bucurie.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
