import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Dacă în ziua precedentă, ai identificat calităţile pe care le aveai deja disponibile, astăzi vom trece la următorul pas: dezvoltarea sau îmbunătăţirea unei calităţi.</p>
    <p>Pentru ziua aceasta identifică o calitate pe care ai nevoie să o îmbunătățești sau pe care trebuie să ți-o însușești ca să-ți atingi obiectivul cel mai important.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să dezvolţi acea calitate, de care simţi că ai nevoie pentru a înainta în atingerea visului tău.</p>
  </>
)


const practice: Practice = {
  id: 'Goal-Achievement-Day-10',
  position: 10,
  title: { ro: 'Ziua 10', en: 'Day 10' },
  name: { ro: 'Ziua 10', en: 'Day 10' },
  intro: {
    ro: 'Dacă în ziua precedentă, ai identificat calităţile pe care le aveai deja disponibile, astăzi vom trece la u…',
    en: 'AIT',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/calitatea-de-care-ai-nevoie.mp3', en: 'audioFiles/calitatea-de-care-ai-nevoie.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
