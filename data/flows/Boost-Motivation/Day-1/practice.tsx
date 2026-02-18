import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Bun găsit,</strong></p>
    <p><strong>Tema zilei:</strong></p>
    <p>
      Astăzi, oprește-te pentru câteva momente și alege cel puțin un singur aspect din viața ta care îți oferă un motiv
      real să mergi mai departe. Poate fi un scop important, o persoană dragă, o contribuție pe care o aduci, un vis
      personal sau un sens care te-a ajutat să treci prin momente dificile. Nu este nevoie să fie ceva măreț sau perfect
      formulat. Alege ceva autentic, care există deja în viața ta.
    </p>
    <p>
      Pe parcursul zilei, ori de câte ori simți oboseală, lipsă de chef sau blocaj, amintește-ți acel motiv ales și
      observă ce se schimbă în corpul tău, fără să te forțezi să faci nimic.
    </p>
    <p>
      Seara, înainte de culcare, ascultă înregistrarea audio a zilei și permite corpului să se reconecteze cu această
      sursă de motivație, exact așa cum apare. Această înregistrare este un exercițiu de reglare emoțională și de
      clarificare a direcției interioare.
    </p>
    <p>
      Practicată constant, ea ajută la reducerea rezistenței interne, crește energia disponibilă pentru acțiune și
      susține o motivație stabilă, bazată pe sens, nu pe presiune sau vinovăție.
    </p>
  </>
);

const enDescription = (
  <>
    <p><strong>Welcome,</strong></p>
    <p><strong>Today’s theme:</strong></p>
    <p>
      Today, pause for a few moments and choose at least one aspect of your life that gives you a real reason to keep
      going. It can be an important goal, a loved one, a contribution you make, a personal dream, or a sense of meaning
      that helped you through difficult times. It doesn’t have to be big or perfectly worded. Choose something
      authentic—something that already exists in your life.
    </p>
    <p>
      Throughout the day, whenever you feel tired, unmotivated, or stuck, remember the reason you chose and notice what
      changes in your body—without forcing yourself to do anything.
    </p>
    <p>
      In the evening, before sleep, listen to today’s audio recording and allow your body to reconnect with this source
      of motivation exactly as it appears. This recording is an exercise in emotional regulation and clarifying your
      inner direction.
    </p>
    <p>
      Practiced consistently, it helps reduce inner resistance, increases the energy available for action, and supports
      stable motivation based on meaning—not pressure or guilt.
    </p>
  </>
);

const practice: Practice = {
  id: "Boost-Motivation-Day-01",
  position: 1,
  title: { ro: "Ziua 1 – Motivație din sens", en: "Day 1 – Motivation from Meaning" },
  name: { ro: "Motivație din sens", en: "Motivation from Meaning" },
  intro: { ro: "Alege un motiv real și lasă corpul să se reconecteze cu energia lui.", en: "Choose a real reason and let your body reconnect with its energy." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/boost-motivation.mp3", en: "audioFilesEnAi/boost-motivation-en.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;

