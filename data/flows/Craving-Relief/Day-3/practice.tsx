import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Bun găsit,</strong></p>
    <p>
      Astăzi vei învăța să încetinești. Pofta creează adesea senzația de urgență, însă corpul poate învăța că nu este nevoie să reacționeze imediat.
    </p>
    <p>Pentru ziua de astăzi, aplică regula celor 10 minute.</p>
    <p>De fiecare dată când apare pofta:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>amână orice reacție timp de 10 minute,</li>
      <li>respiră lent,</li>
      <li>observă ce se întâmplă în corp.</li>
    </ul>
    <p>Notează dacă pofta:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>a scăzut,</li>
      <li>s-a schimbat,</li>
      <li>a trecut complet.</li>
    </ul>
    <p>Nu contează ce faci după cele 10 minute. Contează că ai creat pauză.</p>
    <p>Seara, ascultă aceeași înregistrare audio.</p>
  </>
);
const enDescription = (
  <>
    <p><strong>Welcome,</strong></p>
    <p>
      Today you’ll learn to slow down. A craving often creates a sense of urgency, but your body can learn there’s no need to react immediately.
    </p>
    <p>For today, apply the 10-minute rule.</p>
    <p>Each time a craving appears:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>delay any reaction for 10 minutes,</li>
      <li>breathe slowly,</li>
      <li>notice what’s happening in your body.</li>
    </ul>
    <p>Write down whether the craving:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>decreased,</li>
      <li>changed,</li>
      <li>passed completely.</li>
    </ul>
    <p>It doesn’t matter what you do after the 10 minutes. What matters is that you created a pause.</p>
    <p>In the evening, listen to the same audio recording.</p>
  </>
);


const practice: Practice = {
  id: "Craving-Relief-Day-03",
  position: 3,
  title: { ro: "Ziua 3 – Pofta nu e o urgență", en: "Day 3 – A Craving Isn’t an Emergency" },
  name: { ro: "Pofta nu e o urgență", en: "A Craving Isn’t an Emergency" },
  intro: { ro: "Aplică regula celor 10 minute și observă cum se schimbă pofta.", en: "Apply the 10-minute rule and notice how the craving changes." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/valul-trece.mp3", en: "audioFilesEnAi/valul-trece-en.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
