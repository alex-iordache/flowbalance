import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Astăzi este prima zi a călătoriei tale, în care te vei conecta cu propriul tău corp şi vei conştientiza fiecare parte
      a sa. De astăzi, vei deveni mai conștient/ă de nevoile corpului tău.
    </p>
    <p>
      Pentru ziua aceasta, te invit să îți repeți de cel puțin 5 ori următoarele afirmații: Singurul meu partener de viață,
      care mă însoțește peste tot, este CORPUL meu. Îți mulțumesc pentru toate eforturile pe care le-ai făcut pentru mine
      până acum.
    </p>
    <p>
      Ascultă această înregistrare audio, care te va ajuta să te deconectezi de la situaţiile stresante din viaţa ta şi să
      îţi recapeţi starea de relaxare. Te rog să asculți înregistrarea seara, înainte de culcare. Dacă adormi înainte să se
      termine înregistrarea nu este nicio problemă.
    </p>
  </>
);

const practice: Practice = {
  id: 'Inner-Healing-Day-01',
  position: 1,
  title: { ro: 'Ziua 1', en: 'Day 1' },
  name: { ro: 'Ziua 1', en: 'Day 1' },
  intro: {
    ro: 'Afirmații + relaxare seara.',
    en: 'Affirmations + evening relaxation.',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/deconectare-relaxare-vindecare.mp3', en: 'audioFiles/deconectare-relaxare-vindecare.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;

