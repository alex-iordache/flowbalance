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

const practice: Practice = {
  id: 'Inner-Healing-Day-10',
  position: 10,
  title: { ro: 'Ziua 10', en: 'Day 10' },
  name: { ro: 'Ziua 10', en: 'Day 10' },
  intro: {
    ro: 'Ritual zilnic + odihnă.',
    en: 'Daily ritual + rest.',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/redu-disconfortul-fizic.mp3', en: 'audioFiles/redu-disconfortul-fizic.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;

