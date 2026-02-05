import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Una dintre cele mai liniștitoare activități din punct de vedere mental și fizic, este să fim conștienți de o activitate
      pe care o facem în mod reflex.
    </p>
    <p>
      De aceea, azi îţi propun să realizezi mișcarea prin casă sau pe stradă fiind conștientă de ea. În timp ce mergi, în
      ritmul tău obișnuit, simte cum se mișcă picioarele, simte contactul piciorului cu suprafața pe care calcă, flexiunea
      genunchiului, mișcările coapselor, șoldurilor. Simte pe rând ce se întâmplă pe partea stângă, apoi pe partea dreaptă.
      Simte dacă ai senzații de greutate în picioare, sau de lejeritate, simte căldura corpului în timp ce mergi, auzi
      mișcările pe care le faci.
    </p>
    <p>
      Acest mod de a deveni conștient de corpul tău, te deconectează de la gândurile obositoare, te ajută să descoperi
      minunăția corpului care funcționează atât de sincronizat. Această activitate relaxează mintea și te pune să fii mai în
      contact cu propriul corp.
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
  id: 'Inner-Healing-Day-09',
  position: 9,
  title: { ro: 'Ziua 9', en: 'Day 9' },
  name: { ro: 'Ziua 9', en: 'Day 9' },
  intro: {
    ro: 'Mers conștient + audio seara.',
    en: 'Conscious walking + evening audio.',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/redu-disconfortul-fizic.mp3', en: 'audioFiles/redu-disconfortul-fizic.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;

