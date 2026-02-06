import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Un mic moment de respiro de la tumultul vieţii cotidiene îţi poate aduce mai mult decât crezi. Câteodată cel mai bun
      lucru pe care îl poţi face este să nu faci nimic.
    </p>
    <p>
      Pentru ziua aceasta, stabilește un ritual zilnic de care să te ții. Stabilește aceleași ore de culcare, aceleași ore de
      masă, aceleași ore la care să faci exerciții fizice. Seara cu 2h înainte răsfață-te, fă activități care te relaxează.
      Asigură-te că ai un somn odihnitor.
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
      A small break from the turmoil of everyday life can bring you more than you think. Sometimes the best thing you can
      do is to do nothing.
    </p>
    <p>
      For today, set a daily ritual you can keep. Choose consistent bedtimes, mealtimes, and times for physical exercise.
      In the evening—two hours before sleep—treat yourself and do activities that relax you. Make sure you get restful
      sleep.
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
  id: 'Inner-Healing-Day-10',
  position: 10,
  title: { ro: 'Ziua 10', en: 'Day 10' },
  name: { ro: 'Ziua 10', en: 'Day 10' },
  intro: {
    ro: 'Ritual zilnic + odihnă.',
    en: 'Daily ritual + rest.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/redu-disconfortul-fizic.mp3', en: 'audioFiles/redu-disconfortul-fizic.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;

