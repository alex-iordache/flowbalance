import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Bun găsit,</strong></p>
    <p>
      Pentru a te relaxa și detașa de problemele cotidiene înainte de a adormi, încearcă câteva exerciții de yoga și vei
      vedea cum amintirea unei zile grele va fi ștearsă.
    </p>

    <p>
      Astăzi, înainte de culcare, te rog să practici următoarea poziție: <strong>Poziția copilului</strong>.
    </p>
    <p>Această poziție ajută la menținerea sănătății mentale.</p>

    <ol className="list-decimal pl-5 mt-2">
      <li>Așează-te cu palmele și genunchii pe podea.</li>
      <li>Genunchii depărtați la nivelul șoldurilor, picioarele apropiate.</li>
      <li>Lasă-te pe spate și așează-te cu fundul pe călcâie.</li>
      <li>Întinde brațele și trunchiul înainte.</li>
      <li>Așează-ți fruntea pe podea.</li>
      <li>Întinde-ți brațele înainte.</li>
      <li>Apasă cu palmele pe podea și cu fundul pe călcâie.</li>
    </ol>

    <p className="mt-3">Menține poziția între 1 și 5 minute.</p>

    <p className="mt-4"><strong>Sugestie:</strong></p>
    <p>
      Mănânci înainte să te culci, chiar și cu una sau două ore înainte? Dacă da, încearcă timp de 5 zile să nu mai iei
      cina după ora 20.00 și vezi apoi dacă ți-a impactat calitatea somnului.
    </p>

    <p className="mt-4">
      Ascultă această înregistrare audio, care te va ajuta să te relaxezi, să îţi găseşti pacea şi liniştea interioară şi
      să te conectezi la copilul interior.
    </p>
  </>
);

const enDescription = (
  <>
    <p><strong>Welcome,</strong></p>
    <p>
      To relax and detach from daily problems before falling asleep, try a few yoga exercises and you may notice how the
      memory of a hard day begins to soften.
    </p>

    <p>
      Tonight, before bed, practice the following posture: <strong>Child’s Pose</strong>.
    </p>
    <p>This posture supports mental well-being.</p>

    <ol className="list-decimal pl-5 mt-2">
      <li>Come onto the floor on your hands and knees.</li>
      <li>Keep knees about hip-width apart, feet closer together.</li>
      <li>Sit your hips back toward your heels.</li>
      <li>Extend your arms and torso forward.</li>
      <li>Rest your forehead on the floor.</li>
      <li>Reach your arms forward.</li>
      <li>Press your palms into the floor while gently grounding your hips toward the heels.</li>
    </ol>

    <p className="mt-3">Hold the posture for 1 to 5 minutes.</p>

    <p className="mt-4"><strong>Suggestion:</strong></p>
    <p>
      Do you eat before going to bed, even one or two hours before? If yes, try for 5 days not to eat dinner after 8:00
      PM and then notice whether it impacts your sleep quality.
    </p>

    <p className="mt-4">
      Listen to today’s audio recording. It will help you relax, find inner peace and calm, and reconnect with your inner
      child.
    </p>
  </>
);

const practice: Practice = {
  id: "Improve-Sleep-Day-06",
  position: 6,
  title: { ro: "Ziua 6", en: "Day 6" },
  name: { ro: "Ziua 6", en: "Day 6" },
  intro: {
    ro: "Practică Poziția copilului și observă cum se așază corpul înainte de somn.",
    en: "Practice Child’s Pose and notice your body settling before sleep.",
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/copilul-interior.mp3", en: "audioFiles/copilul-interior.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;

