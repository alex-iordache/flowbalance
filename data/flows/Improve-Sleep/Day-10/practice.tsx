import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Bun găsit,</strong></p>
    <p>
      Pentru a te relaxa și detașa de problemele cotidiene înainte de a adormi, încearcă câteva exerciții de yoga și vei
      vedea cum amintirea unei zile grele va fi ștearsă.
    </p>

    <p>
      Astăzi, înainte de culcare, te rog să practici următoarea poziție: <strong>Poziția câinelui cu capul în jos</strong>.
    </p>
    <p>Această poziție calmează creierul și te va ajuta la reducerea stresului de zi cu zi.</p>

    <ol className="list-decimal pl-5 mt-2">
      <li>Așează palmele pe podea, în fața ta.</li>
      <li>Vei face câte un pas înapoi.</li>
      <li>Picioarele trebuie să fie în rând cu mâinile.</li>
      <li>Depărtează degetele și pune palmele jos pe podea.</li>
      <li>Întinde brațele în față, păstrează coatele drepte.</li>
      <li>Ridică fundul și mișcă coapsele înainte și înapoi.</li>
      <li>Lasă-ți călcâiele pe podea și ține picioarele drepte.</li>
      <li>Relaxează-ți capul și lasă-l ușor pe spate.</li>
    </ol>

    <p className="mt-3">Menține poziția timp de 30 de secunde până la 1 minut.</p>

    <p className="mt-4">
      Ascultă această înregistrare audio, care te va ajuta să ai o stare profundă de relaxare.
    </p>
  </>
);

const enDescription = (
  <>
    <p><strong>Welcome,</strong></p>
    <p>
      To relax and detach from daily problems before falling asleep, try a few yoga exercises and notice how the memory
      of a hard day begins to soften.
    </p>

    <p>
      Tonight, before bed, practice the following posture: <strong>Downward-Facing Dog</strong>.
    </p>
    <p>This posture calms the brain and helps reduce everyday stress.</p>

    <ol className="list-decimal pl-5 mt-2">
      <li>Place your palms on the floor in front of you.</li>
      <li>Step back.</li>
      <li>Keep the feet in line with the hands.</li>
      <li>Spread the fingers and press the palms into the floor.</li>
      <li>Extend the arms forward, keeping elbows straight.</li>
      <li>Lift the hips and gently move the thighs forward and back.</li>
      <li>Let the heels move toward the floor and keep the legs long.</li>
      <li>Relax the head and neck.</li>
    </ol>

    <p className="mt-3">Hold for 30 seconds to 1 minute.</p>

    <p className="mt-4">
      Listen to today’s audio recording. It will help you reach a deep state of relaxation.
    </p>
  </>
);

const practice: Practice = {
  id: "Improve-Sleep-Day-10",
  position: 10,
  title: { ro: "Ziua 10", en: "Day 10" },
  name: { ro: "Ziua 10", en: "Day 10" },
  intro: {
    ro: "Calmează mintea printr-o postură simplă și intră în relaxare profundă.",
    en: "Calm the mind with a simple posture and enter deep relaxation.",
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/marea.mp3", en: "audioFilesEnAi/marea-en.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;

