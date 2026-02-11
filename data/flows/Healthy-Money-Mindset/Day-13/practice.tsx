import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Astăzi încheiem acest program prin integrare. Integrarea înseamnă să alegi conștient ce faci diferit, nu să te schimbi complet.
    </p>
    <p>
      Reflectează la cele 12 zile parcurse: cum te-ai simțit, ce s-a schimbat în tine, ce iei mai departe din această experiență și ce înseamnă pentru tine conexiunea cu sinele tău.
    </p>
    <p>
      <strong>Reflecția zilei:</strong> „În fiecare moment din fiecare zi îmi trăiesc viața din plin.”
    </p>
    <p>
      Seara, ascultă audio-ul final, care te ajută să integrezi o relație mai calmă, mai stabilă și mai matură cu banii.
    </p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Today we close this program through integration. Integration means consciously choosing what you do differently—not changing yourself completely.
    </p>
    <p>
      Reflect on the 12 days you completed: how you felt, what shifted in you, what you’re taking forward from this experience, and what connection to your inner self means for you.
    </p>
    <p>
      <strong>Reflection of the day:</strong> “In every moment of every day, I live my life fully.”
    </p>
    <p>
      In the evening, listen to the final audio, which helps you integrate a calmer, steadier, and more mature relationship with money.
    </p>
  </>
);

const practice: Practice = {
  id: "Healthy-Money-Mindset-Day-13",
  position: 13,
  title: { ro: "Ziua 13 – Integrare: obiective, încredere și rezolvare", en: "Day 13 – Integration: Goals, Trust, and Resolution" },
  name: { ro: "Integrare: obiective, încredere și rezolvare", en: "Integration: Goals, Trust, and Resolution" },
  intro: { ro: "Integrează: ce păstrezi, ce alegi diferit, ce duci mai departe cu stabilitate.", en: "Integrate: what you keep, what you choose differently, what you carry forward with steadiness." },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/integrare-obiective-incredere-si-rezolvare.mp3", en: "audioFilesEnAi/integrare-obiective-incredere-si-rezolvare-en.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;

