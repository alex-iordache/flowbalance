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

const practice: Practice = {
  id: 'Inner-Healing-Day-04',
  position: 4,
  title: { ro: 'Ziua 4', en: 'Day 4' },
  name: { ro: 'Ziua 4', en: 'Day 4' },
  intro: {
    ro: 'Emoțiile trec; body scan seara.',
    en: 'Emotions pass; body scan in the evening.',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/body-scan.mp3', en: 'audioFiles/body-scan.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;

