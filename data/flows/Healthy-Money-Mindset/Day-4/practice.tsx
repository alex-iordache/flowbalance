import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Astăzi vei lucra cu ideea de control și rezoluție financiară prin joacă.
      Atunci când te implici activ, corpul și mintea încep să perceapă soluțiile ca fiind posibile.
    </p>
    <p>Pentru ziua de astăzi, te invit să apelezi la un truc psihologic.</p>
    <p>
      Pe o foaie de hârtie, desenează un cec, o bancnotă sau orice formă de plată care pentru tine simbolizează banii.
      Poți folosi culori, markere, orice îți face plăcere.
    </p>
    <p>Înainte de a crea acest cec, notează separat:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>datoriile tale</li>
      <li>cheltuielile recurente</li>
    </ul>
    <p>
      Calculează suma totală și alege o valoare care să le acopere, la care poți adăuga o sumă suplimentară,
      atâta timp cât mintea ta o poate accepta ca fiind posibilă.
    </p>
    <p>
      După ce ai terminat, ține acest act în mâini câteva momente și observă ce apare în tine: emoții, gânduri, senzații. Nu schimba nimic.
    </p>
    <p>
      <strong>Gândul zilei:</strong> „Pot crea soluții clare pentru obiectivele mele.”
    </p>
    <p>Seara, înainte de culcare, ascultă audio-ul zilei.</p>
  </>
);
const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Today you’ll work with the idea of control and financial resolution through play.
      When you engage actively, your body and mind start to perceive solutions as possible.
    </p>
    <p>For today, I invite you to use a simple psychological trick.</p>
    <p>
      On a sheet of paper, draw a check, a banknote, or any form of payment that symbolizes money for you.
      Use colors, markers—anything you enjoy.
    </p>
    <p>Before creating this “check”, write separately:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>your debts</li>
      <li>your recurring expenses</li>
    </ul>
    <p>
      Calculate the total and choose an amount that covers it. You may add an extra amount as long as your mind can accept it as possible.
    </p>
    <p>
      When you’re done, hold it in your hands for a few moments and notice what comes up: emotions, thoughts, sensations. Don’t change anything.
    </p>
    <p>
      <strong>Thought of the day:</strong> “I can create clear solutions for my goals.”
    </p>
    <p>In the evening, before sleep, listen to today’s audio.</p>
  </>
);


const practice: Practice = {
  id: "Healthy-Money-Mindset-Day-04",
  position: 4,
  title: { ro: "Ziua 4 – Vizualizarea obiectivului personal", en: "Day 4 – Visualizing Your Personal Goal" },
  name: { ro: "Vizualizarea obiectivului personal", en: "Visualizing Your Personal Goal" },
  intro: { ro: "Joaca poate face soluțiile să pară posibile—lucrează cu bani și control într-un mod sigur.", en: "Play can make solutions feel possible—work with money and control in a safe way." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/vizualizarea-obiectului-personal.mp3", en: "audioFiles/vizualizarea-obiectului-personal.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
