import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      A mânca a devenit un act automat, deseori făcut rapid și fără a ne gândi prea mult la acest subiect, și unde
      distragerile au îndepărtat atenția de la actul real al consumului către televizoare, computere și smartphone-uri.
    </p>
    <p>
      Pentru ziua aceasta ia prânzul în liniște sau ascultând muzica preferată, rămâi conectat/ă la toate simțurile care
      sunt activate în timp ce mănânci, simte din plin gustul și aroma mâncării, senzațiile pe care le ai în cavitatea
      bucală. Înainte de culcare te invit să asculți înregistrarea de mai jos.
    </p>
    <p>
      Ascultă această înregistrare audio, care te va ajuta să te deconectezi de la situațiile stresante din viața ta și
      să îți recapeți stare de relaxare.
    </p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Eating has become an automatic act, often done quickly and without much thought, and distractions have shifted
      attention from the actual act of eating to TVs, computers, and phones.
    </p>
    <p>
      Today have lunch in peace or with your favourite music, stay connected to all the senses activated while you eat—
      taste and smell the food fully, the sensations in your mouth. Before bed we invite you to listen to the recording
      below.
    </p>
    <p>
      Listen to this audio; it will help you disconnect from stressful situations in your life and regain a state of
      relaxation.
    </p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-24',
  position: 24,
  title: { ro: 'Ziua 24', en: 'Day 24' },
  name: { ro: 'Ziua 24', en: 'Day 24' },
  intro: {
    ro: 'Mâncat conștient; deconectare și relaxare seara.',
    en: 'Mindful eating; disconnect and relax in the evening.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: {
    ro: 'audioFiles/deconectare-relaxare-vindecare.mp3',
    en: 'audioFilesEnAi/deconectare-relaxare-vindecare-en.mp3',
  },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
