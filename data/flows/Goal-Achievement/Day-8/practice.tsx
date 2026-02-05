import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>Nicio persoană nu își va depăși cele mai îndrăznețe așteptări, dacă nu va începe cu așteptări îndrăznețe. Fiecare zi reprezintă un pas mic, dar care te va aduce mai aproape de realizarea visului tău.</p>
    <p>Pentru ziua aceasta pune pe hârtie 3 cele mai importante obiective pentru tine azi, care au legătură cu obiectivul principal și ține-te de ele.</p>
    <p>Ascultă această înregistrare audio, care te va ajuta să te antrenezi mental şi emoţional pentru a deveni propriul architect al modului în care se va desfăşura viaţa ta.</p>
  </>
)


const practice: Practice = {
  id: 'Goal-Achievement-Day-08',
  position: 8,
  title: { ro: 'Ziua 8', en: 'Day 8' },
  name: { ro: 'Ziua 8', en: 'Day 8' },
  intro: {
    ro: 'Nicio persoană nu își va depăși cele mai îndrăznețe așteptări, dacă nu va începe cu așteptări îndrăznețe. F…',
    en: 'AIT',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/vizualizarea-obiectului-personal.mp3', en: 'audioFiles/vizualizarea-obiectului-personal.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
