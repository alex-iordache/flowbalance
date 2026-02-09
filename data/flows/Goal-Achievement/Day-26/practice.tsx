import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Antrenează-ți mintea să vadă bunătatea în orice. A fi pozitiv este o alegere. Fericirea din viața ta depinde de calitatea gândurilor tale.</p>
    <p>Pentru ziua aceasta pune pe hârtie programele negative pe care le-ai avut de-a lungul vieții rulate în minte, poate date de alții, poate dezvoltate de tine. De exemplu: nu sunt suficient de bună, nu merit, trebuie să muncesc din greu ca să obțin ceva, întâi trebuie să îi ajut pe alții, apoi pe mine. La finalul acestui exercițiu, gândește-te cu ce alt program vrei să îl înlocuiești. De data aceasta trebuie să fie un program mental care te ajută.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să ai încredere în tine și în acțiunile tale pentru a ajunge acolo unde îți dorești.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Train your mind to see goodness in everything. Being positive is a choice. Your happiness depends on the quality
      of your thoughts.
    </p>
    <p>
      For today, write down the negative mental programs you’ve run throughout your life—maybe inherited from others,
      maybe created by you. For example: “I’m not good enough”, “I don’t deserve”, “I must work very hard to get
      anything”, “I have to help others first, then myself.” At the end, choose a new mental program to replace one of
      them—this time it must support you.
    </p>
    <p>
      Listen to this audio recording—it will help you build confidence in yourself and your actions to get where you
      want to go.
    </p>
  </>
);


const practice: Practice = {
  id: 'Goal-Achievement-Day-26',
  position: 26,
  title: { ro: 'Ziua 26', en: 'Day 26' },
  name: { ro: 'Ziua 26', en: 'Day 26' },
  intro: {
    ro: 'Antrenează-ți mintea să vadă bunătatea în orice. A fi pozitiv este o alegere. Fericirea din viața ta depind…',
    en: 'Replace one negative mental program with a supportive one.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/incredere.mp3', en: 'audioFilesEnAi/incredere-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
