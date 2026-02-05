import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Pentru ziua aceasta, acordă atenție corpului tău, remarcă părțile pe care le încordezi atunci când ceva nu îți convine
      (de exemplu răspunsul cuiva la un mesaj, o discuție în contradictoriu, o știre negativă, etc.). Apoi, ia o pauză de 2
      minute și imaginează-ți că pe inspir aduci relaxare în acel punct și pe expir scoți tensiune. Fă acest lucru ori de
      câte ori apar încordări de acest gen.
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
  id: 'Inner-Healing-Day-05',
  position: 5,
  title: { ro: 'Ziua 5', en: 'Day 5' },
  name: { ro: 'Ziua 5', en: 'Day 5' },
  intro: {
    ro: 'Respiră relaxare în zonele încordate.',
    en: 'Breathe relaxation into tension.',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/body-scan.mp3', en: 'audioFiles/body-scan.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;

