import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Astăzi ne axăm pe modul în care funcționează mintea.</p>
    <p>Pentru ziua aceasta renunță la rețelele sociale pentru o zi și vezi ce se întâmplă.</p>
    <p>Scrie pe un post-it și pune la vedere:</p>
    <ol className="list-decimal pl-5 mt-2 space-y-1">
      <li>Gândurile mele sunt forțe reale.</li>
      <li>Mintea mea trimite și primește gânduri.</li>
      <li>Gândurile cu emoție atrag gânduri similare.</li>
      <li>Pot insera gânduri noi, conștient.</li>
      <li>Pot înlocui gândurile care nu mă ajută.</li>
    </ol>
    <p>Pe parcursul zilei, observă ce gânduri se repetă în situații stresante. Nu le schimba încă. Doar observă-le.</p>
    <p>Dimineața ascultă înregistrarea audio.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>Today we focus on how the mind works.</p>
    <p>For today, take a break from social media for one day and see what happens.</p>
    <p>Write on a post-it and put it where you can see it:</p>
    <ol className="list-decimal pl-5 mt-2 space-y-1">
      <li>My thoughts are real forces.</li>
      <li>My mind sends and receives thoughts.</li>
      <li>Thoughts charged with emotion attract similar thoughts.</li>
      <li>I can insert new thoughts, consciously.</li>
      <li>I can replace thoughts that don’t serve me.</li>
    </ol>
    <p>Throughout the day, notice which thoughts repeat in stressful situations. Don’t change them yet. Just observe.</p>
    <p>In the morning, listen to the audio.</p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-08',
  position: 8,
  title: { ro: 'Ziua 8', en: 'Day 8' },
  name: { ro: 'Ziua 8', en: 'Day 8' },
  intro: {
    ro: 'Cum funcționează mintea: observă gândurile în situații stresante.',
    en: 'How the mind works: notice thoughts in stressful situations.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/incepe-ziua-cu-bucurie.mp3', en: 'audioFiles/incepe-ziua-cu-bucurie.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
