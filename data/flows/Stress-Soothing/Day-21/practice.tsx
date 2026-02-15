import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Atunci când oamenii poartă stres în corpurile lor, ei de multe ori nici măcar nu sunt conștienți de asta! Când
      suntem cu adevărat stresați, s-ar putea să simțim disconfort fizic, dar să nu-l conectăm la emoțiile noastre.
    </p>
    <p>
      Pentru ziua aceasta te invit să faci cunoștință cu corpul tău. Înainte de culcare, întins/ă pe pat, te rog, să
      descoperi cum se simte corpul tău, centimetru cu centimetru, te poți folosi de înregistrarea de mai jos. De azi
      înainte, te rog să îți amintești că el este partenerul tău de viață, el te susține în ceea ce faci. De aceea, ai
      grijă de el și ascultă-l zilnic.
    </p>
    <p>
      Ascultă această înregistrare audio, care te va ajuta să observi tensiunile înmagazinate la nivelul corpului și să
      relaxezi zonele tensionate.
    </p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      When people carry stress in their bodies, they often aren’t even aware of it. When we’re really stressed, we may
      feel physical discomfort but not connect it to our emotions.
    </p>
    <p>
      Today we invite you to get to know your body. Before bed, lying down, please discover how your body feels, inch
      by inch—you can use the recording below. From now on, remember that your body is your life partner; it supports
      you in what you do. So take care of it and listen to it every day.
    </p>
    <p>
      Listen to this audio; it will help you notice stored tension in your body and relax tense areas.
    </p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-21',
  position: 21,
  title: { ro: 'Ziua 21', en: 'Day 21' },
  name: { ro: 'Ziua 21', en: 'Day 21' },
  intro: {
    ro: 'Body scan: descoperă cum se simte corpul și relaxează tensiunile.',
    en: 'Body scan: discover how your body feels and release tension.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/body-scan.mp3', en: 'audioFilesEnAi/body-scan-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
