import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Antrenează-ți mintea să vadă bunătatea în orice. A fi pozitiv este o alegere. Fericirea din viața ta depinde de calitatea gândurilor tale.</p>
    <p>Pentru ziua aceasta pune pe hârtie programele negative pe care le-ai avut de-a lungul vieții rulate în minte, poate date de alții, poate dezvoltate de tine. De exemplu: nu sunt suficient de bună, nu merit, trebuie să muncesc din greu ca să obțin ceva, întâi trebuie să îi ajut pe alții, apoi pe mine. La finalul acestui exercițiu, gândește-te cu ce alt program vrei să îl înlocuiești. De data aceasta trebuie să fie un program mental care te ajută.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să ai încredere în tine și în acțiunile tale pentru a ajunge acolo unde îți dorești.</p>
  </>
)


const practice: Practice = {
  id: 'Goal-Achievement-Day-26',
  position: 26,
  title: { ro: 'Ziua 26', en: 'Day 26' },
  name: { ro: 'Ziua 26', en: 'Day 26' },
  intro: {
    ro: 'Antrenează-ți mintea să vadă bunătatea în orice. A fi pozitiv este o alegere. Fericirea din viața ta depind…',
    en: 'AIT',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/incredere.mp3', en: 'audioFiles/incredere.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
