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

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Every thought and every emotion corresponds to a physical reaction. A good joke can soften your forehead and make
      you feel better, while an argument with someone close can leave you feeling low, with headaches or stomach aches.
    </p>
    <p>
      These days, pay attention to the phrases you say in conversations that relate to the physical body. For example:
      “My head hurts from how much X talked today”, “I don’t care about this problem.” Then notice whether there is a
      correlation between what you repeat and what you feel physically, over time.
    </p>
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
  id: 'Inner-Healing-Day-11',
  position: 11,
  title: { ro: 'Ziua 11', en: 'Day 11' },
  name: { ro: 'Ziua 11', en: 'Day 11' },
  intro: {
    ro: 'Legătura gând–emoție–corp.',
    en: 'Mind–emotion–body link.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/vindecare.mp3', en: 'audioFiles/vindecare.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;

