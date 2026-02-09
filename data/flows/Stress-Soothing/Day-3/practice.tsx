import type { Practice } from '../../types';

const roDescription = (
  <>
    <p>Bun găsit,</p>
    <p>
      Astăzi mutăm focusul de la problemă la <strong>resursă</strong>. Stresul nu apare doar din situații, ci și din
      neutulizarea unei calități interioare necesare în acel context.
    </p>
    <p>Gândește-te la situațiile în care stresul apare frecvent și răspunde în scris:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>Ce calitate mi-ar fi fost de folos aici? (ex: calm, fermitate, claritate, răbdare, curaj)</li>
      <li>Cum m-aș fi simțit dacă aș fi avut această calitate în acel moment?</li>
      <li>Ce impact ar avea această calitate asupra relațiilor mele, muncii mele și stării mele de bine?</li>
    </ul>
    <p>
      Alege <strong>o singură calitate</strong> pe care vrei să o dezvolți în mod conștient în următoarele zile.
    </p>
    <p>Pe parcursul zilei, spune-ți mental: „Îmi permit să cultiv această calitate în ritmul meu.”</p>
    <p>Seara, ascultă înregistrarea audio, lăsând mintea și corpul să înceapă procesul de integrare.</p>
  </>
);

const enDescription = (
  <>
    <p>Welcome,</p>
    <p>
      Today we shift focus from problem to <strong>resource</strong>. Stress doesn’t only come from situations, but also
      from the lack of an inner quality that was needed in that context.
    </p>
    <p>Think about situations where stress often appears and answer in writing:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>What quality would have helped me here? (e.g. calm, firmness, clarity, patience, courage)</li>
      <li>How would I have felt if I had had this quality in that moment?</li>
      <li>What impact would this quality have on my relationships, work, and wellbeing?</li>
    </ul>
    <p>Choose <strong>one quality</strong> you want to develop consciously in the coming days.</p>
    <p>Throughout the day, say to yourself mentally: “I allow myself to cultivate this quality at my own pace.”</p>
    <p>In the evening, listen to the audio, letting your mind and body begin to integrate it.</p>
  </>
);

const practice: Practice = {
  id: 'Stress-Soothing-Day-03',
  position: 3,
  title: { ro: 'Ziua 3', en: 'Day 3' },
  name: { ro: 'Ziua 3', en: 'Day 3' },
  intro: {
    ro: 'De la problemă la resursă: alege o calitate de dezvoltat.',
    en: 'From problem to resource: choose one quality to develop.',
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: 'audioFiles/calitatea-de-care-ai-nevoie.mp3', en: 'audioFilesEnAi/calitatea-de-care-ai-nevoie-en.mp3' },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
