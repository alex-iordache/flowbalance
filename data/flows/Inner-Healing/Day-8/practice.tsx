import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Pentru ziua aceasta, te invit să realizezi o listă cu toate organele pe care le simți ca fiind sănătoase. Mulțumește-le
      că își fac atât de bine treaba.
    </p>
    <p>
      În fiecare dimineață când te trezești, înainte să te dai jos din pat (dacă îți vine să mergi la toaletă, o poți face și
      apoi te întorci în pat), numeri în gând de la 100 la 1. Privirea o ții cam la 20 grade în sus față de poziția în care
      privești de obicei. Ochii îi menții închiși. După ce numeri, îți aduci aminte de o perioadă în care corpul tău era plin
      de vitalitate, de sănătate, te vizualizezi cum mergeai atunci.
    </p>
    <p>
      Ascultă seara această înregistrare audio, care te poate ajuta să reduci disconfortul fizic resimţit în corp. Dacă adormi
      înainte să se termine înregistrarea nu este nicio problemă.
    </p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      For today, make a list of all the organs you feel are healthy. Thank them for doing their work so well.
    </p>
    <p>
      Every morning when you wake up—before getting out of bed (if you need to use the bathroom, you can do that and then
      come back)—count in your mind from 100 down to 1. Keep your gaze about 20 degrees upward compared to your usual
      position, with your eyes closed. After you finish counting, remember a time when your body felt full of vitality
      and health, and visualise yourself walking as you did then.
    </p>
    <p>
      In the evening, listen to this audio recording—it can help reduce physical discomfort you feel in the body. If you
      fall asleep before the recording ends, that’s perfectly fine.
    </p>
  </>
);

const practice: Practice = {
  id: 'Inner-Healing-Day-08',
  position: 8,
  title: { ro: 'Ziua 8', en: 'Day 8' },
  name: { ro: 'Ziua 8', en: 'Day 8' },
  intro: {
    ro: 'Recunoștință pentru organele sănătoase.',
    en: 'Gratitude for healthy organs.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/redu-disconfortul-fizic.mp3', en: 'audioFiles/redu-disconfortul-fizic.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;

