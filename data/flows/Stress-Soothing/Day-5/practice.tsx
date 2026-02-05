import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Astăzi lucrăm cu <strong>starea de fond</strong> cu care începi ziua. Modul în care îți începi dimineața
      influențează nivelul de stres pe tot parcursul zilei.
    </p>
    <p>Dimineața, înainte de a intra în ritmul obișnuit, notează:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>Cum mă simt în corp chiar acum?</li>
      <li>Ce gând domină începutul zilei?</li>
    </ul>
    <p>
      Alege conștient <strong>un gest mic</strong> care îți aduce o stare de bine (respirație, mișcare, liniște, muzică).
    </p>
    <p>Pe parcursul zilei, observă:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>Cum se modifică nivelul de stres când pornesc dintr-o stare diferită?</li>
    </ul>
    <p>Dimineața ascultă înregistrarea audio pentru a ancora o stare de bucurie.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Today we work with the <strong>baseline state</strong> you start the day with. How you begin your morning affects
      your stress level for the rest of the day.
    </p>
    <p>In the morning, before you get into your usual rhythm, note:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>How do I feel in my body right now?</li>
      <li>What thought dominates the start of the day?</li>
    </ul>
    <p>
      Consciously choose <strong>one small gesture</strong> that brings you a sense of wellbeing (breathing, movement,
      silence, music).
    </p>
    <p>Throughout the day, notice:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>How does your stress level change when you start from a different state?</li>
    </ul>
    <p>In the morning, listen to the audio to anchor a state of ease and lightness.</p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-05',
  position: 5,
  title: { ro: 'Ziua 5', en: 'Day 5' },
  name: { ro: 'Ziua 5', en: 'Day 5' },
  intro: {
    ro: 'Începe ziua cu un gest care îți aduce stare de bine.',
    en: 'Start the day with a gesture that brings you wellbeing.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/incepe-ziua-cu-bucurie.mp3', en: 'audioFiles/incepe-ziua-cu-bucurie.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
