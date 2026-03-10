import type { Flow } from '../types';
import practice_1 from './Practice-1/practice';
import practice_2 from './Practice-2/practice';
import practice_3 from './Practice-3/practice';

const roDescription = (
  <>
    <p>
      Respirația este cel mai rapid instrument prin care îți poți regla starea mentală și emoțională.
    </p>
    <p>
      Breathing Exercises este un set de practici simple care te ajută să îți reglezi starea interioară folosind unul
      dintre cele mai naturale mecanisme ale corpului: respirația. Deși respirăm automat, modul în care respirăm
      influențează direct sistemul nervos, ritmul cardiac, nivelul de stres și claritatea mentală. Atunci când respirația
      devine lentă și conștientă, corpul primește semnalul că este în siguranță, iar sistemul nervos începe să se
      calmeze.
    </p>
    <p>
      Acest flow te introduce în exerciții de respirație ușor de practicat, care pot reduce stresul, îmbunătăți
      concentrarea și susține echilibrul emoțional. Practicile sunt scurte și accesibile, astfel încât să le poți integra
      în viața de zi cu zi, chiar și în momentele aglomerate.
    </p>
    <p>
      Tehnicile de breathwork sunt folosite astăzi în numeroase domenii – de la sănătate alternativă și managementul
      stresului până la sport de performanță, educație, antrenament militar sau recuperare după traumă. Motivul este
      simplu: respirația este una dintre puținele funcții ale corpului care este în același timp automată și
      controlabilă, ceea ce o transformă într-o punte directă între corp și minte.
    </p>
    <p>
      Prin aceste înregistrări audio, vei învăța să încetinești respirația, să îți stabilizezi atenția și să folosești
      respirația ca instrument de reglare și echilibru interior. Practicate regulat, aceste exerciții pot crește
      reziliența la stres, pot susține energia zilnică și pot aduce mai multă calm și claritate în viața ta.
    </p>
  </>
);

const enDescription = (
  <>
    <p>
      Breathing is the fastest tool you have to regulate your mental and emotional state.
    </p>
    <p>
      Breathing Exercises is a set of simple practices that help you regulate your inner state using one of the body’s
      most natural mechanisms: breathing. Although we breathe automatically, how we breathe directly influences the
      nervous system, heart rate, stress level, and mental clarity. When breathing becomes slow and conscious, the body
      receives the signal that it is safe, and the nervous system begins to calm down.
    </p>
    <p>
      This flow introduces you to easy-to-practice breathing exercises that can reduce stress, improve focus, and
      support emotional balance. The practices are short and accessible so you can integrate them into daily life, even
      during busy moments.
    </p>
    <p>
      Breathwork techniques are used today in many areas—from alternative health and stress management to performance
      sports, education, military training, or trauma recovery. The reason is simple: breathing is one of the few body
      functions that is both automatic and controllable, making it a direct bridge between body and mind.
    </p>
    <p>
      Through these audio recordings, you will learn to slow your breathing, steady your attention, and use breathing as
      a tool for regulation and inner balance. Practiced regularly, these exercises can increase stress resilience,
      support daily energy, and bring more calm and clarity into your life.
    </p>
  </>
);

const flow: Flow = {
  id: 'Breathing-Exercises',
  position: 39,

  title: { ro: 'Exerciții de respirație', en: 'Breathing Exercises' },
  name: { ro: 'Exerciții de respirație', en: 'Breathing Exercises' },
  intro: {
    ro: 'Respirația este cel mai rapid instrument prin care îți poți regla starea mentală și emoțională.',
    en: 'Breathing is the fastest tool you have to regulate your mental and emotional state.',
  },
  description: { ro: roDescription, en: enDescription },
  image: { ro: '/img/flows/breathing-exercises.png', en: '/img/flows/breathing-exercises.png' },

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,

  totalPractices: 3,
  practices: [practice_1, practice_2, practice_3],
};

export default flow;
