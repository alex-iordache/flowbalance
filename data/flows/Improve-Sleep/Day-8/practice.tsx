import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Bun găsit,</strong></p>
    <p>Astăzi îți propun următorul exercițiu, pe care să îl practici pe parcursul întregii zile:</p>
    <p><strong>Mersul conștient</strong></p>
    <p>
      Una dintre cele mai liniștitoare activități din punct de vedere mental și fizic este să fim conștienți de o
      activitate pe care o facem în mod reflex. De aceea, azi îţi propun să realizezi mișcarea prin casă sau pe stradă
      fiind conștient/ă de ea. În timp ce mergi, în ritmul tău obișnuit, simte cum se mișcă picioarele, simte contactul
      piciorului cu suprafața pe care calcă, flexiunea genunchiului, mișcările coapselor, șoldurilor. Simte pe rând ce se
      întâmplă pe partea stângă, apoi pe partea dreaptă. Simte dacă ai senzații de greutate în picioare sau de lejeritate,
      simte căldura corpului în timp ce mergi, auzi mișcările pe care le faci.
    </p>
    <p>
      Acest mod de a deveni conștient de corpul tău te deconectează de la gândurile obositoare, te ajută să descoperi
      minunăția corpului care funcționează atât de sincronizat. Această activitate relaxează mintea și te pune să fii mai
      în contact cu propriul corp.
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
    <p>Today I suggest an exercise you can practice throughout the entire day:</p>
    <p><strong>Mindful walking</strong></p>
    <p>
      One of the most soothing activities mentally and physically is to become conscious of an activity we usually do on
      autopilot. So today, as you move around your home or walk outside, do it with awareness. As you walk at your normal
      pace, feel how your legs move, feel the contact of your foot with the surface beneath you, the bending of the knee,
      the movement of the thighs and hips. Notice what happens on the left side, then on the right side. Notice sensations
      of heaviness or lightness in the legs, feel the warmth of the body as you walk, and hear the movements you make.
    </p>
    <p>
      This way of becoming aware of your body disconnects you from tiring thoughts and helps you rediscover the wonder of
      a body that functions in such synchrony. This activity relaxes the mind and brings you into closer contact with your
      body.
    </p>

    <p className="mt-4">
      Listen to today’s audio recording. It will help you disconnect from stressful situations and regain a relaxed
      state.
    </p>
  </>
);

const practice: Practice = {
  id: "Improve-Sleep-Day-08",
  position: 8,
  title: { ro: "Ziua 8", en: "Day 8" },
  name: { ro: "Ziua 8", en: "Day 8" },
  intro: {
    ro: "Practică mersul conștient și folosește corpul ca ancoră pentru calm.",
    en: "Practice mindful walking and use the body as an anchor for calm.",
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: {
    ro: "audioFiles/deconectare-relaxare-vindecare-gradina-cunoasterii.mp3",
    en: "audioFiles/deconectare-relaxare-vindecare-gradina-cunoasterii.mp3",
  },

  finished: false,
  lastPositionSec: 0,
};

export default practice;

