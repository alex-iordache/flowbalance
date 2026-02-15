import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Pentru ziua aceasta, adu-ți aminte faptul că emoțiile sunt stări care nu durează mai mult de 2 minute. Ceea ce le face
      să persiste, sunt de fapt gândurile noastre, mintea noastră care tot repetă aceeași situație care nu ne-a deranjat.
    </p>
    <p>
      În fiecare dimineață când te trezești, înainte să te dai jos din pat (dacă îți vine să mergi la toaletă, o poți face și
      apoi te întorci în pat), numeri în gând de la 100 la 1. Privirea o ții cam la 20 grade în sus față de poziția în care
      privești de obicei. Ochii îi menții închiși. După ce numeri, îți aduci aminte de o perioadă în care corpul tău era plin
      de vitalitate, de sănătate, te vizualizezi cum mergeai atunci.
    </p>
    <p>
      Ascultă această înregistrare audio seara, care te va ajuta să observi tensiunile înmagazinate la nivelul corpului şi
      să relaxezi zonele tensionate.
    </p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      For today, remember that emotions are states that don’t last longer than about two minutes. What makes them
      persist is our thinking—our mind repeating the same situation again and again.
    </p>
    <p>
      Every morning when you wake up—before getting out of bed (if you need to use the bathroom, you can do that and then
      come back)—count in your mind from 100 down to 1. Keep your gaze about 20 degrees upward compared to your usual
      position, with your eyes closed. After you finish counting, remember a time when your body felt full of vitality
      and health, and visualise yourself walking as you did then.
    </p>
    <p>
      In the evening, listen to this audio recording—it will help you notice tension stored in the body and relax tense
      areas.
    </p>
  </>
);

const practice: Practice = {
  id: 'Inner-Healing-Day-04',
  position: 4,
  title: { ro: 'Ziua 4', en: 'Day 4' },
  name: { ro: 'Ziua 4', en: 'Day 4' },
  intro: {
    ro: 'Emoțiile trec; body scan seara.',
    en: 'Emotions pass; body scan in the evening.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/body-scan.mp3', en: 'audioFilesEnAi/body-scan-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;

