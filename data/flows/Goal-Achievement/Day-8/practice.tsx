import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Nicio persoană nu își va depăși cele mai îndrăznețe așteptări, dacă nu va începe cu așteptări îndrăznețe. Fiecare zi reprezintă un pas mic, dar care te va aduce mai aproape de realizarea visului tău.</p>
    <p>Pentru ziua aceasta pune pe hârtie 3 cele mai importante obiective pentru tine azi, care au legătură cu obiectivul principal și ține-te de ele.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să te antrenezi mental şi emoţional pentru a deveni propriul architect al modului în care se va desfăşura viaţa ta.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      No one will surpass their boldest expectations if they don’t start with bold expectations. Every day is a small
      step that brings you closer to making your dream real.
    </p>
    <p>
      For today, write down the 3 most important goals for you today that are connected to your main objective—and keep
      your commitment to them.
    </p>
    <p>
      Listen to this audio recording—it will help you train mentally and emotionally so you can become the architect of
      the way your life unfolds.
    </p>
  </>
);


const practice: Practice = {
  id: 'Goal-Achievement-Day-08',
  position: 8,
  title: { ro: 'Ziua 8', en: 'Day 8' },
  name: { ro: 'Ziua 8', en: 'Day 8' },
  intro: {
    ro: 'Nicio persoană nu își va depăși cele mai îndrăznețe așteptări, dacă nu va începe cu așteptări îndrăznețe. F…',
    en: 'Set bold expectations and commit to 3 key actions today.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/vizualizarea-obiectului-personal.mp3', en: 'audioFiles/vizualizarea-obiectului-personal.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
