import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Astăzi este prima zi a călătoriei tale, un prim pas spre drumul către succesul personal, în care vei obține echilibrul
      interior de care ai nevoie, dar și metode la îndemână prin care să elimini stările de frică, anxietate, atacurile
      de panică.
    </p>
    <p>
      <strong>Pentru ziua aceasta pune pe o hârtie (ideal, într-un jurnal de dezvoltare personală) toate calitățile tale
      alături de dovezi.</strong> De exemplu: sunt determinat/ă, de fiecare dată când mi-am propus ceva foarte tare am
      reușit (jobul pe care îl am acum, notele de 10 de la școală, etc.).
    </p>
    <p>Apoi, te invit să practici exercițiul „Mersul conștient”:</p>
    <p>
      Una dintre cele mai liniștitoare activități din punct de vedere mental și fizic este să fim conștienți de o
      activitate pe care o facem în mod reflex. De aceea, azi îți propun să realizezi mișcarea prin casă sau pe stradă,
      fiind conștient/ă de ea. În timp ce mergi, în ritmul tău obișnuit, simte cum se mișcă picioarele, simte contactul
      piciorului cu suprafața pe care calcă, flexiunea genunchiului, mișcările coapselor, șoldurilor. Simte pe rând ce se
      întâmplă pe partea stângă, apoi pe partea dreaptă. Simte dacă ai senzații de greutate în picioare, sau de
      lejeritate, simte căldura corpului în timp ce mergi, auzi mișcările pe care le faci. Acest mod de a deveni conștient
      de corpul tău te deconectează de la gândurile obositoare, te ajută să descoperi minunăția corpului care funcționează
      atât de sincronizat. Această activitate relaxează mintea și te ajută să fii în contact cu propriul corp.
    </p>
    <p>
      Seara, înainte de culcare, ascultă această înregistrare audio, care te va ajuta să te conectezi la propriul corp și
      să observi tensiunile înmagazinate la nivelul corpului, relaxând zonele tensionate.
    </p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Today is the first day of your journey—a first step toward the inner balance you need and practical ways to reduce
      fear, anxiety, and panic attacks.
    </p>
    <p>
      <strong>For today, write on paper (ideally in a personal development journal) all your qualities with evidence.</strong>{' '}
      For example: I am determined—whenever I set myself a big goal I achieved it (the job I have now, top grades at
      school, etc.).
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
      In the evening, before bed, listen to this audio. It will help you connect to your body and notice stored tension,
      relaxing the areas that are holding stress.
    </p>
  </>
);

const practice: Practice = {
  id: 'Calming-Anxiety-Day-01',
  position: 1,
  title: { ro: 'Ziua 1', en: 'Day 1' },
  name: { ro: 'Ziua 1', en: 'Day 1' },
  intro: {
    ro: 'Calitățile tale cu dovezi + mersul conștient; body scan seara.',
    en: 'Your qualities with evidence + conscious walking; body scan in the evening.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/body-scan.mp3', en: 'audioFilesEnAi/body-scan-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
