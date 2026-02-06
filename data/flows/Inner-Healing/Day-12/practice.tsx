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

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      A small break from the turmoil of everyday life can bring you more than you think. Remember: sometimes the best
      thing you can do is to do nothing.
    </p>
    <p>Today, I’m proposing an exercise to stimulate the two hemispheres of the brain.</p>
    <p>
      <strong>Stage 1</strong>
    </p>
    <p>
      Draw a circle in the air with your left hand and a square with your right hand. Do this simultaneously with both
      hands.
    </p>
    <p>
      When it becomes easy, switch the tasks between your hands. With your right hand drawing a circle, draw it in the
      opposite direction compared to how you drew it with your left hand.
    </p>
    <p>Continue alternating until it feels easy.</p>
    <p>
      <strong>Stage 2</strong>
    </p>
    <p>Stand up and raise one knee until it meets the opposite hand.</p>
    <p>Lower the knee and repeat with the other knee.</p>
    <p>
      Keep alternating between knees, but change the speed (very, very slow, then very, very fast).
    </p>
    <p>Do the same exercise with your eyes closed.</p>
    <p>
      Every morning when you wake up—before getting out of bed (if you need to use the bathroom, you can do that and then
      come back)—count in your mind from 100 down to 1. Keep your gaze about 20 degrees upward compared to your usual
      position, with your eyes closed. After you finish counting, remember a time when your body felt full of vitality
      and health, and visualise yourself walking as you did then.
    </p>
    <p>
      Listen to this audio recording ONLY IF you have a physical issue that needs a stronger immune system. It will help
      you identify physical problems and the emotional causes behind them.
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
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/vindecare.mp3', en: 'audioFiles/vindecare.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;

