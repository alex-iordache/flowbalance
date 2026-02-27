import type { Flow } from '../types';
import practice_1 from './Story-1/practice';

const roDescription = (
  <>
    <p>
      Această secțiune include mai multe povești terapeutice dedicate dezvoltării mentalității de creștere. Copilul învață
      că eșecul nu definește valoarea personală, ci reprezintă o etapă naturală în procesul de învățare.
    </p>
    <p>
      Prin metafore și personaje simbolice sunt modelate situații de comparație, frustrare și îndoială, iar copilul este
      ghidat să descopere alternative constructive de interpretare a realității.
    </p>
    <p>
      Exercițiile susțin reziliența, perseverența și flexibilitatea cognitivă — competențe esențiale pentru dezvoltarea
      academică și sportivă. Este o secțiune pentru copii între 3–10 ani.
    </p>
    <p>
      <strong>Bun găsit,</strong>
    </p>
    <p>
      <strong>Tema zilei:</strong> Astăzi, identifică o situație în care copilul s-a simțit dezamăgit sau a făcut o
      greșeală. În această secțiune vei găsi mai multe titluri care abordează tipuri diferite de dificultăți. Alege
      povestea care reflectă cel mai bine experiența lui din acea zi. Ascultarea repetată ajută la consolidarea mesajului
      că greșeala este parte din proces, iar progresul se construiește pas cu pas.
    </p>
    <p>
      După poveste: Ce greșeală a fost cea mai importantă în poveste? Ce a învățat personajul din ea? Dacă greșeala ar
      fi un profesor, ce lecție ar preda?
    </p>
    <p>
      Continuați povestea astfel: „Ce se întâmplă peste o lună? Cum s-a schimbat personajul?" Această proiecție în viitor
      ajută copilul să dezvolte toleranță la frustrare și perspectivă pe termen lung.
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
      This section includes several therapeutic stories dedicated to developing a growth mindset. Your child learns that
      failure does not define personal worth, but is a natural step in the learning process.
    </p>
    <p>
      Through metaphors and symbolic characters, situations of comparison, frustration, and doubt are modelled, and
      your child is guided to discover constructive alternative ways of interpreting reality.
    </p>
    <p>
      The exercises support resilience, perseverance, and cognitive flexibility—essential skills for academic and
      athletic development. It is designed for children aged 3–10.
    </p>
    <p>
      <strong>Welcome,</strong>
    </p>
    <p>
      <strong>Today's theme:</strong> Today, identify a situation where your child felt disappointed or made a mistake.
      In this section you will find several titles that address different types of difficulties. Choose the story that
      best reflects their experience that day. Repeated listening helps reinforce the message that mistakes are part of
      the process and progress is built step by step.
    </p>
    <p>
      After the story: What was the most important mistake in the story? What did the character learn from it? If the
      mistake were a teacher, what lesson would it teach?
    </p>
    <p>
      Continue the story like this: „What happens in a month? How has the character changed?" This future projection
      helps your child develop frustration tolerance and long-term perspective.
    </p>
    <p>
      At the end, you can ask: „What do you want to remember from today's story?" Don't give them the conclusion. Let
      them form it. Then you can close with a simple sentence: „I'm here with you. Whatever emotion appears, we can
      understand it together."
    </p>
  </>
);

const flow: Flow = {
  id: 'Growth-Mindset-Stories',
  position: 38,

  title: { ro: 'Povești pentru Mentalitate de Creștere', en: 'Growth Mindset Stories' },
  name: { ro: 'Povești pentru Mentalitate de Creștere', en: 'Growth Mindset Stories' },
  intro: {
    ro: 'Transformă greșelile în oportunități de învățare.',
    en: 'Turn mistakes into learning opportunities.',
  },
  description: { ro: roDescription, en: enDescription },
  image: { ro: '/img/flows/growth-mindset.webp', en: '/img/flows/growth-mindset.webp' },

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,

  totalPractices: 1,
  practices: [practice_1],
};

export default flow;
