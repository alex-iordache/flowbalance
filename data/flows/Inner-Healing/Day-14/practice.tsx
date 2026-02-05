import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Într-un final, priveşte înapoi şi revezi cele mai bune obiceiuri deprinse care vor fi temelia ta, atunci când simţi că
      stresul sau grijile te acaparează. Continuă să le exersezi zilnic, pentru că orice mic câştig a fost la un moment dat,
      un obiectiv greu de atins.
    </p>
    <p>La finalul programului, te rog să te uiți la agenda ta zilnică și să remarci dacă ai introdus în viața ta zilnică:</p>
    <p>– dacă ți-ai pus pauze de relaxare, fără să faci nimic.</p>
    <p>– dacă ai un moment de cel puțin 30 minute în care să râzi.</p>
    <p>– dacă ți-ai ascultat corpul și ai simțit tensiunea.</p>
    <p>– dacă ți-ai propus să faci ceva bun pentru corpul tău.</p>
    <p>– dacă ți-ai propus să te relaxezi înainte de culcare.</p>
    <p>
      De acum înainte în fiecare dimineață când te trezești, înainte să te dai jos din pat (dacă îți vine să mergi la toaletă,
      o poți face și apoi te întorci în pat), numeri în gând de la 50 la 1. Privirea o ții cam la 20 grade în sus față de
      poziția în care privești de obicei. Ochii îi menții închiși. După ce numeri, îți aduci aminte de o perioadă în care
      corpul tău era plin de vitalitate, de sănătate, te vizualizezi cum mergeai atunci.
    </p>
    <p>
      Ascultă această înregistrare audio, care te va ajuta să te deconectezi de la situaţiile stresante din viaţa ta şi să îţi
      recapeţi starea de relaxare. Dacă adormi înainte să se termine înregistrarea nu este nicio problemă.
    </p>
  </>
);

const practice: Practice = {
  id: 'Inner-Healing-Day-14',
  position: 14,
  title: { ro: 'Ziua 14', en: 'Day 14' },
  name: { ro: 'Ziua 14', en: 'Day 14' },
  intro: {
    ro: 'Integrare și ritualuri.',
    en: 'Integration and rituals.',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/deconectare-relaxare-vindecare.mp3', en: 'audioFiles/deconectare-relaxare-vindecare.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;

