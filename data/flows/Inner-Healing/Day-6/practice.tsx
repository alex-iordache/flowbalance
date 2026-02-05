import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Muzica este un dar care ne vindecă, în primul rând, sufletul. Muzica ne influențează comportamentul și starea de
      spirit. Dacă foloseşti un ceas cu alarmă care are o melodie “stresantă”, trecerea din starea profundă de somn în cea
      de treaz, se face brusc și, cu siguranță, vei avea o zi stresantă. Înconjoară-te de cea mai frumoasă muzica, de
      muzica care îţi face sufletul să vibreze de fericire.
    </p>
    <p>
      Pentru ziua aceasta, te rog sa găsești o melodie instrumentală care îți place ție foarte tare, să te întinzi și să o
      asculți la căști. În timp ce faci asta, remarcă ce stări îți induce, cum se simt diferite părți din corpul tău
      ascultând această melodie.
    </p>
    <p>
      În fiecare dimineață când te trezești, înainte să te dai jos din pat (dacă îți vine să mergi la toaletă, o poți face și
      apoi te întorci în pat), numeri în gând de la 100 la 1. Privirea o ții cam la 20 grade în sus față de poziția în care
      privești de obicei. Ochii îi menții închiși. După ce numeri, îți aduci aminte de o perioadă în care corpul tău era plin
      de vitalitate, de sănătate, te vizualizezi cum mergeai atunci.
    </p>
    <p>
      Ascultă această înregistrare audio seara, care te va ajuta să te conectezi cu propriile emoţii. Dacă adormi înainte să
      se termine înregistrarea nu este nicio problemă.
    </p>
  </>
);

const practice: Practice = {
  id: 'Inner-Healing-Day-06',
  position: 6,
  title: { ro: 'Ziua 6', en: 'Day 6' },
  name: { ro: 'Ziua 6', en: 'Day 6' },
  intro: {
    ro: 'Muzică + conectare cu emoțiile.',
    en: 'Music + connect with emotions.',
  },
  description: { ro: roDescription, en: 'AIT' },
  audioUrl: { ro: 'audioFiles/conectarea-la-propriile-emotii.mp3', en: 'audioFiles/conectarea-la-propriile-emotii.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;

