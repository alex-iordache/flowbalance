import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Pentru ziua aceasta, fă pauze de cel puțin cinci ori în care să scanezi timp de 5 minute corpul și, pur și simplu, să remarci cum se simte.</p>
    <p>
      În fiecare dimineață când te trezești, înainte să te dai jos din pat (dacă îți vine să mergi la toaletă, o poți face și
      apoi te întorci în pat), numeri în gând de la 100 la 1. Privirea o ții cam la 20 grade în sus față de poziția în care
      privești de obicei. Ochii îi menții închiși. După ce numeri, îți aduci aminte de o perioadă în care corpul tău era plin
      de vitalitate, de sănătate, te vizualizezi cum mergeai atunci.
    </p>
    <p>
      Ascultă seara această înregistrare audio, care te va ajuta să te conectezi cu propriile emoţii. Dacă adormi înainte să
      se termine înregistrarea nu este nicio problemă.
    </p>
  </>
);

const practice: Practice = {
  id: 'Inner-Healing-Day-07',
  position: 7,
  title: { ro: 'Ziua 7', en: 'Day 7' },
  name: { ro: 'Ziua 7', en: 'Day 7' },
  intro: {
    ro: '5 pauze de body scan.',
    en: 'Five short body scans.',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/conectarea-la-propriile-emotii.mp3', en: 'audioFiles/conectarea-la-propriile-emotii.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;

