import type { Flow } from '../types';
import practice_1 from "./Day-1/practice";

const roDescription = (
  <>
    <p>
      Această înregistrare este un exercițiu ghidat de reconectare cu motivația profundă, aceea care apare natural atunci
      când ești aliniat cu ceea ce contează cu adevărat pentru tine.
    </p>
    <p>
      Lipsa de motivație nu este, de cele mai multe ori, o problemă de voință, ci un semn de epuizare, pierdere a
      sensului sau suprasolicitare emoțională.
    </p>
    <p>
      În această practică înveți să faci pauză din lupta interioară, să îți liniștești sistemul nervos și să te
      reconectezi cu un motiv real pentru care continui, dincolo de obligații, presiuni sau așteptările altora.
    </p>
    <p>
      Motivația este abordată ca o stare care se naște din claritate, siguranță și sens, nu ca o forțare sau
      auto-disciplină rigidă.
    </p>
    <p>
      Aceasta este o singură înregistrare, concepută pentru a fi reluată frecvent, ideal zilnic sau de mai multe ori pe
      săptămână, timp de cel puțin o lună, pentru a susține consecvența, energia interioară și capacitatea de a acționa
      dintr-un loc mai așezat și mai coerent.
    </p>
  </>
);

const enDescription = (
  <>
    <p>
      This recording is a guided practice to reconnect with deep motivation—the kind that arises naturally when you are
      aligned with what truly matters to you.
    </p>
    <p>
      Most of the time, a lack of motivation is not a willpower problem, but a sign of exhaustion, loss of meaning, or
      emotional overload.
    </p>
    <p>
      In this practice you’ll learn to pause the inner struggle, calm your nervous system, and reconnect with a real
      reason to keep going—beyond obligations, pressure, or other people’s expectations.
    </p>
    <p>
      Motivation is approached as a state born from clarity, safety, and meaning—not as forcing yourself or rigid
      self-discipline.
    </p>
    <p>
      This is a single recording designed to be repeated frequently—ideally daily or several times per week—for at least
      one month, to support consistency, inner energy, and the ability to act from a more grounded and coherent place.
    </p>
  </>
);

const flow: Flow = {
  id: "Boost-Motivation",
  position: 27,

  title: { ro: "Boost motivațional", en: "Boost Motivation" },
  name: { ro: "Boost motivațional", en: "Boost Motivation" },
  intro: { ro: "Reactivează motivația autentică, din sens, nu din presiune.", en: "Reactivate authentic motivation—from meaning, not pressure." },
  description: { ro: roDescription, en: enDescription },
  image: { ro: "/img/flows/boost-motivation.png", en: "/img/flows/boost-motivation.png" },
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

