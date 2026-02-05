import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Cu toții ne dorim să primim un zâmbet uneori, iar alteori oferim noi celor dragi un strop de dragoste prin
      zâmbetul nostru.
    </p>
    <p>Propune-ți azi să aduci zâmbetul a trei persoane din viața ta. Remarcă cum te simți după ce faci asta.</p>
    <p>
      Adu-ți aminte ca, în fiecare dimineață, să asculți propria înregistrare care te ajută să întâmpini ziua cu bucurie.
    </p>
    <p>Ascultă propria înregistrare audio, care te va ajuta să te încarci cu energie pozitivă.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      We all like to receive a smile sometimes, and other times we give our loved ones a drop of love through our smile.
    </p>
    <p>Set yourself the goal today of bringing a smile to three people in your life. Notice how you feel after doing it.</p>
    <p>Remember to listen each morning to your own recording that helps you meet the day with ease.</p>
    <p>Listen to your own audio recording; it will help you charge yourself with positive energy.</p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-14',
  position: 14,
  title: { ro: 'Ziua 14', en: 'Day 14' },
  name: { ro: 'Ziua 14', en: 'Day 14' },
  intro: {
    ro: 'Adu zâmbetul a trei persoane; ascultă propria înregistrare dimineața.',
    en: 'Bring a smile to three people; listen to your own recording in the morning.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/relaxare-prin-respiratie.mp3', en: 'audioFiles/relaxare-prin-respiratie.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
