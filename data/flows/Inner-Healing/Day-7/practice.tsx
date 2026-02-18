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

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      For today, take at least five pauses where you scan your body for 5 minutes and simply notice how it feels.
    </p>
    <p>
      Every morning when you wake up—before getting out of bed (if you need to use the bathroom, you can do that and then
      come back)—count in your mind from 100 down to 1. Keep your gaze about 20 degrees upward compared to your usual
      position, with your eyes closed. After you finish counting, remember a time when your body felt full of vitality
      and health, and visualise yourself walking as you did then.
    </p>
    <p>
      In the evening, listen to this audio recording—it will help you connect with your emotions. If you fall asleep
      before the recording ends, that’s perfectly fine.
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
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/conectarea-la-propriile-emotii.mp3', en: 'audioFilesEnAi/conectarea-la-propriile-emotii-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;

