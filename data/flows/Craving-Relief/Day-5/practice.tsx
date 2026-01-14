import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Bun găsit,</strong></p>
    <p>
      Astăzi explorăm legătura dintre poftă și emoții. De multe ori, pofta apare ca o formă de alinare.
    </p>
    <p>Pentru ziua de astăzi, notează:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>ce emoție este prezentă atunci când apare pofta,</li>
      <li>ce s-a întâmplat în acea zi.</li>
    </ul>
    <p>Nu încerca să rezolvi emoția. Doar recunoaște-o.</p>
    <p>Spune-ți: <em>„Este firesc să simt asta.”</em></p>
    <p>Seara, ascultă înregistrarea audio, permițând corpului să se liniștească.</p>
  </>
);
const enDescription = (
  <>
    <p><strong>Welcome,</strong></p>
    <p>
      Today we explore the connection between cravings and emotions. Often, a craving shows up as a form of soothing.
    </p>
    <p>For today, write down:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>what emotion is present when the craving appears,</li>
      <li>what happened that day.</li>
    </ul>
    <p>Don’t try to fix the emotion. Just acknowledge it.</p>
    <p>Tell yourself: <em>“It’s natural to feel this.”</em></p>
    <p>In the evening, listen to the audio recording, allowing your body to settle.</p>
  </>
);


const practice: Practice = {
  id: "Craving-Relief-Day-05",
  position: 5,
  title: { ro: "Ziua 5 – Pofta și emoțiile", en: "Day 5 – Cravings and Emotions" },
  name: { ro: "Pofta și emoțiile", en: "Cravings and Emotions" },
  intro: { ro: "Recunoaște emoția din spatele poftei, fără să o rezolvi.", en: "Acknowledge the emotion underneath the craving—without trying to fix it." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/ce-incerc-sa-simt-dialog-cu-partea-care-cere.mp3", en: "audioFiles/ce-incerc-sa-simt-dialog-cu-partea-care-cere.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
