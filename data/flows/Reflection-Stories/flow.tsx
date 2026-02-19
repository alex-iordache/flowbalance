import type { Flow } from '../types';
import practice_1 from './Story-1/practice';
import practice_2 from './Story-2/practice';
import practice_3 from './Story-3/practice';

const roDescription = (
  <>
    <p>
      Reflection Stories este o colecție de povești audio create pentru a susține resetarea mentală și emoțională în fața
      provocărilor vieții. Fiecare poveste transmite o idee profundă despre alegere, reziliență, perspectivă, acceptare
      sau putere interioară, oferindu-ți un spațiu de reflecție și claritate înainte de somn. În loc să analizezi excesiv
      situațiile dificile, acest flow te invită să lași simbolurile și metaforele să lucreze subtil în mintea ta,
      sprijinind schimbări de perspectivă fără efort conștient intens.
    </p>
    <p>
      Poveștile sunt concepute pentru a fi ascultate seara, înainte de culcare, când mintea este mai receptivă și
      deschisă la insight-uri. Fiecare titlu reflectă o provocare specifică — gestionarea pierderii, alegerea stării
      interioare, transformarea dificultăților, depășirea fricii sau cultivarea recunoștinței — iar tu alegi povestea
      care rezonează cu momentul tău actual. Prin repetiție și ascultare constantă, aceste narațiuni susțin antrenamentul
      mental necesar pentru a răspunde diferit la situațiile vieții, nu prin reacție automată, ci prin alegere conștientă.
    </p>
    <p>
      Reflection Stories nu oferă soluții directe sau instrucțiuni explicite, ci creează un cadru narativ care stimulează
      reflecția profundă și integrarea personală. Practicate consecvent, aceste povești devin un ritual de seară care
      favorizează liniștirea minții, echilibrul emoțional și dezvoltarea unei perspective mai mature și mai stabile
      asupra evenimentelor de zi cu zi, susținând un mod de a trăi mai clar, mai prezent și mai ancorat interior.
    </p>
  </>
);

const enDescription = (
  <>
    <p>
      Reflection Stories is a collection of audio narratives designed to support mental and emotional reset in the face
      of life’s challenges. Each story carries a deeper idea about choice, resilience, perspective, acceptance, or inner
      strength—offering you space for reflection and clarity before sleep. Instead of overanalyzing difficult situations,
      this flow invites you to let symbols and metaphors work subtly in your mind, supporting shifts in perspective
      without heavy conscious effort.
    </p>
    <p>
      These stories are meant to be listened to in the evening, before bed, when the mind is more receptive and open to
      insight. Each title reflects a specific challenge—moving through loss, choosing your inner state, transforming
      difficulty, facing fear, or cultivating gratitude—and you choose the story that matches your current moment.
      Through repetition and consistent listening, these narratives support the mental training needed to respond to
      life’s situations not by automatic reaction, but by conscious choice.
    </p>
    <p>
      Reflection Stories doesn’t offer direct solutions or explicit instructions. Instead, it creates a narrative
      container that encourages deep reflection and personal integration. Practiced consistently, these stories become an
      evening ritual that calms the mind, supports emotional balance, and helps develop a more mature, stable perspective
      on everyday events—supporting a way of living that is clearer, more present, and more grounded within.
    </p>
  </>
);

const flow: Flow = {
  id: 'Reflection-Stories',
  position: 23,

  title: { ro: 'Povești cu sens', en: 'Reflection Stories' },
  name: { ro: 'Povești cu sens', en: 'Reflection Stories' },
  intro: {
    ro: 'O poveste potrivită, la momentul potrivit, îți poate schimba întreaga perspectivă.',
    en: 'The right story, at the right moment, can shift your entire perspective.',
  },
  description: { ro: roDescription, en: enDescription },
  image: { ro: '/img/flows/insight-stories.webp', en: '/img/flows/insight-stories.webp' },

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,

  totalPractices: 3,
  practices: [practice_1, practice_2, practice_3],
};

export default flow;

