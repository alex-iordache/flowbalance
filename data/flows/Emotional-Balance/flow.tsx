import type { Flow } from '../types';
import practice_1 from './Story-1/practice';
import practice_2 from './Story-2/practice';
import practice_3 from './Story-3/practice';
import practice_4 from './Story-4/practice';
import practice_5 from './Story-5/practice';

const roDescription = (
  <>
    <p>
      Această secțiune include mai multe înregistrări dedicate emoțiilor puternice precum furia, frustrarea, rușinea,
      anxietatea sau tristețea. Prin povești simbolice și tehnici de respirație și imaginație, copilul învață să observe
      emoția fără a fi copleșit de ea. Este o secțiune pentru copii între 3–10 ani.
    </p>
    <p>
      Exercițiile dezvoltă capacitatea de auto-observare și creează distanță între emoție și reacție. Copilul descoperă
      că emoțiile sunt experiențe temporare, nu definiții ale identității sale. Practica constantă susține autoreglarea
      sistemului nervos și crește toleranța la frustrare.
    </p>
    <p>
      <strong>Bun găsit,</strong>
    </p>
    <p>
      <strong>Tema zilei:</strong> Astăzi, identifică emoția principală trăită de copil (furie, teamă, frustrare,
      tristețe). În această secțiune vei găsi mai multe titluri. Alege înregistrarea care descrie cel mai bine starea
      trăită în ziua respectivă. Seara, ascultați împreună povestea și încurajează-l să recunoască emoția fără să o
      respingă. Scopul este să învețe că emoția poate fi înțeleasă și reglată, nu doar evitată sau reprimată.
    </p>
    <p>
      După audiție, îl poți întreba: Unde în corp ai simțit emoția personajului? Ce culoare ar avea emoția ta azi? Dacă
      emoția ar putea vorbi, ce ar spune?
    </p>
    <p>
      Puteți continua povestea astfel: „Ce ar avea nevoie personajul în acel moment? O pauză? O îmbrățișare? Curaj?"
      Copiii procesează mult prin simbol. Dacă inventează o soluție pentru personaj, de fapt găsesc o soluție pentru ei.
    </p>
    <p>
      Important: validează emoția, nu o corecta. „Înțeleg că a fost greu." este mai puternic decât „Nu ar trebui să îți
      fie frică etc."
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
      This section includes several recordings dedicated to strong emotions such as anger, frustration, shame,
      anxiety, or sadness. Through symbolic stories and breathing and imagery techniques, your child learns to observe
      the emotion without being overwhelmed by it. It is designed for children aged 3–10.
    </p>
    <p>
      The exercises develop self-observation and create distance between emotion and reaction. Your child discovers that
      emotions are temporary experiences, not definitions of who they are. Consistent practice supports nervous system
      self-regulation and increases frustration tolerance.
    </p>
    <p>
      <strong>Welcome,</strong>
    </p>
    <p>
      <strong>Today's theme:</strong> Today, identify the main emotion your child experienced (anger, fear,
      frustration, sadness). In this section you will find several titles. Choose the recording that best describes the
      state they experienced that day. In the evening, listen to the story together and encourage them to acknowledge
      the emotion without rejecting it. The aim is for them to learn that emotions can be understood and regulated, not
      only avoided or repressed.
    </p>
    <p>
      After listening, you can ask: Where in your body did you feel the character's emotion? What color would your
      emotion be today? If the emotion could speak, what would it say?
    </p>
    <p>
      You can continue the story like this: „What would the character need in that moment? A pause? A hug? Courage?"
      Children process a lot through symbol. If they invent a solution for the character, they are actually finding a
      solution for themselves.
    </p>
    <p>
      Important: validate the emotion, don't correct it. „I understand it was hard." is more powerful than „You
      shouldn't be afraid" etc.
    </p>
    <p>
      At the end, you can ask: „What do you want to remember from today's story?" Don't give them the conclusion. Let
      them form it. Then you can close with a simple sentence: „I'm here with you. Whatever emotion appears, we can
      understand it together."
    </p>
  </>
);

const flow: Flow = {
  id: 'Emotional-Balance',
  position: 36,

  title: { ro: 'Gestionarea Emoțiilor Puternice', en: 'Emotional Balance' },
  name: { ro: 'Gestionarea Emoțiilor Puternice', en: 'Emotional Balance' },
  intro: {
    ro: 'Sprijină copilul să înțeleagă și să regleze emoțiile intense.',
    en: 'Support your child in understanding and regulating intense emotions.',
  },
  description: { ro: roDescription, en: enDescription },
  image: { ro: '/img/flows/emotional-balance.webp', en: '/img/flows/emotional-balance.webp' },

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,

  totalPractices: 5,
  practices: [practice_1, practice_2, practice_3, practice_4, practice_5],
};

export default flow;
