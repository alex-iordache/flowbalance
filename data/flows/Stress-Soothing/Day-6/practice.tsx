import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Astăzi adâncim relația cu <strong>activitățile care te deconectează de stres</strong>. Dimineața să o începi cu
      înregistrarea audio.
    </p>
    <p>Fă două liste:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>Activități care te ajută să te deconectezi la serviciu</li>
      <li>Activități care te ajută să te deconectezi în timpul personal</li>
    </ul>
    <p>Alege cel puțin una din fiecare listă și aplic-o conștient astăzi.</p>
    <p>Observă:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>Cum reacționează corpul?</li>
      <li>Ce se schimbă în starea emoțională?</li>
    </ul>
    <p>Seara, notează ce funcționează pentru tine.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Today we deepen the connection with <strong>activities that help you disconnect from stress</strong>. Start the
      morning with the audio recording.
    </p>
    <p>Make two lists:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>Activities that help you disconnect at work</li>
      <li>Activities that help you disconnect in your personal time</li>
    </ul>
    <p>Choose at least one from each list and do it consciously today.</p>
    <p>Notice:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>How does your body respond?</li>
      <li>What changes in your emotional state?</li>
    </ul>
    <p>In the evening, write down what works for you.</p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-06',
  position: 6,
  title: { ro: 'Ziua 6', en: 'Day 6' },
  name: { ro: 'Ziua 6', en: 'Day 6' },
  intro: {
    ro: 'Activități care te deconectează de stres, la serviciu și acasă.',
    en: 'Activities that disconnect you from stress, at work and at home.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/incepe-ziua-cu-bucurie.mp3', en: 'audioFiles/incepe-ziua-cu-bucurie.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
