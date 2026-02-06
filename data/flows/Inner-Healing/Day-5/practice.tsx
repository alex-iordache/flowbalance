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

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      For today, pay attention to your body. Notice which parts you tense when something doesn’t sit well with you (for
      example: someone’s reply to a message, an argument, negative news, etc.). Then take a 2-minute pause and imagine
      that on the inhale you bring relaxation into that area, and on the exhale you release tension. Do this whenever
      this kind of tension shows up.
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
  id: 'Inner-Healing-Day-05',
  position: 5,
  title: { ro: 'Ziua 5', en: 'Day 5' },
  name: { ro: 'Ziua 5', en: 'Day 5' },
  intro: {
    ro: 'Respiră relaxare în zonele încordate.',
    en: 'Breathe relaxation into tension.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/body-scan.mp3', en: 'audioFiles/body-scan.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;

