import type { Flow } from '../types';
import practice_1 from './Story-1/practice';

const roDescription = (
  <>
    <p>
      Această secțiune conține mai multe înregistrări dedicate dezvoltării încrederii interioare. Prin povești
      terapeutice, exerciții de imaginație ghidată și reglare emoțională adaptată vârstei, copilul învață să își
      transforme dialogul interior critic într-unul susținător. Este o secțiune pentru copii între 3–10 ani.
    </p>
    <p>
      Practica stimulează dezvoltarea unei imagini de sine stabile, reduce teama de greșeală și sprijină asumarea
      provocărilor noi. La nivel neuro-emoțional, aceste exerciții contribuie la diminuarea reactivității la eșec și la
      consolidarea sentimentului de competență personală.
    </p>
    <p>
      Repetarea frecventă susține internalizarea unui mesaj esențial: „Pot învăța. Pot crește. Pot încerca din nou."
    </p>
    <p>
      <strong>Bun găsit,</strong>
    </p>
    <p>
      <strong>Tema zilei:</strong> Astăzi, observă un moment în care copilul se îndoiește de el sau spune „Nu pot". În
      această secțiune vei găsi mai multe titluri. Alege împreună cu el înregistrarea care se potrivește cel mai bine
      situației din ziua respectivă. Seara, ascultați înregistrarea aleasă și permite-i copilului să experimenteze o
      variantă diferită a acelei situații, în care gândul limitativ se transformă într-un gând de creștere. Obiectivul
      nu este performanța imediată, ci consolidarea unei relații sănătoase cu propriul efort.
    </p>
    <p>
      După ce ascultați împreună povestea, rămâneți câteva minute în liniște. Nu pune întrebări imediat. Lasă spațiu.
      Uneori copiii procesează în tăcere.
    </p>
    <p>
      Apoi poți continua cu întrebări deschise, fără a corecta sau interpreta: Ce parte din poveste ți-a plăcut cel mai
      mult? A fost un moment în care personajul s-a simțit ca tine? Dacă ai fi tu în locul lui, ce ai face diferit? Ce
      l-ar ajuta pe personaj data viitoare când spune „Nu pot"?
    </p>
    <p>
      O invitație foarte valoroasă este continuarea poveștii: „Hai să inventăm împreună ce se întâmplă a doua zi." Copilul
      poate modifica finalul, poate schimba reacția personajului, poate adăuga un ajutor imaginar. În acel moment, el
      își rescrie propriul scenariu intern.
    </p>
    <p>
      Scopul nu este să îl convingi că „poate", ci să îl ajuți să descopere singur o variantă alternativă. La final, îl
      poți întreba: „Ce vrei să ții minte din povestea de azi?" Nu îi oferi tu concluzia. Lasă-l să o formuleze. Apoi
      poți închide cu o propoziție simplă: „Sunt aici cu tine. Orice emoție apare, o putem înțelege împreună."
    </p>
  </>
);

const enDescription = (
  <>
    <p>
      This section contains several recordings dedicated to building inner confidence. Through therapeutic stories,
      guided imagery, and age-adapted emotional regulation, your child learns to turn their inner critical dialogue into
      a supportive one. It is designed for children aged 3–10.
    </p>
    <p>
      The practice supports a stable self-image, reduces fear of making mistakes, and encourages taking on new
      challenges. At a neuro-emotional level, these exercises help lower reactivity to failure and strengthen a sense of
      personal competence.
    </p>
    <p>
      Frequent repetition reinforces a core message: „I can learn. I can grow. I can try again."
    </p>
    <p>
      <strong>Welcome,</strong>
    </p>
    <p>
      <strong>Today's theme:</strong> Today, notice a moment when your child doubts themselves or says „I can't". In
      this section you will find several titles. Choose together the recording that best fits the situation of the day.
      In the evening, listen to the chosen recording and let your child experience a different version of that
      situation, where the limiting thought becomes a growth thought. The aim is not immediate performance, but building
      a healthy relationship with effort.
    </p>
    <p>
      After listening together, stay in silence for a few minutes. Don't ask questions right away. Give space.
      Sometimes children process in silence.
    </p>
    <p>
      Then you can continue with open questions, without correcting or interpreting: What part of the story did you like
      most? Was there a moment when the character felt like you? If you were in their place, what would you do
      differently? What would help the character next time they say „I can't"?
    </p>
    <p>
      A very valuable invitation is to continue the story: „Let's imagine together what happens the next day." Your child
      can change the ending, change the character's reaction, or add an imaginary helper. In that moment, they rewrite
      their own inner script.
    </p>
    <p>
      The goal is not to convince them they „can", but to help them discover an alternative on their own. At the end,
      you can ask: „What do you want to remember from today's story?" Don't give them the conclusion. Let them form it.
      Then you can close with a simple sentence: „I'm here with you. Whatever emotion appears, we can understand it
      together."
    </p>
  </>
);

const flow: Flow = {
  id: 'Build-Inner-Confidence',
  position: 35,

  title: { ro: 'Construirea Încrederii Interioare', en: 'Build Inner Confidence' },
  name: { ro: 'Construirea Încrederii Interioare', en: 'Build Inner Confidence' },
  intro: {
    ro: 'Cultivă încrederea sănătoasă și siguranța interioară a copilului tău.',
    en: 'Nurture your child’s healthy confidence and inner safety.',
  },
  description: { ro: roDescription, en: enDescription },
  image: { ro: '/img/flows/build-inner-confidence.webp', en: '/img/flows/build-inner-confidence.webp' },

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,

  totalPractices: 1,
  practices: [practice_1],
};

export default flow;
