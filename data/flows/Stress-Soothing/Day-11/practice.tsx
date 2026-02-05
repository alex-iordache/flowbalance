import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Antrenează-ți mintea să vadă bunătatea în jur. A fi pozitiv este o alegere. Fericirea din viața ta depinde de
      calitatea gândurilor tale.
    </p>
    <p>Pentru ziua aceasta fă o listă de gânduri negative și vezi cu ce gânduri pozitive ai putea să le schimbi pentru viitor.</p>
    <p>
      <strong>Alege o situație care te-a deranjat astăzi și notează:</strong>
    </p>
    <ul className="list-disc pl-5 mt-2">
      <li>Ce s-a întâmplat concret?</li>
      <li>Ce gânduri, emoții și sentimente ți-a trezit?</li>
      <li>În ce parte a corpului ai simțit tensiune sau încordare?</li>
    </ul>
    <p>
      Ascultă această înregistrare audio, care te va ajuta să vezi situația respectivă dintr-un alt unghi și să găsești
      soluția potrivită pentru tine.
    </p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Train your mind to see the good around you. Being positive is a choice. The happiness in your life depends on the
      quality of your thoughts.
    </p>
    <p>
      Today make a list of negative thoughts and see which positive thoughts you could use to replace them in the
      future.
    </p>
    <p>
      <strong>Choose a situation that bothered you today and note:</strong>
    </p>
    <ul className="list-disc pl-5 mt-2">
      <li>What actually happened?</li>
      <li>What thoughts, emotions, and feelings did it trigger?</li>
      <li>Where in your body did you feel tension or tightness?</li>
    </ul>
    <p>
      Listen to this audio; it will help you see that situation from another angle and find the right solution for you.
    </p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-11',
  position: 11,
  title: { ro: 'Ziua 11', en: 'Day 11' },
  name: { ro: 'Ziua 11', en: 'Day 11' },
  intro: {
    ro: 'Gânduri negative vs. pozitive; analizează o situație care te-a deranjat.',
    en: 'Negative vs. positive thoughts; analyse a situation that bothered you.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/coplesit-de-griji.mp3', en: 'audioFiles/coplesit-de-griji.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
