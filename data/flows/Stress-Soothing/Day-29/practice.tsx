import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Fiecare zi primită este un nou dar. Învață să te bucuri și să redescoperi cele mai frumoase cadouri din viața ta,
      pe care uneori le uităm sau nu suntem conștienți pe deplin de ele.
    </p>
    <p>
      Pentru ziua aceasta fii recunoscător/recunoscătoare pentru ceea ce ai azi în viața ta, fă o listă cu cel puțin 20
      de exemple. Înainte de culcare te invit să asculți înregistrarea de mai jos.
    </p>
    <p>
      Ascultă această înregistrare audio, care te va ajuta să te deconectezi de la situațiile stresante din viața ta și să
      îți recapeți stare de relaxare.
    </p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Each day we receive is a new gift. Learn to enjoy and rediscover the most beautiful gifts in your life, which we
      sometimes forget or aren’t fully aware of.
    </p>
    <p>
      Today be grateful for what you have in your life right now; make a list of at least 20 examples. Before bed we
      invite you to listen to the recording below.
    </p>
    <p>
      Listen to this audio; it will help you disconnect from stressful situations in your life and regain a state of
      relaxation.
    </p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-29',
  position: 29,
  title: { ro: 'Ziua 29', en: 'Day 29' },
  name: { ro: 'Ziua 29', en: 'Day 29' },
  intro: {
    ro: 'Recunoștință: cel puțin 20 de lucruri pentru care ești recunoscător.',
    en: 'Gratitude: at least 20 things you are grateful for.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: {
    ro: 'audioFiles/deconectare-relaxare-vindecare.mp3',
    en: 'audioFiles/deconectare-relaxare-vindecare.mp3',
  },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
