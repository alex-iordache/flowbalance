import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Dacă în ziua precedentă, ai identificat calităţile pe care le aveai deja disponibile, astăzi vom trece la următorul pas: dezvoltarea sau îmbunătăţirea unei calităţi.</p>
    <p>Pentru ziua aceasta identifică o calitate pe care ai nevoie să o îmbunătățești sau pe care trebuie să ți-o însușești ca să-ți atingi obiectivul cel mai important.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să dezvolţi acea calitate, de care simţi că ai nevoie pentru a înainta în atingerea visului tău.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      If yesterday you identified the qualities you already have available, today we move to the next step: developing
      or improving a quality.
    </p>
    <p>
      For today, identify one quality you need to improve—or that you need to build—in order to reach your most
      important goal.
    </p>
    <p>
      Listen to this audio recording—it will help you develop the quality you feel you need in order to keep moving
      forward toward your goal.
    </p>
  </>
);


const practice: Practice = {
  id: 'Goal-Achievement-Day-10',
  position: 10,
  title: { ro: 'Ziua 10', en: 'Day 10' },
  name: { ro: 'Ziua 10', en: 'Day 10' },
  intro: {
    ro: 'Dacă în ziua precedentă, ai identificat calităţile pe care le aveai deja disponibile, astăzi vom trece la u…',
    en: 'Choose one key quality to develop or strengthen.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/calitatea-de-care-ai-nevoie.mp3', en: 'audioFilesEnAi/calitatea-de-care-ai-nevoie-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
