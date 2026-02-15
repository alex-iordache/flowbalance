import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Bun găsit,</strong></p>
    <p>
      Un mic moment de respiro de la tumultul vieţii cotidiene îţi poate aduce mai mult decât crezi. Nu uita, câteodată
      cel mai bun lucru pe care îl poţi face este să nu faci nimic.
    </p>

    <p><strong>Exercițiu:</strong></p>
    <p>
      Pentru ziua aceasta, te invit să răspunzi la următoarea întrebare: „Ce mă ajută ca să mă deconectez de la problemele
      de la serviciu sau, pur și simplu, pentru a mă relaxa?” și să te asiguri că, de acum înainte, pui în practică ceea
      ce ai răspuns aici.
    </p>

    <p className="mt-4">
      Ascultă această înregistrare audio, în maxim 2 ore de la întoarcerea de la serviciu, care te va ajuta să îţi
      relaxezi corpul, mintea şi să obţii o stare de linişte interioară.
    </p>
  </>
);

const enDescription = (
  <>
    <p><strong>Welcome,</strong></p>
    <p>
      A small moment of breathing space from the turbulence of daily life can give you more than you think. Remember:
      sometimes the best thing you can do is to do nothing.
    </p>

    <p><strong>Exercise:</strong></p>
    <p>
      For today, answer this question: “What helps me disconnect from work problems—or simply relax?” Then make sure that
      from now on, you actually put your answer into practice.
    </p>

    <p className="mt-4">
      Listen to today’s audio recording within a maximum of 2 hours after coming home from work. It will help you relax
      your body and mind and reach a state of inner calm.
    </p>
  </>
);

const practice: Practice = {
  id: "Improve-Sleep-Day-04",
  position: 4,
  title: { ro: "Ziua 4", en: "Day 4" },
  name: { ro: "Ziua 4", en: "Day 4" },
  intro: {
    ro: "Creează o tranziție între muncă și seară prin deconectare și relaxare.",
    en: "Create a transition from work to evening through disconnecting and relaxation.",
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/relaxare-prin-respiratie.mp3", en: "audioFilesEnAi/relaxare-prin-respiratie-en.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;

