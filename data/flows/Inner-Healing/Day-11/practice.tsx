import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Fiecare gând sau fiecare emoţie corespunde unei reacţii fizice. O glumă bună îţi poate descreţi fruntea şi te poate face
      să te simţi mai bine, în timp ce o ceartă cu cineva apropiat îţi poate provoca o stare generală proastă, dureri de cap
      sau de stomac.
    </p>
    <p>
      Zilele acestea fii atent/ă la acele aspecte pe care le spui în diferite conversații și care au legătură cu partea fizică.
      De exemplu, mă doare capul de cât a vorbit azi X, mă doare undeva de problema aceasta. Apoi, remarcă dacă există o
      corelație între ceea ce repeți și ceea ce simți fizic, periodic.
    </p>
    <p>
      În fiecare dimineață când te trezești, înainte să te dai jos din pat (dacă îți vine să mergi la toaletă, o poți face și
      apoi te întorci în pat), numeri în gând de la 100 la 1. Privirea o ții cam la 20 grade în sus față de poziția în care
      privești de obicei. Ochii îi menții închiși. După ce numeri, îți aduci aminte de o perioadă în care corpul tău era plin
      de vitalitate, de sănătate, te vizualizezi cum mergeai atunci.
    </p>
    <p>
      Ascultă această înregistrare audio DOAR DACĂ AI O PROBLEMĂ FIZICĂ care are nevoie de sistem imunitar mai bun. Te va ajuta
      să identifici problemele la nivel fizic, cât şi cauzele care le-a produs de la nivel emoţional.
    </p>
  </>
);

const practice: Practice = {
  id: 'Inner-Healing-Day-11',
  position: 11,
  title: { ro: 'Ziua 11', en: 'Day 11' },
  name: { ro: 'Ziua 11', en: 'Day 11' },
  intro: {
    ro: 'Legătura gând–emoție–corp.',
    en: 'Mind–emotion–body link.',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/vindecare.mp3', en: 'audioFiles/vindecare.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;

