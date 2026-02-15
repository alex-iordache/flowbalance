import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Bun găsit,</strong></p>
    <p>
      Pentru a te relaxa și detașa de problemele cotidiene înainte de a adormi, încearcă câteva exerciții de yoga și vei
      vedea cum amintirea unei zile grele va fi ștearsă.
    </p>

    <p>
      Astăzi, înainte de culcare, te rog să practici următoarea poziție: <strong>Poziția cu mâna sus</strong>.
    </p>
    <p>
      Această poziție este benefică pentru eliberarea tensiunii spatelui, dar îți va oferi și un sentiment de lejeritate
      în viață.
    </p>

    <ol className="list-decimal pl-5 mt-2">
      <li>Stai cu picioarele depărtate la nivelul șoldurilor.</li>
      <li>Ridică rotulele prin strângerea coapselor.</li>
      <li>Rulează umerii înapoi.</li>
      <li>Întinde brațele înainte și ridică-le.</li>
      <li>Îndreaptă coatele, încheieturile mâinilor și degetele.</li>
      <li>Relaxează gâtul și umerii.</li>
      <li>Ține capul drept și privește înainte.</li>
    </ol>

    <p className="mt-3">Menține poziția timp de 30 de secunde până la 1 minut, apoi repetă de 3 ori.</p>

    <p className="mt-4"><strong>Sugestie:</strong></p>
    <p>
      Fumezi? Dacă da, încearcă timp de 5 zile să nu mai fumezi după ora 17.00 și vezi apoi dacă ți-a impactat calitatea
      somnului.
    </p>

    <p className="mt-4">
      Ascultă această înregistrare audio, care te va ajuta să te deconectezi de probleme, pentru a oferi relaxare
      întregului corp.
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
      Tonight, before bed, practice the following posture: <strong>Arms Up Pose</strong>.
    </p>
    <p>
      This posture is beneficial for releasing back tension and can also give you a sense of lightness.
    </p>

    <ol className="list-decimal pl-5 mt-2">
      <li>Stand with feet hip-width apart.</li>
      <li>Lift the kneecaps by engaging the thighs.</li>
      <li>Roll the shoulders back.</li>
      <li>Extend your arms forward and lift them up.</li>
      <li>Straighten elbows, wrists, and fingers.</li>
      <li>Relax the neck and shoulders.</li>
      <li>Keep your head upright and look forward.</li>
    </ol>

    <p className="mt-3">Hold for 30 seconds to 1 minute, then repeat 3 times.</p>

    <p className="mt-4"><strong>Suggestion:</strong></p>
    <p>
      Do you smoke? If yes, try for 5 days not to smoke after 5:00 PM and then notice whether it impacts your sleep
      quality.
    </p>

    <p className="mt-4">
      Listen to today’s audio recording. It will help you disconnect from problems and bring relaxation to your whole
      body.
    </p>
  </>
);

const practice: Practice = {
  id: "Improve-Sleep-Day-09",
  position: 9,
  title: { ro: "Ziua 9", en: "Day 9" },
  name: { ro: "Ziua 9", en: "Day 9" },
  intro: {
    ro: "Eliberează tensiunea din spate și observă ce se schimbă în corp.",
    en: "Release back tension and notice what shifts in your body.",
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: {
    ro: "audioFiles/deconectare-relaxare-vindecare-gradina-cunoasterii.mp3",
    en: "audioFilesEnAi/deconectare-relaxare-vindecare-gradina-cunoasterii-en.mp3",
  },

  finished: false,
  lastPositionSec: 0,
};

export default practice;

