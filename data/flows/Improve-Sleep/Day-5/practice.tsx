import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Bun găsit,</strong></p>
    <p>
      Efectele muzicii asupra oamenilor nu se rezumă doar la plăcerea de a savura frumusețea acestei arte. Cercetătorii au
      descoperit faptul că muzica are numeroase beneficii pentru sănătate, poate schimba radical starea de spirit şi poate
      crește randamentul concentrării, eliberând totodată organismul de efectele nocive ale stresului.
    </p>

    <p><strong>Exercițiu:</strong></p>
    <p>
      Pentru ziua aceasta, te rog să găsești o melodie instrumentală care îți place ție foarte tare, să te întinzi și să o
      asculți la căști. În timp ce faci asta, remarcă ce stări îți induce, cum se simt diferite părți din corpul tău,
      ascultând această melodie.
    </p>

    <p className="mt-4">
      Ascultă această înregistrare audio, care te va ajuta să îţi relaxezi corpul şi mintea şi să obţii o stare de linişte
      interioară.
    </p>
  </>
);

const enDescription = (
  <>
    <p><strong>Welcome,</strong></p>
    <p>
      The effects of music go beyond the pleasure of enjoying art. Researchers have found that music has many health
      benefits—it can change mood and can improve focus, while also helping the body release the harmful effects of stress.
    </p>

    <p><strong>Exercise:</strong></p>
    <p>
      For today, find an instrumental song you really like. Lie down and listen to it with headphones. As you listen,
      notice what states it creates in you and how different parts of your body feel.
    </p>

    <p className="mt-4">
      Listen to today’s audio recording. It will help you relax your body and mind and reach a state of inner calm.
    </p>
  </>
);

const practice: Practice = {
  id: "Improve-Sleep-Day-05",
  position: 5,
  title: { ro: "Ziua 5", en: "Day 5" },
  name: { ro: "Ziua 5", en: "Day 5" },
  intro: {
    ro: "Folosește muzica pentru a-ți regla starea și a te relaxa înainte de somn.",
    en: "Use music to regulate your state and relax before sleep.",
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/relaxare-prin-respiratie.mp3", en: "audioFiles/relaxare-prin-respiratie.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;

