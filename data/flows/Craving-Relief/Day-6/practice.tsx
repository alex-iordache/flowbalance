import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Bun găsit,</strong></p>
    <p>
      Astăzi lucrăm cu blândețea față de tine. Lupta cu pofta întărește impulsul. Compasiunea îl slăbește.
    </p>
    <p>
      Ori de câte ori apare pofta, spune-ți: <em>„Fac tot ce pot, cu resursele pe care le am acum.”</em>
    </p>
    <p>Alege o acțiune mică, sănătoasă, care să arate grija față de tine, de exemplu:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>o pauză,</li>
      <li>o plimbare,</li>
      <li>câteva respirații profunde.</li>
    </ul>
    <p>Seara, ascultă înregistrarea audio.</p>
  </>
);
const enDescription = (
  <>
    <p><strong>Welcome,</strong></p>
    <p>
      Today we work with gentleness toward yourself. Fighting a craving strengthens the impulse. Compassion weakens it.
    </p>
    <p>
      Whenever a craving appears, tell yourself: <em>“I’m doing the best I can, with the resources I have right now.”</em>
    </p>
    <p>Choose one small, healthy action that shows care for yourself, for example:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>a break,</li>
      <li>a walk,</li>
      <li>a few deep breaths.</li>
    </ul>
    <p>In the evening, listen to the audio recording.</p>
  </>
);


const practice: Practice = {
  id: "Craving-Relief-Day-06",
  position: 6,
  title: { ro: "Ziua 6 – Autocompasiune", en: "Day 6 – Self-Compassion" },
  name: { ro: "Autocompasiune", en: "Self-Compassion" },
  intro: { ro: "Înlocuiește lupta cu blândețe și alege o acțiune mică de grijă.", en: "Replace struggle with kindness and choose one small caring action." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/autocompasiune.mp3", en: "audioFilesEnAi/autocompasiune-en.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
