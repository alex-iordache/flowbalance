import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Ai încercat vreodată să privești grijile și dintr-o altă perspectivă? Fii conștient/ă de acestea și vezi impactul
      pe care îl au asupra ta.
    </p>
    <p>Pentru ziua aceasta fă o listă cu grijile pe care le ai în acest moment.</p>
    <p>
      <strong>Pornește de la situația notată ieri și răspunde în scris:</strong>
    </p>
    <ul className="list-disc pl-5 mt-2">
      <li>Ce aș fi vrut să obțin din acest context?</li>
      <li>Care ar putea fi oportunitatea de învățare aici?</li>
      <li>Ce m-ar sfătui partea mea interioară înțeleaptă?</li>
    </ul>
    <p>
      <strong>Notează ce ai fi putut face diferit, chiar și un pas mic.</strong>
    </p>
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
      Have you ever tried to look at your worries from another perspective? Be aware of them and notice the impact they
      have on you.
    </p>
    <p>Today make a list of the worries you have right now.</p>
    <p>
      <strong>Starting from the situation you noted yesterday, answer in writing:</strong>
    </p>
    <ul className="list-disc pl-5 mt-2">
      <li>What did I want to get from that context?</li>
      <li>What could be the learning opportunity here?</li>
      <li>What would my wiser inner part advise me?</li>
    </ul>
    <p>
      <strong>Write down what you could have done differently, even one small step.</strong>
    </p>
    <p>
      Listen to this audio; it will help you see that situation from another angle and find the right solution for you.
    </p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-12',
  position: 12,
  title: { ro: 'Ziua 12', en: 'Day 12' },
  name: { ro: 'Ziua 12', en: 'Day 12' },
  intro: {
    ro: 'Privește grijile din alt unghi; ce ai putut face diferit?',
    en: 'Look at worries from another angle; what could you have done differently?',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/coplesit-de-griji.mp3', en: 'audioFiles/coplesit-de-griji.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
