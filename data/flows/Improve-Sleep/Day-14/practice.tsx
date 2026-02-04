import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Bun găsit,</strong></p>
    <p>La finalul programului, te rog să te uiți la agenda ta zilnică și să remarci dacă ai introdus în viața ta zilnică:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>pauze de relaxare, fără să faci nimic;</li>
      <li>un moment de cel puțin 30 de minute în care să râzi;</li>
      <li>dacă ți-ai ascultat corpul și ai simțit tensiunea;</li>
      <li>dacă ți-ai propus să te relaxezi înainte de culcare;</li>
      <li>
        dacă ai revizuit o parte din comportamentele care nu ajută la un somn odihnitor (de ex.: alcool înainte de culcare,
        exerciții fizice intense etc.);
      </li>
      <li>dacă respecți ora de culcare în fiecare seară.</li>
    </ul>

    <p className="mt-4">
      Te rog să faci o listă cu aspectele pe care le-ai îmbunătățit în viața ta în ultimele 2 săptămâni. Stabilește un
      ritual înainte de culcare care te ajută pe tine; poți alege o parte din exercițiile care ți-au mers ție cel mai tare
      la suflet.
    </p>

    <p className="mt-4">
      Ascultă această înregistrare audio, care te va ajuta să te deconectezi de la situaţiile stresante din viaţa ta şi să
      îţi recapeţi starea de relaxare.
    </p>
  </>
);

const enDescription = (
  <>
    <p><strong>Welcome,</strong></p>
    <p>At the end of the program, look at your daily schedule and notice whether you’ve added any of the following:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>relaxation breaks where you do nothing;</li>
      <li>at least 30 minutes where you laugh;</li>
      <li>listening to your body and noticing tension;</li>
      <li>intentionally relaxing before bedtime;</li>
      <li>
        reviewing behaviors that don’t support restful sleep (e.g., alcohol before bed, intense physical exercise, etc.);
      </li>
      <li>keeping your bedtime consistently each night.</li>
    </ul>

    <p className="mt-4">
      Make a list of the things you’ve improved in your life over the last two weeks. Set a pre-sleep ritual that works
      for you—you can choose the exercises that resonated most with you.
    </p>

    <p className="mt-4">
      Listen to today’s audio recording. It will help you disconnect from stressful situations and regain a relaxed
      state.
    </p>
  </>
);

const practice: Practice = {
  id: "Improve-Sleep-Day-14",
  position: 14,
  title: { ro: "Ziua 14", en: "Day 14" },
  name: { ro: "Ziua 14", en: "Day 14" },
  intro: {
    ro: "Integrează ce ai învățat și finalizează cu un ritual care funcționează pentru tine.",
    en: "Integrate what you learned and finish with a ritual that works for you.",
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: {
    ro: "audioFiles/deconectare-relaxare-vindecare-gradina-cunoasterii.mp3",
    en: "audioFiles/deconectare-relaxare-vindecare-gradina-cunoasterii.mp3",
  },

  finished: false,
  lastPositionSec: 0,
};

export default practice;

