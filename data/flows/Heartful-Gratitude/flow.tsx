import type { Flow } from '../types';
import practice_1 from "./Day-1/practice";

const roDescription = (
  <>
    <p>
      Această înregistrare este un exercițiu ghidat de reglare emoțională prin activarea conștientă a recunoștinței,
      trăită la nivel corporal, nu doar în plan mental.
    </p>
    <p>
      Starea de recunoștință autentică ajută sistemul nervos să iasă din tensiune, reduce reactivitatea emoțională și
      creează un fundal interior de siguranță și liniștire.
    </p>
    <p>
      În această practică înveți să te conectezi cu un aspect concret din viața ta pentru care simți recunoștință reală
      și să permiți acestei stări să se extindă treptat în corp, devenind o resursă internă stabilă.
    </p>
    <p>
      Aceasta este o singură înregistrare, concepută pentru a fi reluată frecvent, ideal zilnic sau de mai multe ori pe
      săptămână, timp de cel puțin o lună, pentru a sprijini echilibrul emoțional, deschiderea inimii și o relație mai
      blândă cu tine și cu viața ta.
    </p>
  </>
);
const enDescription = (
  <>
    <p>
      This recording is a guided emotional regulation practice that activates gratitude consciously—felt in the body,
      not only in the mind.
    </p>
    <p>
      Authentic gratitude helps the nervous system release tension, reduces emotional reactivity, and creates an inner
      baseline of safety and soothing.
    </p>
    <p>
      In this practice you’ll learn to connect with one concrete aspect of your life for which you feel real gratitude,
      and allow that state to gradually expand through the body, becoming a stable inner resource.
    </p>
    <p>
      This is a single recording designed to be repeated frequently—ideally daily or several times per week—for at
      least one month, to support emotional balance, heart opening, and a kinder relationship with yourself and your
      life.
    </p>
  </>
);


const flow: Flow = {
  id: "Heartful-Gratitude",
  position: 26,

  title: { ro: "Recunoștință", en: "Heartful Gratitude" },
  name: { ro: "Recunoștință", en: "Heartful Gratitude" },
  intro: {
    ro: "Cultivă o stare stabilă de recunoștință care îți susține echilibrul emoțional.",
    en: "Cultivate a steady sense of gratitude that supports your emotional balance.",
  },
  description: { ro: roDescription, en: enDescription },
  image: { ro: "/img/flows/heartful-gratitude.png", en: "/img/flows/heartful-gratitude.png" },
  comingSoon: false,

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,

  totalPractices: 1,
  practices: [practice_1],
};

export default flow;
