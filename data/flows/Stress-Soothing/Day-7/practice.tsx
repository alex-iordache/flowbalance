import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Astăzi lucrăm cu <strong>sprijinul extern</strong>, un element esențial în reducerea stresului.
    </p>
    <p>Identifică o persoană din viața ta căreia îi poți comunica:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>ce schimbări vrei să faci</li>
      <li>ce îți propui să îmbunătățești în relația cu stresul</li>
    </ul>
    <p>Scrie ce ai vrea să îi spui și, dacă este posibil, comunică-i acest lucru.</p>
    <p>Observă ce emoții apar când ceri sprijin.</p>
    <p>Dimineața ascultă înregistrarea audio și permite corpului să se relaxeze.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Today we work with <strong>external support</strong>, an essential element in reducing stress.
    </p>
    <p>Identify someone in your life you can tell:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>what changes you want to make</li>
      <li>what you’re aiming to improve in your relationship with stress</li>
    </ul>
    <p>Write down what you’d like to say and, if possible, share it with them.</p>
    <p>Notice what emotions come up when you ask for support.</p>
    <p>In the morning, listen to the audio and allow your body to relax.</p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-07',
  position: 7,
  title: { ro: 'Ziua 7', en: 'Day 7' },
  name: { ro: 'Ziua 7', en: 'Day 7' },
  intro: {
    ro: 'Sprijinul extern: comunică cu cineva despre schimbările tale.',
    en: 'External support: share with someone about your changes.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/incepe-ziua-cu-bucurie.mp3', en: 'audioFiles/incepe-ziua-cu-bucurie.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
