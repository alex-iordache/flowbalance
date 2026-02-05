import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Cu toţii ne lovim de situaţii stresante sau dificile în viaţa de zi cu zi. Însă, te-ai întrebat vreodată ce anume
      declanşează reacţiile noastre?
    </p>
    <p>
      Pentru ziua aceasta, uită-te la lista de emoții notate în ziua anterioară și trece în dreptul lor ce anume declanșează
      acele emoții (de exemplu, mă simt foarte irascibil/ă atunci când sunt criticat/ă).
    </p>
    <p>
      În fiecare dimineață, când te trezești, înainte să te dai jos din pat (dacă îți vine să mergi la toaletă, o poți face
      și apoi te întorci în pat), numeri în gând de la 100 la 1. Privirea o ții cam la 20 grade în sus față de poziția în
      care privești de obicei. Ochii îi menții închiși. După ce numeri, îți aduci aminte de o perioadă în care corpul tău
      era plin de vitalitate, de sănătate, te vizualizezi cum mergeai atunci.
    </p>
    <p>
      Ascultă această înregistrare audio, care te va ajuta să observi tensiunile înmagazinate la nivelul corpului şi să
      relaxezi zonele tensionate. Dacă adormi înainte să se termine înregistrarea nu este nicio problemă.
    </p>
  </>
);

const practice: Practice = {
  id: 'Inner-Healing-Day-03',
  position: 3,
  title: { ro: 'Ziua 3', en: 'Day 3' },
  name: { ro: 'Ziua 3', en: 'Day 3' },
  intro: {
    ro: 'Declanșatori emoționali + body scan.',
    en: 'Emotional triggers + body scan.',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/body-scan.mp3', en: 'audioFiles/body-scan.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;

