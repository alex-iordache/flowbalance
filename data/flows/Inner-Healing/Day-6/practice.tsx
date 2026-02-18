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

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Music is a gift that heals us—first of all, our soul. Music influences our behaviour and mood. If you use an alarm
      clock with a “stressful” melody, the transition from deep sleep to wakefulness happens abruptly and, most likely,
      you’ll start your day feeling stressed. Surround yourself with the most beautiful music—the kind that makes your
      soul vibrate with happiness.
    </p>
    <p>
      For today, find an instrumental song you truly like, lie down, and listen with headphones. While you do this,
      notice what states it brings up and how different parts of your body feel as you listen.
    </p>
    <p>
      Every morning when you wake up—before getting out of bed (if you need to use the bathroom, you can do that and then
      come back)—count in your mind from 100 down to 1. Keep your gaze about 20 degrees upward compared to your usual
      position, with your eyes closed. After you finish counting, remember a time when your body felt full of vitality
      and health, and visualise yourself walking as you did then.
    </p>
    <p>
      In the evening, listen to this audio recording—it will help you connect with your emotions. If you fall asleep
      before the recording ends, that’s perfectly fine.
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
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/conectarea-la-propriile-emotii.mp3', en: 'audioFilesEnAi/conectarea-la-propriile-emotii-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;

