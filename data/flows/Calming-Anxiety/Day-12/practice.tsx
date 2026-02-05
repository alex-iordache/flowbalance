import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Fiecare zi primită este un nou dar. Învață să te bucuri și să redescoperi cele mai frumoase cadouri din viața ta,
      pe care uneori le uităm și nu suntem conștienți pe deplin de ele.
    </p>
    <p>
      <strong>Pentru ziua aceasta spune-i cuiva cinci lucruri pe care le apreciezi la tine.</strong>
    </p>
    <p>
      Ascultă această înregistrare audio, care te va ajuta să identifici problemele la nivel fizic, cât și cauzele care
      le-au produs de la nivel emoțional.
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
      <strong>For today, tell someone five things you appreciate about yourself.</strong>
    </p>
    <p>
      Listen to this audio; it will help you identify issues at the physical level and the emotional causes behind them.
    </p>
  </>
);

const practice: Practice = {
  id: 'Calming-Anxiety-Day-12',
  position: 12,
  title: { ro: 'Ziua 12', en: 'Day 12' },
  name: { ro: 'Ziua 12', en: 'Day 12' },
  intro: {
    ro: 'Spune cuiva 5 lucruri pe care le apreciezi la tine; audio corp și emoții.',
    en: 'Tell someone 5 things you appreciate about yourself; body and emotions audio.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: {
    ro: 'audioFiles/conectarea-la-propriile-emotii.mp3',
    en: 'audioFiles/conectarea-la-propriile-emotii.mp3',
  },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
