import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      A învăța recunoștința e cel mai bun lucru pentru calitatea vieții tale, în primul rând, pentru că nu mai trăiești în
      ideea de a umple un gol în existența ta, ci din conștiența abundenței care va atrage și mai multe lucruri bune.
    </p>
    <p>
      <strong>Pentru ziua aceasta spune 10 aspecte din viața ta pentru care ești recunoscător/recunoscătoare.</strong>
    </p>
    <p>Apoi, te invit să practici exercițiul „Mersul conștient”:</p>
    <p>
      Una dintre cele mai liniștitoare activități din punct de vedere mental și fizic este să fim conștienți de o
      activitate pe care o facem în mod reflex. De aceea, azi îți propun să realizezi mișcarea prin casă sau pe stradă
      fiind conștient/ă de ea. În timp ce mergi, în ritmul tău obișnuit, simte cum se mișcă picioarele, simte contactul
      piciorului cu suprafața pe care calcă, flexiunea genunchiului, mișcările coapselor, șoldurilor. Simte pe rând ce se
      întâmplă pe partea stângă, apoi pe partea dreaptă. Simte dacă ai senzații de greutate în picioare, sau de
      lejeritate, simte căldura corpului în timp ce mergi, auzi mișcările pe care le faci. Acest mod de a deveni conștient
      de corpul tău te deconectează de la gândurile obositoare, te ajută să descoperi minunăția corpului care funcționează
      atât de sincronizat. Această activitate relaxează mintea și te ajută să fii în contact cu propriul corp.
    </p>
    <p>
      Ascultă această înregistrare audio, care te va ajuta să te descarci de bagajele emoționale pe care le porți cu tine
      în fiecare zi.
    </p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Learning gratitude is one of the best things for the quality of your life—first, because you no longer live from the
      idea of filling a void, but from an awareness of abundance that attracts more good.
    </p>
    <p>
      <strong>For today, name 10 things in your life you are grateful for.</strong>
    </p>
    <p>Then we invite you to practice “Conscious walking”:</p>
    <p>
      One of the most calming activities for mind and body is to be aware of something we usually do on autopilot. So today
      we suggest you walk around the house or outside while staying aware of it. As you walk at your usual pace, feel your
      legs moving, the contact of your foot with the ground, the bend of your knee, the movement of your thighs and hips.
      Notice what happens on the left side, then the right. Notice any sense of heaviness or lightness in your legs, the
      warmth of your body as you move, the sounds of your steps. This way of becoming aware of your body disconnects you
      from draining thoughts and helps you discover how smoothly your body works. The practice relaxes the mind and keeps
      you in touch with your body.
    </p>
    <p>
      Listen to this audio; it will help you release the emotional baggage you carry with you every day.
    </p>
  </>
);

const practice: Practice = {
  id: 'Calming-Anxiety-Day-07',
  position: 7,
  title: { ro: 'Ziua 7', en: 'Day 7' },
  name: { ro: 'Ziua 7', en: 'Day 7' },
  intro: {
    ro: '10 lucruri de recunoștință + mersul conștient; audio bagaje emoționale.',
    en: '10 things to be grateful for + conscious walking; emotional baggage audio.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/bagaje.mp3', en: 'audioFilesEnAi/bagaje-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
