import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>De-a lungul vieţii tale, ai cunoscut, cu siguranţă, mai multe persoane care au contribuit la formarea ta personală şi profesională, la formarea omului care eşti acum. Aşterne-le pe fiecare dintre ele în gând.</p>
    <p>Pentru ziua aceasta fă o listă cu programele mentale, care te-au ajutat de-a lungul vieții, care poate au fost repetate de cei apropiați, poate de vreun profesor sau poate chiar de tine (de exemplu, pentru absolut orice, există o soluție; cere și ți se va da, orice șut în fund este un pas înainte).</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să te antrenezi mental şi emoţional pentru a deveni propriul architect al modului în care se va desfăşura viaţa ta.</p>
  </>
)


const practice: Practice = {
  id: 'Goal-Achievement-Day-07',
  position: 7,
  title: { ro: 'Ziua 7', en: 'Day 7' },
  name: { ro: 'Ziua 7', en: 'Day 7' },
  intro: {
    ro: 'De-a lungul vieţii tale, ai cunoscut, cu siguranţă, mai multe persoane care au contribuit la formarea ta pe…',
    en: 'AIT',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/vizualizarea-obiectului-personal.mp3', en: 'audioFiles/vizualizarea-obiectului-personal.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
