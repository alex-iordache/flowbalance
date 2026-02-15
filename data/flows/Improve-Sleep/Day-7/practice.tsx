import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Bun găsit,</strong></p>
    <p>
      Pentru a te relaxa și detașa de problemele cotidiene înainte de a adormi, încearcă câteva exerciții de yoga și vei
      vedea cum amintirea unei zile grele va fi ștearsă.
    </p>

    <p>
      Astăzi, înainte de culcare, te rog să practici următoarea poziție: <strong>Poziția câinelui orientat în sus</strong>.
    </p>
    <p>Această poziție îți ridică moralul, ajută la calmarea nervilor și reduce agitația.</p>

    <ol className="list-decimal pl-5 mt-2">
      <li>Întinde-te cu fața în jos.</li>
      <li>Îndoaie coatele și așează palmele pe lângă tine (chiar sub piept).</li>
      <li>Așează pieptul înainte și formează o coroană cu partea superioară a corpului pe podea.</li>
      <li>Împinge palmele ferm pe podea. Ridică pieptul către cer, aducând coapsele înainte.</li>
      <li>Ridică coapsele de pe podea. Păstrează coapsele ferme.</li>
      <li>Trage de umeri înapoi și pieptul să fie înainte.</li>
      <li>Dă drumul capului pe spate și privește în sus.</li>
    </ol>

    <p className="mt-3">Menține poziția timp de 5 până la 15 secunde, apoi repetă.</p>

    <p className="mt-4"><strong>Sugestie:</strong></p>
    <p>
      Faci mișcare intensă seara, cu 2 ore înainte de culcare (exerciții cardio, intense, care te trezesc la viață)? Dacă
      da, ai putea încerca câteva zile să muţi ora antrenamentului mai devreme, ca mai apoi să remarci calitatea somnului
      tău.
    </p>

    <p className="mt-4">
      Ascultă această înregistrare audio, care te va ajuta să te deconectezi de la situaţiile stresante din viaţa ta şi
      să îţi recapeţi starea de relaxare.
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
      Tonight, before bed, practice the following posture: <strong>Upward-Facing Dog</strong>.
    </p>
    <p>This posture can lift your mood, calm the nerves, and reduce agitation.</p>

    <ol className="list-decimal pl-5 mt-2">
      <li>Lie down on your belly.</li>
      <li>Bend your elbows and place your palms beside you (under the chest).</li>
      <li>Bring the chest forward, preparing the upper body to lift.</li>
      <li>Press firmly into the palms. Lift the chest toward the sky, bringing the thighs forward.</li>
      <li>Lift the thighs off the floor. Keep the legs engaged.</li>
      <li>Draw the shoulders back and broaden the chest.</li>
      <li>Let the head gently drop back and look upward.</li>
    </ol>

    <p className="mt-3">Hold for 5 to 15 seconds, then repeat.</p>

    <p className="mt-4"><strong>Suggestion:</strong></p>
    <p>
      Do you do intense exercise in the evening, within 2 hours of bedtime (cardio, high-intensity workouts that wake you
      up)? If yes, try for a few days to move your workout earlier, and then notice your sleep quality.
    </p>

    <p className="mt-4">
      Listen to today’s audio recording. It will help you disconnect from stressful situations and regain a relaxed
      state.
    </p>
  </>
);

const practice: Practice = {
  id: "Improve-Sleep-Day-07",
  position: 7,
  title: { ro: "Ziua 7", en: "Day 7" },
  name: { ro: "Ziua 7", en: "Day 7" },
  intro: {
    ro: "Practică o postură care calmează agitația și sprijină relaxarea.",
    en: "Practice a posture that reduces agitation and supports relaxation.",
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

