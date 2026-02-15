import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Când a fost ultima dată când ți-ai surprins apropiații cu un gest, cu un zâmbet sau cu un sfat? Gândește-te cum ai
      putea să aduci bucurie pe fețele oamenilor importanți din viața ta.
    </p>
    <p>
      Pentru ziua aceasta ai putea face 5 lucruri frumoase pentru apropiații tăi, nu ceva ce faci poate zi de zi, altceva.
      Înainte de culcare te invit să asculți înregistrarea de mai jos.
    </p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      When was the last time you surprised your loved ones with a gesture, a smile, or a piece of advice? Think about
      how you could bring joy to the faces of the important people in your life.
    </p>
    <p>
      Today you could do 5 kind things for those close to you—not the usual everyday things, something different.
      Before bed we invite you to listen to the recording below.
    </p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-28',
  position: 28,
  title: { ro: 'Ziua 28', en: 'Day 28' },
  name: { ro: 'Ziua 28', en: 'Day 28' },
  intro: {
    ro: '5 lucruri frumoase pentru apropiați; relaxare seara.',
    en: '5 kind things for loved ones; evening relaxation.',
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
