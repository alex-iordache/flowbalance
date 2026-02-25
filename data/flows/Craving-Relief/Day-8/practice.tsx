import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Bun găsit,</strong></p>
    <p>
      Astăzi introducem ideea de alegere. După pauză, poți alege conștient ce faci mai departe.
    </p>
    <p>
      Alegerea nu înseamnă perfecțiune. Înseamnă prezență.
    </p>
    <p>Spune-ți:</p>
    <p><em>„Aleg conștient ce fac acum.”</em></p>
    <p>Indiferent de decizie, observă cum te simți.</p>
    <p>Seara, ascultă înregistrarea audio.</p>
  </>
);
const enDescription = (
  <>
    <p><strong>Welcome,</strong></p>
    <p>
      Today we introduce the idea of choice. After the pause, you can consciously choose what you do next.
    </p>
    <p>
      Choice doesn’t mean perfection. It means presence.
    </p>
    <p>Tell yourself:</p>
    <p><em>“I choose consciously what I do now.”</em></p>
    <p>Whatever the decision, notice how you feel.</p>
    <p>In the evening, listen to the audio recording.</p>
  </>
);


const practice: Practice = {
  id: "Craving-Relief-Day-08",
  position: 8,
  title: { ro: "Ziua 8 – Alegerea conștientă", en: "Day 8 – Conscious Choice" },
  name: { ro: "Alegerea conștientă", en: "Conscious Choice" },
  intro: { ro: "După pauză, alege conștient și observă efectul în corp.", en: "After the pause, choose consciously and notice the effect in your body." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/butonul-de-pauza-alegerea-constienta.mp3", en: "audioFilesEnAi/butonul-de-pauza-alegerea-constienta-en.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;
