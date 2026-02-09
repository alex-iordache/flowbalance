import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>De-a lungul vieţii tale, ai cunoscut, cu siguranţă, mai multe persoane care au contribuit la formarea ta personală şi profesională, la formarea omului care eşti acum. Aşterne-le pe fiecare dintre ele în gând.</p>
    <p>Pentru ziua aceasta fă o listă cu programele mentale, care te-au ajutat de-a lungul vieții, care poate au fost repetate de cei apropiați, poate de vreun profesor sau poate chiar de tine (de exemplu, pentru absolut orice, există o soluție; cere și ți se va da, orice șut în fund este un pas înainte).</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să te antrenezi mental şi emoţional pentru a deveni propriul architect al modului în care se va desfăşura viaţa ta.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Throughout your life, you’ve surely met people who contributed to your personal and professional development—to
      becoming who you are today. Bring each of them to mind.
    </p>
    <p>
      For today, make a list of the mental programs (beliefs / mantras) that helped you over time—maybe repeated by
      loved ones, a teacher, or even by you (for example: “There is a solution for everything”, “Ask and you shall
      receive”, “Every setback can move you forward”).
    </p>
    <p>
      Listen to this audio recording—it will help you train mentally and emotionally so you can become the architect of
      the way your life unfolds.
    </p>
  </>
);


const practice: Practice = {
  id: 'Goal-Achievement-Day-07',
  position: 7,
  title: { ro: 'Ziua 7', en: 'Day 7' },
  name: { ro: 'Ziua 7', en: 'Day 7' },
  intro: {
    ro: 'De-a lungul vieţii tale, ai cunoscut, cu siguranţă, mai multe persoane care au contribuit la formarea ta pe…',
    en: 'List the mental programs and beliefs that support you.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/vizualizarea-obiectului-personal.mp3', en: 'audioFilesEnAi/vizualizarea-obiectului-personal-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
