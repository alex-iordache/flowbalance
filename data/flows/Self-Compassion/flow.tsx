import type { Flow } from '../types';
import practice_1 from "./Day-1/practice";

const roDescription = (
  <>
    <p>
      Este un exercițiu ghidat de reglare emoțională și reconectare profundă cu sinele, prin activarea compasiunii reale
      față de propria experiență.
    </p>
    <p>
      Auto-compasiunea nu înseamnă slăbiciune, indulgență sau renunțare la responsabilitate, ci capacitatea de a rămâne
      prezent cu tine chiar și atunci când lucrurile nu sunt perfecte.
    </p>
    <p>
      În această practică înveți să îți observi părțile rănite, obosite sau criticate fără judecată și să le oferi exact
      ceea ce le-a lipsit: prezență, acceptare și siguranță.
    </p>
    <p>
      Trăită la nivel corporal, auto-compasiunea ajută la reducerea tensiunii interne, a rușinii și a auto-criticii și
      creează un spațiu interior în care apare ușurarea, claritatea și o formă profundă de reconectare cu tine.
    </p>
    <p>
      Aceasta este o singură înregistrare, concepută pentru a fi reluată frecvent, de mai multe ori pe săptămână pentru o
      stare mai stabilă de acceptare și pace interioară.
    </p>
  </>
);

const enDescription = (
  <>
    <p>
      This is a guided practice for emotional regulation and deep reconnection with yourself, by activating real
      compassion toward your own experience.
    </p>
    <p>
      Self-compassion doesn’t mean weakness, indulgence, or giving up responsibility—it’s the capacity to stay present
      with yourself even when things aren’t perfect.
    </p>
    <p>
      In this practice you’ll learn to notice your hurt, tired, or self-criticized parts without judgment, and offer
      them exactly what was missing: presence, acceptance, and safety.
    </p>
    <p>
      Felt in the body, self-compassion reduces inner tension, shame, and self-criticism, and creates an inner space
      where relief, clarity, and a deep sense of reconnection can emerge.
    </p>
    <p>
      This is a single recording designed to be repeated frequently—several times per week—to support a more stable
      sense of acceptance and inner peace.
    </p>
  </>
);

const flow: Flow = {
  id: "Self-Compassion",
  position: 28,

  title: { ro: "Compasiune de sine", en: "Self Compassion" },
  name: { ro: "Compasiune de sine", en: "Self Compassion" },
  intro: { ro: "Construiește o relație blândă și sigură cu tine însuți.", en: "Build a kind and safe relationship with yourself." },
  description: { ro: roDescription, en: enDescription },
  image: { ro: "/img/flows/self-compassion.jpg", en: "/img/flows/self-compassion.jpg" },
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

