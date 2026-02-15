import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Bun găsit,</strong></p>
    <p>
      Astăzi este prima zi a călătoriei tale, un prim pas spre drumul către succesul personal, în care vei obţine liniştea
      interioară de care ai nevoie, dar şi metode la îndemână prin care să elimini tensiunile, stările de oboseală şi să
      îţi recapeţi pofta de viaţă.
    </p>

    <p><strong>Exercițiu:</strong></p>
    <p>
      Pentru ziua aceasta, te rog să menționezi într-un caiet de lucru care este obiectivul tău legat de somn. De exemplu,
      ai putea să îți stabilești o oră mai devreme de somn sau să dormi mai mult. Odată ce ai stabilit propriul obiectiv,
      te rog să te gândești la o perioadă în care ți-a ieșit acest obiectiv și să treci pe hârtie ce anume ai făcut atunci
      ca să îți iasă.
    </p>
    <p>Te poți folosi de următoarele întrebări:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>Când a fost ultima dată când mi-am atins obiectivul de somn menţionat?</li>
      <li>Ce am făcut ca să îl ating?</li>
      <li>Ce anume pot pune în practică din seara aceasta?</li>
      <li>Ce pot face în plus ca să ating obiectivul legat de somn?</li>
    </ul>

    <p className="mt-4"><strong>Sugestie:</strong></p>
    <p>
      Atunci când consumi cofeină, este ca şi când îţi pui degetele în urechi să nu mai auzi niciun zgomot. Corpul nu se
      mai aude atât de bine, cofeina îi maschează oboseala. În situația în care consumi mai mult de 2 cafele zilnic și mai
      bei un café latte, chiar și după ora 14.00, ai putea încerca timp de 10 zile să te rezumi la o singură cafea până în
      ora 14.00. Analizează cum te simți dacă urmezi acest comportament. După 10 zile decide ce vei face cu acel obicei
      vechi.
    </p>

    <p className="mt-4">
      Seara, înainte de culcare, ascultă această înregistrare audio, care te va ajuta să te conectezi la propriul corp şi
      să observi tensiunile înmagazinate la nivelul corpului, relaxând zonele tensionate.
    </p>
  </>
);

const enDescription = (
  <>
    <p><strong>Welcome,</strong></p>
    <p>
      Today is the first day of your journey—an initial step toward the kind of inner calm you need, along with practical
      methods to release tension, reduce fatigue, and reconnect with your zest for life.
    </p>

    <p><strong>Exercise:</strong></p>
    <p>
      For today, write down in a notebook what your sleep-related goal is. For example, you might choose to go to bed one
      hour earlier, or to sleep longer. Once you’ve set your goal, think of a period when you succeeded with it and write
      down what you did back then that helped it happen.
    </p>
    <p>You can use these questions:</p>
    <ul className="list-disc pl-5 mt-2">
      <li>When was the last time I reached my stated sleep goal?</li>
      <li>What did I do to reach it?</li>
      <li>What can I put into practice starting tonight?</li>
      <li>What else can I do to reach my sleep goal?</li>
    </ul>

    <p className="mt-4"><strong>Suggestion:</strong></p>
    <p>
      When you consume caffeine, it’s as if you put your fingers in your ears so you can’t hear any noise—your body can’t
      “hear itself” as well, because caffeine masks tiredness. If you drink more than two coffees a day and also have a
      café latte (even after 2:00 PM), try for 10 days to limit yourself to one coffee before 2:00 PM. Notice how you
      feel when you follow this pattern. After 10 days, decide what you want to do with that old habit.
    </p>

    <p className="mt-4">
      In the evening, before bed, listen to today’s audio recording. It will help you connect to your body and notice
      stored tension, relaxing the areas that are holding stress.
    </p>
  </>
);

const practice: Practice = {
  id: "Improve-Sleep-Day-01",
  position: 1,
  title: { ro: "Ziua 1", en: "Day 1" },
  name: { ro: "Ziua 1", en: "Day 1" },
  intro: {
    ro: "Stabilește obiectivul tău de somn și începe cu un body scan pentru a elibera tensiunea.",
    en: "Set your sleep goal and start with a body scan to release tension.",
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/body-scan.mp3", en: "audioFilesEnAi/body-scan-en.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;

