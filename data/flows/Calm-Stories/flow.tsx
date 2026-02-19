import type { Flow } from '../types';
import practice_1 from './Story-1/practice';
import practice_2 from './Story-2/practice';
import practice_3 from './Story-3/practice';

const roDescription = (
  <>
    <p>
      Calm Stories este o colecție de povești audio create special pentru relaxarea profundă de seară și pregătirea
      naturală a corpului pentru somn. Aceste narațiuni nu sunt orientate spre insight sau analiză, ci spre încetinire,
      siguranță și detensionare progresivă a sistemului nervos. Ritmul este lent, vocea este caldă, iar imaginile evocate
      sunt simple, line și reconfortante, astfel încât mintea să poată renunța treptat la agitația zilei.
    </p>
    <p>
      Fiecare poveste te conduce într-un spațiu imaginar sigur — pe malul mării, într-o cabană liniștită, într-o pădure
      calmă sau într-un loc simbolic de refugiu interior — unde nu există nimic de rezolvat și nimic de demonstrat. Pe
      măsură ce asculți, respirația se reglează natural, gândurile devin mai rare, iar corpul începe să elibereze
      tensiunea acumulată. Nu este nevoie să „încerci să adormi” — somnul apare ca o consecință firească a relaxării.
    </p>
    <p>
      Calm Stories pot fi ascultate în fiecare seară, devenind un ritual stabil care semnalează creierului că ziua s-a
      încheiat. Practicate consecvent, aceste povești contribuie la reducerea insomniei de adormire, la scăderea
      hiperactivității mentale și la crearea unui tipar de somn mai constant și mai odihnitor. Ele nu oferă soluții
      cognitive, ci un cadru senzorial și emoțional care permite minții să se desprindă ușor și să alunece natural spre
      odihnă.
    </p>
  </>
);
const enDescription = (
  <>
    <p>
      Calm Stories is a collection of audio stories created for deep evening relaxation and for preparing your body
      naturally for sleep. These narratives are not focused on insight or analysis, but on slowing down, safety, and the
      gradual release of nervous system tension. The pace is gentle, the voice is warm, and the imagery is simple and
      soothing—so your mind can gradually let go of the day.
    </p>
    <p>
      Each story guides you into a safe inner landscape—by the sea, in a quiet cabin, in a calm forest, or in a symbolic
      place of refuge—where there is nothing to fix and nothing to prove. As you listen, your breathing naturally
      steadies, thoughts become quieter, and your body begins to release accumulated tension. There is no need to “try to
      fall asleep”—sleep arrives as a natural result of relaxation.
    </p>
    <p>
      Calm Stories can be listened to every evening, becoming a stable ritual that signals to your brain that the day is
      complete. Practiced consistently, these stories can reduce sleep-onset insomnia, calm mental overactivity, and
      support a more stable, restorative sleep pattern. They don’t offer cognitive solutions—rather, they create a
      sensory and emotional container that helps the mind unwind and drift naturally into rest.
    </p>
  </>
);


const flow: Flow = {
  id: "Calm-Stories",
  position: 22,

  title: { ro: "Povești pentru relaxare", en: "Calm Stories" },
  name: { ro: "Povești pentru relaxare", en: "Calm Stories" },
  intro: {
    ro: "O poveste blândă îți poate liniști mintea mai profund decât orice explicație.",
    en: "A gentle story can calm your mind more deeply than any explanation.",
  },
  description: { ro: roDescription, en: enDescription },
  image: { ro: "/img/flows/calm-stories.webp", en: "/img/flows/calm-stories.webp" },

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,

  totalPractices: 3,
  practices: [practice_1, practice_2, practice_3],
};

export default flow;
