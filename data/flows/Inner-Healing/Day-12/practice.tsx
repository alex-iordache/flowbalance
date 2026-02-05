import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Un mic moment de respiro de la tumultul vieţii cotidiene îţi poate aduce mai mult decât crezi. Nu uita, câteodată cel mai
      bun lucru pe care îl poţi face este să nu faci nimic.
    </p>
    <p>Astăzi, îți propun un exercițiu pentru stimularea celor două emisfere ale creierului.</p>
    <p>
      <strong>Etapa 1</strong>
    </p>
    <p>
      Conturează în aer cu mâna stângă un cerc, iar cu mâna dreaptă un pătrat. Fă acest lucru simultan cu ambele mâini.
    </p>
    <p>
      Atunci când simți că a devenit ușor să faci primul exercițiu, schimbă taskurile între cele două mâini. Mâna dreaptă în
      timp ce face acum un cerc, te rog să îl faci în sens invers față de cum l-ai făcut cu mâna stângă.
    </p>
    <p>Continuă să alternezi taskurile, până simți că o faci cu ușurință.</p>
    <p>
      <strong>Etapa 2</strong>
    </p>
    <p>
      Te rog să stai în picioare și ridică un genunchi până întâlnește mâna opusă.
    </p>
    <p>Lasă genunchiul jos și repetă exercițiul cu celălalt genunchi.</p>
    <p>
      Continuă să alternezi exercițiul între cei doi genunchi, însă schimbă vitezele (faci când foarte, foarte încet, când
      foarte, foarte rapid).
    </p>
    <p>Fă același exercițiu de la punctul 3 cu ochii închiși.</p>
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
  id: 'Inner-Healing-Day-12',
  position: 12,
  title: { ro: 'Ziua 12', en: 'Day 12' },
  name: { ro: 'Ziua 12', en: 'Day 12' },
  intro: {
    ro: 'Exerciții pentru emisferele creierului.',
    en: 'Brain hemisphere exercises.',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/vindecare.mp3', en: 'audioFiles/vindecare.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;

