import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Astăzi este prima zi a acestui program și începutul unui proces de observare conștientă a stresului, nu de luptă cu
      el. Scopul zilei de astăzi nu este să schimbi nimic, ci să înțelegi <strong>cum apare stresul în viața ta</strong>{' '}
      și cum se manifestă în corp, minte și emoții.
    </p>
    <p>Pe parcursul zilei, atunci când apare o situație care te deranjează sau te tensionează, notează în scris:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>situația concretă care a declanșat stresul</li>
      <li>ce gânduri au apărut automat</li>
      <li>ce emoții sau stări ai simțit</li>
      <li>
        <strong>ce parte a corpului s-a încordat</strong> (ex: gât, piept, stomac, maxilar)
      </li>
    </ul>
    <p>Nu analiza, nu corecta, nu judeca. Observă.</p>
    <p>La finalul zilei, răspunde în scris la aceste întrebări:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>Ce anume mi-am dorit să obțin din acel context stresant?</li>
      <li>Ce oportunitate de învățare ar putea exista aici, chiar dacă nu o văd clar acum?</li>
    </ul>
    <p>Seara, ascultă înregistrarea audio. Lasă corpul să proceseze ceea ce mintea a început să observe.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Today is the first day of this program and the start of a process of consciously observing stress, not fighting it.
      The aim today is not to change anything, but to understand <strong>how stress shows up in your life</strong> and how
      it shows up in your body, mind, and emotions.
    </p>
    <p>Throughout the day, when a situation bothers or tenses you, write down:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>the specific situation that triggered the stress</li>
      <li>what thoughts arose automatically</li>
      <li>what emotions or states you felt</li>
      <li>
        <strong>which part of your body tensed</strong> (e.g. neck, chest, stomach, jaw)
      </li>
    </ul>
    <p>Don’t analyse, correct, or judge. Just observe.</p>
    <p>At the end of the day, answer in writing:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>What did I want to get from that stressful context?</li>
      <li>What learning opportunity might be here, even if I don’t see it clearly yet?</li>
    </ul>
    <p>In the evening, listen to the audio recording. Let your body process what your mind has begun to notice.</p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-01',
  position: 1,
  title: { ro: 'Ziua 1', en: 'Day 1' },
  name: { ro: 'Ziua 1', en: 'Day 1' },
  intro: {
    ro: 'Observă cum apare stresul în viața ta și cum se manifestă în corp, minte și emoții.',
    en: 'Notice how stress appears in your life and how it shows up in body, mind, and emotions.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/trecerea-peste-obstacole.mp3', en: 'audioFilesEnAi/trecerea-peste-obstacole-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
