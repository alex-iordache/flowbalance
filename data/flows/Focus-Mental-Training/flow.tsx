import type { Flow } from '../types';
import practice_1 from './Story-1/practice';

const roDescription = (
  <>
    <p>
      Această secțiune conține mai multe înregistrări pentru pregătirea mentală înainte de teze, examene, concursuri
      sportive, audiții sau prezentări. Prin vizualizare ghidată și exerciții de respirație, copilul învață să reducă
      anxietatea anticipatorie și să activeze o stare de concentrare calmă.
    </p>
    <p>
      Practicile susțin dezvoltarea încrederii în propriile resurse și reduc blocajele generate de frica de evaluare.
      Copilul învață să transforme emoția intensă în energie utilă pentru performanță. Este o secțiune pentru copii
      între 3–10 ani.
    </p>
    <p>
      <strong>Bun găsit,</strong>
    </p>
    <p>
      <strong>Tema zilei:</strong> Alege un eveniment concret care urmează (teză, competiție, evaluare). În această
      secțiune vei găsi mai multe titluri adaptate diferitelor situații. Selectează înregistrarea care se potrivește
      cel mai bine contextului copilului. Recomandarea este să fie ascultată zilnic, în perioada premergătoare
      evenimentului, pentru a consolida un tipar mental de siguranță, claritate și concentrare.
    </p>
    <p>
      După ascultare ai putea să îi propui următoarele teme de reflecție: Cum arată versiunea ta calmă înainte de
      examen? Ce ar spune ea dacă ar putea să te încurajeze? Unde simți în corp curajul?
    </p>
    <p>
      Puteți crea împreună un „buton imaginar" sau un „gest secret" pe care copilul să îl activeze înainte de situația
      importantă. Întreabă-l: „Ce ar trebui să adăugăm în poveste ca să fie exact ca pentru tine?" Astfel personalizează
      scenariul mental și îl internalizează mai profund.
    </p>
    <p>
      La final, îl poți întreba: „Ce vrei să ții minte din povestea de azi?" Nu îi oferi tu concluzia. Lasă-l să o
      formuleze. Apoi poți închide cu o propoziție simplă: „Sunt aici cu tine. Orice emoție apare, o putem înțelege
      împreună."
    </p>
  </>
);

const enDescription = (
  <>
    <p>
      This section contains several recordings for mental preparation before tests, exams, sports competitions,
      auditions, or presentations. Through guided visualization and breathing exercises, your child learns to reduce
      anticipatory anxiety and activate a calm, focused state.
    </p>
    <p>
      The practices support confidence in their own resources and reduce blocks created by fear of evaluation. Your
      child learns to turn intense emotion into useful energy for performance. It is designed for children aged 3–10.
    </p>
    <p>
      <strong>Welcome,</strong>
    </p>
    <p>
      <strong>Today's theme:</strong> Choose a concrete upcoming event (test, competition, evaluation). In this section
      you will find several titles adapted to different situations. Select the recording that best fits your child's
      context. It is recommended to listen daily in the period before the event, to build a mental pattern of safety,
      clarity, and concentration.
    </p>
    <p>
      After listening, you could suggest these reflection themes: What does your calm version look like before the
      exam? What would they say if they could encourage you? Where in your body do you feel courage?
    </p>
    <p>
      You can create together an „imaginary button" or „secret gesture" that your child can activate before the
      important situation. Ask them: „What should we add to the story so it's exactly right for you?" This way they
      personalize the mental scenario and internalize it more deeply.
    </p>
    <p>
      At the end, you can ask: „What do you want to remember from today's story?" Don't give them the conclusion. Let
      them form it. Then you can close with a simple sentence: „I'm here with you. Whatever emotion appears, we can
      understand it together."
    </p>
  </>
);

const flow: Flow = {
  id: 'Focus-Mental-Training',
  position: 37,

  title: { ro: 'Pregătire Mentală pentru Situații Importante', en: 'Focus & Mental Training' },
  name: { ro: 'Pregătire Mentală pentru Situații Importante', en: 'Focus & Mental Training' },
  intro: {
    ro: 'Construiește o stare mentală stabilă pentru teze, examene și competiții.',
    en: 'Build a stable mental state for tests, exams, and competitions.',
  },
  description: { ro: roDescription, en: enDescription },
  image: { ro: '/img/flows/focus-and-mental-training.webp', en: '/img/flows/focus-and-mental-training.webp' },

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,

  totalPractices: 1,
  practices: [practice_1],
};

export default flow;
