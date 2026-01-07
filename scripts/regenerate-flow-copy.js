/**
 * One-time copy refresh for `flows-updates`.
 *
 * - Overwrites each `data/flows/<Flow>/flow.ts` intro + description with unique EN+RO copy.
 * - Keeps the existing Day-1..Day-12 practice modules (just re-imports them).
 *
 * Run:
 *   node scripts/regenerate-flow-copy.js
 */
/* eslint-disable no-console */

const fs = require('fs/promises');
const path = require('path');

const repoRoot = path.join(__dirname, '..');
const flowsRoot = path.join(repoRoot, 'data', 'flows');

function titleCase(input) {
  return input
    .trim()
    .split(/\s+/g)
    .map(w => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
}

function slugify(input) {
  return input
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

const PRACTICES_COUNT = 12;
const IMAGE_PATH = '/img/flow-bg.png';

/**
 * All flow names + translations, in the app order.
 * `id` is derived from EN via slugify().
 */
const FLOWS = [
  // Emotional Regulation
  { en: 'Calming Anxiety', ro: 'Calmarea anxietății' },
  { en: 'Panic Support', ro: 'Sprijin în panică' },
  { en: 'Craving Relief', ro: 'Reducerea poftelor' },
  { en: 'Ease Overwhelm', ro: 'Reducerea copleșirii' },
  { en: 'Stress Soothing', ro: 'Liniștirea stresului' },
  { en: 'Calm Your Nervous System', ro: 'Calmează-ți sistemul nervos' },
  { en: 'Improve Sleep', ro: 'Îmbunătățește somnul' },
  // Performance Boost
  { en: 'Boost Performance', ro: 'Crește performanța' },
  { en: 'Improve Focus', ro: 'Îmbunătățește concentrarea' },
  { en: 'Productivity Support', ro: 'Sprijin pentru productivitate' },
  { en: 'Mental Clarity', ro: 'Claritate mentală' },
  { en: 'Calm Under Pressure', ro: 'Calm sub presiune' },
  { en: 'Decision Confidence', ro: 'Încredere în decizii' },
  { en: 'Energy Balance', ro: 'Echilibru energetic' },
  // Mindset
  { en: 'Positive Mindset', ro: 'Mindset pozitiv' },
  { en: 'Mindset during Competitions', ro: 'Mindset în competiții' },
  { en: 'Public Speaking Confidence', ro: 'Încredere în vorbitul în public' },
  { en: 'Goal Achievement', ro: 'Atingerea obiectivelor' },
  { en: 'Build Self-Trust', ro: 'Construiește încrederea în tine' },
  { en: 'Boost Confidence', ro: 'Crește încrederea' },
  { en: 'Healthy Money Mindset', ro: 'Mindset sănătos despre bani' },
  // Stories
  { en: 'Calm Stories', ro: 'Povești pentru calm' },
  { en: 'Reflection Stories', ro: 'Povești de reflecție' },
  { en: 'Growth Stories', ro: 'Povești de creștere' },
  { en: 'Insight Stories', ro: 'Povești de claritate' },
  // Heart Balance
  { en: 'Heartful Gratitude', ro: 'Recunoștință din inimă' },
  { en: 'Boost Motivation', ro: 'Crește motivația' },
  { en: 'Heart-Centered Balance', ro: 'Echilibru centrat pe inimă' },
  { en: 'Self Compassion', ro: 'Compasiune de sine' },
  { en: 'Daily Heart Lift', ro: 'Revigorare zilnică a inimii' },
  { en: 'Heartful Affirmations', ro: 'Afirmații din inimă' },
  // Somatic Release
  { en: 'Body Release', ro: 'Eliberare corporală' },
  { en: 'Grounding', ro: 'Împământare' },
  { en: 'Shake Method', ro: 'Metoda scuturării' },
  { en: 'Nervous System Reset', ro: 'Resetarea sistemului nervos' },
];

/**
 * Unique copy per flow id.
 * Keep it short and distinct; avoid repeating the same phrases across flows.
 */
const COPY = {
  'Calming-Anxiety': {
    introEn: 'Slow anxious momentum and return to steady breath.',
    descEn:
      'This flow helps you soften worry at the level of the body: breath, jaw, belly, and attention. You’ll practice short resets that interrupt “what if…” spirals and rebuild a felt sense of safety. Use it when your mind is racing or before moments you tend to overthink.',
    introRo: 'Încetinește anxietatea și revino la o respirație stabilă.',
    descRo:
      'Acest flow te ajută să înmoi grija la nivelul corpului: respirație, maxilar, abdomen și atenție. Vei exersa resetări scurte care întrerup spiralele „dar dacă…” și reconstruiesc senzația de siguranță. Folosește-l când mintea aleargă sau înainte de momente în care ai tendința să supra-analizezi.',
  },
  'Panic-Support': {
    introEn: 'Ground yourself when panic hits—one small step at a time.',
    descEn:
      'Panic feels fast; this flow slows everything down. You’ll anchor in sensation, widen your exhale, and give your nervous system clear signals that you are safe right now. Start with Day 1 when the wave is rising, or practice ahead of time to build confidence.',
    introRo: 'Împământează-te când apare panica—pas cu pas.',
    descRo:
      'Panica se simte rapidă; acest flow încetinește totul. Te ancorezi în senzații, lungești expirația și îi oferi sistemului nervos semnale clare că ești în siguranță acum. Începe cu Ziua 1 când valul crește sau exersează din timp pentru a construi încredere.',
  },
  'Craving-Relief': {
    introEn: 'Turn cravings into information, not commands.',
    descEn:
      'Cravings peak and pass—if you can stay present for a few minutes. Here you’ll learn a simple pause, body scan, and urge-surfing rhythm that reduces impulsive choices. Use it for food, nicotine, scrolling, or any habit loop that hijacks your attention.',
    introRo: 'Transformă poftele în informație, nu în comandă.',
    descRo:
      'Poftele urcă și apoi trec—dacă poți rămâne prezent câteva minute. Aici înveți o pauză simplă, o scanare a corpului și un ritm de „surfing” pe impuls care reduce alegerile impulsive. Folosește-l pentru mâncare, nicotină, scrolling sau orice buclă de obicei care îți fură atenția.',
  },
  'Ease-Overwhelm': {
    introEn: 'When everything is too much, come back to one thing.',
    descEn:
      'Overwhelm happens when your brain tries to solve ten problems at once. This flow guides you into clarity by shrinking the task: one breath, one next step, one kind decision. It’s ideal for busy days, emotional overload, or after too much stimulation.',
    introRo: 'Când e prea mult, revino la un singur lucru.',
    descRo:
      'Copleșirea apare când creierul încearcă să rezolve zece lucruri deodată. Acest flow te ghidează spre claritate micșorând sarcina: o respirație, un pas următor, o decizie blândă. E ideal în zile aglomerate, la suprasarcină emoțională sau după prea multă stimulare.',
  },
  'Stress-Soothing': {
    introEn: 'Downshift from stress mode into a calmer baseline.',
    descEn:
      'Stress tightens the body and narrows your thinking. Across 12 days, you’ll practice releasing micro-tension, steadying breath, and finishing stress cycles so you feel less “on edge.” Use it after work, after conflict, or anytime you notice constant pressure.',
    introRo: 'Coboară din modul de stres către un calm mai stabil.',
    descRo:
      'Stresul strânge corpul și îți îngustează gândirea. Pe parcursul a 12 zile, exersezi eliberarea micro-tensiunii, stabilizarea respirației și închiderea ciclurilor de stres, ca să te simți mai puțin „în alertă.” Folosește-l după muncă, după conflicte sau oricând simți presiune constantă.',
  },
  'Calm-Your-Nervous-System': {
    introEn: 'Train your nervous system to recognize safety again.',
    descEn:
      'This flow is a gentle re-patterning: breath pacing, body cues, and attention that teaches regulation. You’ll build a calmer “default setting” that shows up in conversations, sleep, and decision-making. Repeat the days you love—consistency beats intensity here.',
    introRo: 'Antrenează-ți sistemul nervos să recunoască din nou siguranța.',
    descRo:
      'Acest flow este o reconfigurare blândă: ritm de respirație, semnale din corp și atenție care te învață reglarea. Vei construi un „setare implicită” mai calmă care se vede în conversații, somn și decizii. Repetă zilele care îți plac—consecvența bate intensitatea aici.',
  },
  'Improve-Sleep': {
    introEn: 'Unwind your mind and make space for real rest.',
    descEn:
      'Better sleep starts before bedtime: lower arousal, release tension, and reduce mental chatter. These practices support a smoother transition into sleep and a kinder relationship with nighttime wake-ups. Use it in the evening, or anytime your body feels tired but your mind won’t stop.',
    introRo: 'Liniștește mintea și fă loc pentru odihnă adevărată.',
    descRo:
      'Somnul mai bun începe înainte de culcare: cobori activarea, eliberezi tensiunea și reduci zgomotul mental. Practicile de aici susțin o tranziție mai lină către somn și o relație mai blândă cu trezirile nocturne. Folosește-l seara sau oricând corpul e obosit, dar mintea nu se oprește.',
  },
  'Boost-Performance': {
    introEn: 'Show up sharper—without burning yourself out.',
    descEn:
      'Performance is not only effort; it’s regulation. This flow helps you enter a focused state, recover faster after mistakes, and keep energy for the whole day. Great before training, work sprints, or any situation where you want your best self on demand.',
    introRo: 'Apari mai „sharp”—fără să te arzi pe interior.',
    descRo:
      'Performanța nu înseamnă doar efort; înseamnă și reglare. Acest flow te ajută să intri într-o stare de focus, să revii mai repede după greșeli și să îți păstrezi energia pe tot parcursul zilei. E excelent înainte de antrenament, sprinturi de lucru sau orice situație în care vrei să dai ce ai mai bun la comandă.',
  },
  'Improve-Focus': {
    introEn: 'Strengthen attention like a muscle—calmly and consistently.',
    descEn:
      'Focus fades when your mind is scattered or overstimulated. These practices train single-point attention, reduce mental switching, and bring you back when you drift. Use it before deep work, studying, or whenever you feel pulled in ten directions.',
    introRo: 'Întărește atenția ca pe un mușchi—calm și consecvent.',
    descRo:
      'Concentrarea scade când mintea e împrăștiată sau supra-stimulată. Practicile de aici antrenează atenția pe un singur punct, reduc „switching”-ul mental și te aduc înapoi când rătăcești. Folosește-l înainte de lucru profund, studiu sau când te simți tras în zece direcții.',
  },
  'Productivity-Support': {
    introEn: 'Do less reactivity, do more of what matters.',
    descEn:
      'Productivity is clarity plus momentum. This flow helps you choose the next right action, start without friction, and keep going without self-criticism. Perfect for days when you procrastinate, feel stuck, or bounce between tasks.',
    introRo: 'Mai puțină reactivitate, mai mult din ce contează.',
    descRo:
      'Productivitatea este claritate plus momentum. Acest flow te ajută să alegi următoarea acțiune potrivită, să începi fără fricțiune și să continui fără auto-critică. Perfect în zilele cu procrastinare, blocaj sau sărit din task în task.',
  },
  'Mental-Clarity': {
    introEn: 'Clear the mental fog and see what’s true.',
    descEn:
      'When your head feels crowded, even simple decisions feel heavy. These practices create space: fewer loops, more perspective, and a calmer inner narrative. Use it when you’re confused, overstimulated, or craving a clean reset.',
    introRo: 'Ridică ceața mentală și vezi ce e real.',
    descRo:
      'Când capul e aglomerat, și deciziile simple par grele. Practicile de aici creează spațiu: mai puține bucle, mai multă perspectivă și o narațiune interioară mai calmă. Folosește-l când ești confuz, supra-stimulat sau ai nevoie de un reset curat.',
  },
  'Calm-Under-Pressure': {
    introEn: 'Stay steady when the stakes feel high.',
    descEn:
      'Pressure triggers urgency, tightness, and tunnel vision. This flow teaches you to widen your attention, regulate breath, and keep your body soft while you perform. Use it before meetings, exams, competitions—or anytime you feel watched and judged.',
    introRo: 'Rămâi stabil când miza pare mare.',
    descRo:
      'Presiunea activează urgență, tensiune și vedere „în tunel.” Acest flow te învață să lărgești atenția, să îți reglezi respirația și să îți păstrezi corpul moale în timp ce performezi. Folosește-l înainte de ședințe, examene, competiții—sau când simți că ești privit și judecat.',
  },
  'Decision-Confidence': {
    introEn: 'Make decisions with less doubt and more alignment.',
    descEn:
      'Indecision often hides fear: fear of being wrong, judged, or missing out. These practices help you listen to signals from body and values, then choose with calm commitment. Ideal when you’re stuck between options or replaying “what if I chose differently?”',
    introRo: 'Ia decizii cu mai puțină îndoială și mai multă aliniere.',
    descRo:
      'Indecizia ascunde adesea frică: frica de a greși, de a fi judecat sau de a pierde ceva. Practicile de aici te ajută să asculți semnalele din corp și din valori, apoi să alegi cu un angajament calm. Ideal când ești prins între opțiuni sau rulezi „și dacă alegeam altfel?”',
  },
  'Energy-Balance': {
    introEn: 'Find the middle: energized, not wired.',
    descEn:
      'Some days you’re flat; other days you’re overstimulated. This flow helps you regulate arousal so your energy feels usable and stable. You’ll practice gentle activation, downshifts, and rhythms that support a balanced day.',
    introRo: 'Găsește mijlocul: energizat, nu agitat.',
    descRo:
      'Unele zile ești fără energie; alte zile ești supra-stimulat. Acest flow te ajută să îți reglezi activarea astfel încât energia să fie stabilă și folosibilă. Vei exersa activare blândă, „downshift”-uri și ritmuri care susțin o zi echilibrată.',
  },
  'Positive-Mindset': {
    introEn: 'Build a mind that looks for support, not threats.',
    descEn:
      'Positive doesn’t mean fake—it means flexible. This flow trains you to notice what’s working, reframe setbacks, and create a kinder inner voice. Use it in the morning or whenever you feel pessimistic, harsh, or discouraged.',
    introRo: 'Construiește o minte care caută sprijin, nu amenințări.',
    descRo:
      'Pozitiv nu înseamnă fals—înseamnă flexibil. Acest flow te antrenează să observi ce funcționează, să reîncadrezi obstacolele și să creezi o voce interioară mai blândă. Folosește-l dimineața sau când te simți pesimist, dur cu tine sau descurajat.',
  },
  'Mindset-During-Competitions': {
    introEn: 'Compete with presence, not panic.',
    descEn:
      'Competition amplifies everything: nerves, expectations, and self-talk. These practices help you channel adrenaline into focus, recover after errors, and stay in your lane. Great the day before an event, on the morning of, or right after.',
    introRo: 'Intră în competiție cu prezență, nu cu panică.',
    descRo:
      'Competiția amplifică totul: emoții, așteptări și dialog interior. Practicile de aici te ajută să canalizezi adrenalina în focus, să revii după greșeli și să rămâi „în banda ta.” E grozav cu o zi înainte de eveniment, în dimineața lui sau imediat după.',
  },
  'Public-Speaking-Confidence': {
    introEn: 'Speak clearly while your body stays calm.',
    descEn:
      'Public speaking isn’t just a skill; it’s nervous system training. This flow reduces throat and chest tension, steadies breath, and helps you feel grounded while being seen. Use it before presentations or to practice gradually building comfort.',
    introRo: 'Vorbește clar, cu un corp calm.',
    descRo:
      'Vorbitul în public nu e doar o abilitate; e un antrenament pentru sistemul nervos. Acest flow reduce tensiunea din gât și piept, stabilizează respirația și te ajută să rămâi ancorat când ești văzut. Folosește-l înainte de prezentări sau pentru a construi treptat confort.',
  },
  'Goal-Achievement': {
    introEn: 'Turn intention into action—without forcing it.',
    descEn:
      'Goals fail when we rely on motivation alone. This flow supports consistency: small commitments, clear priorities, and the ability to restart after a missed day. Use it when you need momentum, structure, and a calm “next step.”',
    introRo: 'Transformă intenția în acțiune—fără forțare.',
    descRo:
      'Obiectivele eșuează când ne bazăm doar pe motivație. Acest flow susține consecvența: angajamente mici, priorități clare și abilitatea de a relua după o zi ratată. Folosește-l când ai nevoie de momentum, structură și un „pas următor” calm.',
  },
  'Build-Self-Trust': {
    introEn: 'Keep promises to yourself—and feel the difference.',
    descEn:
      'Self-trust is built through repetition: do what you said you’d do, gently and consistently. These practices help you quiet doubt, listen inwardly, and take aligned action. Ideal for rebuilding confidence after setbacks or inconsistency.',
    introRo: 'Ține-ți promisiunile față de tine—și simte diferența.',
    descRo:
      'Încrederea în tine se construiește prin repetiție: fă ce ai spus că faci, blând și consecvent. Practicile de aici te ajută să reduci îndoiala, să te asculți și să acționezi aliniat. Ideal pentru a reconstrui încrederea după eșecuri sau inconsecvență.',
  },
  'Boost-Confidence': {
    introEn: 'Step forward with a steadier “yes, I can.”',
    descEn:
      'Confidence grows when your body feels supported and your mind feels clear. This flow blends grounding, posture, and inner dialogue so you feel more capable in real situations. Use it before challenging conversations, new starts, or moments that intimidate you.',
    introRo: 'Fă un pas înainte cu un „da, pot” mai stabil.',
    descRo:
      'Încrederea crește când corpul se simte susținut și mintea clară. Acest flow combină ancorarea, postura și dialogul interior ca să te simți mai capabil în situații reale. Folosește-l înainte de conversații dificile, începuturi noi sau momente care te intimidează.',
  },
  'Healthy-Money-Mindset': {
    introEn: 'Bring calm, clarity, and self-respect into money decisions.',
    descEn:
      'Money can trigger shame, urgency, or avoidance. This flow helps you regulate those reactions so you can plan, choose, and act with steadiness. Great when you’re budgeting, pricing your work, asking for more, or facing financial uncertainty.',
    introRo: 'Adu calm, claritate și respect de sine în deciziile despre bani.',
    descRo:
      'Banii pot activa rușine, urgență sau evitare. Acest flow te ajută să îți reglezi reacțiile ca să poți planifica, alege și acționa cu stabilitate. E util când îți faci buget, îți prețuiești munca, ceri mai mult sau treci prin incertitudine financiară.',
  },
  'Calm-Stories': {
    introEn: 'Soft stories that settle the mind.',
    descEn:
      'These are not lectures—these are gentle narratives meant to slow your inner pace. Let the story carry your attention away from loops and into calm imagery and rhythm. Perfect before sleep, during recovery, or whenever you need softness.',
    introRo: 'Povești blânde care liniștesc mintea.',
    descRo:
      'Nu sunt lecții—sunt narațiuni blânde menite să încetinească ritmul interior. Lasă povestea să-ți poarte atenția departe de bucle și către imagini și ritm calm. Perfect înainte de somn, în recuperare sau când ai nevoie de blândețe.',
  },
  'Reflection-Stories': {
    introEn: 'Stories that help you pause and look inward.',
    descEn:
      'Reflection changes you without forcing you. These stories create space for questions, meaning, and honest self-observation. Use them when you want to process life events, emotions, or decisions with more depth and less noise.',
    introRo: 'Povești care te ajută să te oprești și să privești înăuntru.',
    descRo:
      'Reflecția te schimbă fără să te forțeze. Poveștile de aici creează spațiu pentru întrebări, sens și auto-observare sinceră. Folosește-le când vrei să procesezi evenimente, emoții sau decizii cu mai multă profunzime și mai puțin zgomot.',
  },
  'Growth-Stories': {
    introEn: 'A narrative push toward your next level.',
    descEn:
      'Growth is rarely linear—and stories remind you of that. These narratives support resilience, courage, and the willingness to learn from discomfort. Use them when you need a fresh perspective, a spark, or a reminder that you’re moving forward.',
    introRo: 'Un impuls narativ către următorul tău nivel.',
    descRo:
      'Creșterea e rar liniară—iar poveștile îți amintesc asta. Narațiunile de aici susțin reziliența, curajul și disponibilitatea de a învăța din disconfort. Folosește-le când ai nevoie de perspectivă nouă, un strop de energie sau o reamintire că înaintezi.',
  },
  'Insight-Stories': {
    introEn: 'Stories that reveal patterns you couldn’t see before.',
    descEn:
      'Insight arrives when you stop pushing and start noticing. These stories invite subtle realizations about habits, relationships, and the way you speak to yourself. Use them when you feel stuck and want a gentle “aha” rather than a hard reset.',
    introRo: 'Povești care scot la lumină tipare pe care nu le vedeai.',
    descRo:
      'Claritatea apare când te oprești din împins și începi să observi. Poveștile de aici invită realizări subtile despre obiceiuri, relații și felul în care îți vorbești. Folosește-le când te simți blocat și vrei un „aha” blând, nu un reset dur.',
  },
  'Heartful-Gratitude': {
    introEn: 'Let gratitude land in the body, not just the mind.',
    descEn:
      'Gratitude is a state you can practice, even on hard days. This flow helps you shift attention toward what supports you—people, moments, and inner resources. Use it to soften resentment, reconnect, and feel more warmth in daily life.',
    introRo: 'Lasă recunoștința să se așeze în corp, nu doar în minte.',
    descRo:
      'Recunoștința e o stare pe care o poți exersa, chiar și în zile grele. Acest flow te ajută să îți muți atenția către ce te susține—oameni, momente și resurse interioare. Folosește-l ca să înmoi resentimentele, să te reconectezi și să simți mai multă căldură în viața de zi cu zi.',
  },
  'Boost-Motivation': {
    introEn: 'Find your “why” and move again.',
    descEn:
      'Motivation drops when you’re depleted or disconnected from meaning. These practices help you reconnect with values, generate small sparks of energy, and remove mental friction. Use it when you’ve lost drive, feel apathetic, or need a clean restart.',
    introRo: 'Regăsește-ți „de ce”-ul și pornește din nou.',
    descRo:
      'Motivația scade când ești epuizat sau deconectat de sens. Practicile de aici te ajută să te reconectezi cu valorile, să creezi scântei mici de energie și să reduci fricțiunea mentală. Folosește-l când ți-ai pierdut avântul, te simți apatic sau ai nevoie de un restart curat.',
  },
  'Heart-Centered-Balance': {
    introEn: 'Balance head and heart—so you feel aligned.',
    descEn:
      'When you live only in the mind, you lose warmth; when you live only in emotion, you lose direction. This flow helps you integrate both: calm thinking and open feeling. Use it for relationships, decisions, and moments when you want to act from your center.',
    introRo: 'Echilibrează mintea și inima—ca să te simți aliniat.',
    descRo:
      'Când trăiești doar în minte, pierzi căldura; când trăiești doar în emoție, pierzi direcția. Acest flow te ajută să le integrezi: gândire calmă și simțire deschisă. Folosește-l în relații, decizii și momente când vrei să acționezi din centrul tău.',
  },
  'Self-Compassion': {
    introEn: 'Treat yourself like someone you’re responsible for helping.',
    descEn:
      'Self-compassion is not weakness; it’s regulation plus honesty. This flow helps you soften self-judgment, recover after mistakes, and build a safer inner environment. Use it when you’re harsh, ashamed, or exhausted from pushing too hard.',
    introRo: 'Poartă-te cu tine ca și cum ai avea responsabilitatea să te ajuți.',
    descRo:
      'Compasiunea de sine nu e slăbiciune; e reglare plus sinceritate. Acest flow te ajută să înmoi auto-judecata, să revii după greșeli și să construiești un spațiu interior mai sigur. Folosește-l când ești dur cu tine, rușinat sau epuizat de prea multă forțare.',
  },
  'Daily-Heart-Lift': {
    introEn: 'A small daily lift for mood and connection.',
    descEn:
      'Some days don’t need a deep dive—they need a lift. These short practices bring warmth, perspective, and a touch of optimism without denying reality. Use it as a daily ritual to reset your emotional tone.',
    introRo: 'O mică ridicare zilnică pentru dispoziție și conexiune.',
    descRo:
      'Unele zile nu au nevoie de un „deep dive”—au nevoie de un lift. Practicile scurte de aici aduc căldură, perspectivă și un strop de optimism fără să nege realitatea. Folosește-l ca ritual zilnic pentru a-ți reseta tonul emoțional.',
  },
  'Heartful-Affirmations': {
    introEn: 'Affirmations that feel real—because they start in the body.',
    descEn:
      'Words work when your nervous system can receive them. This flow pairs grounding with heart-centered statements so you can internalize support instead of just repeating it. Use it in the morning, before challenges, or when you need gentle reinforcement.',
    introRo: 'Afirmații care se simt reale—pentru că pornesc din corp.',
    descRo:
      'Cuvintele funcționează când sistemul nervos le poate primi. Acest flow combină ancorarea cu afirmații din inimă, ca să internalizezi sprijinul, nu doar să îl repeți. Folosește-l dimineața, înainte de provocări sau când ai nevoie de întărire blândă.',
  },
  'Body-Release': {
    introEn: 'Let the body complete what stress started.',
    descEn:
      'Tension is often unfinished stress stored in muscles and breath. This flow guides you through gentle release—jaw, shoulders, belly—so your system can settle. Use it after long sitting, after conflict, or when you feel tight without knowing why.',
    introRo: 'Lasă corpul să încheie ce a început stresul.',
    descRo:
      'Tensiunea este adesea stres neîncheiat, stocat în mușchi și respirație. Acest flow te ghidează prin eliberare blândă—maxilar, umeri, abdomen—ca sistemul tău să se liniștească. Folosește-l după stat mult pe scaun, după conflicte sau când te simți încordat fără să știi de ce.',
  },
  Grounding: {
    introEn: 'Come back to the ground: stable, present, here.',
    descEn:
      'Grounding is the fastest way to exit mental spirals. These practices bring attention into feet, breath, and the senses so your mind can stop floating ahead of life. Use it before difficult conversations, after screen time, or whenever you feel unrooted.',
    introRo: 'Revino pe pământ: stabil, prezent, aici.',
    descRo:
      'Împământarea este una dintre cele mai rapide ieșiri din spirale mentale. Practicile de aici aduc atenția în tălpi, respirație și simțuri, ca mintea să nu mai plutească înaintea vieții. Folosește-l înainte de conversații dificile, după mult ecran sau când te simți „neancorat.”',
  },
  'Shake-Method': {
    introEn: 'Discharge stress through movement—safely and naturally.',
    descEn:
      'Shaking is a built-in human reset: the body releases excess activation. This flow introduces a simple shake rhythm and recovery so you feel lighter and more regulated afterward. Use it when you’re wired, restless, or carrying tension that won’t budge.',
    introRo: 'Eliberează stresul prin mișcare—natural și în siguranță.',
    descRo:
      'Scuturarea este un reset natural: corpul descarcă activarea în exces. Acest flow îți oferă un ritm simplu de scuturare și revenire, astfel încât după practică să te simți mai ușor și mai reglat. Folosește-l când ești „wired,” neliniștit sau porți tensiune care nu se mișcă.',
  },
  'Nervous-System-Reset': {
    introEn: 'A full reset when you feel dysregulated and stuck.',
    descEn:
      'Sometimes you don’t need more thinking—you need a reset. This flow helps you shift state through breath, sensation, and down-regulation so your system can restart from calm. Use it after intense days, emotional spikes, or when you feel “off” for no clear reason.',
    introRo: 'Un reset complet când te simți dereglat și blocat.',
    descRo:
      'Uneori nu ai nevoie de mai mult gândit—ai nevoie de un reset. Acest flow te ajută să îți schimbi starea prin respirație, senzații și coborârea activării, ca sistemul tău să repornească din calm. Folosește-l după zile intense, vârfuri emoționale sau când te simți „off” fără un motiv clar.',
  },
};

function renderFlowTs({ id, position, enName, roName, introEn, introRo, descEn, descRo }) {
  const imports = [];
  const vars = [];
  for (let day = 1; day <= PRACTICES_COUNT; day += 1) {
    const v = `practice_${day}`;
    imports.push(`import ${v} from "./Day-${day}/practice";`);
    vars.push(v);
  }

  return `import type { Flow } from '../types';
${imports.join('\n')}

const flow: Flow = {
  id: ${JSON.stringify(id)},
  position: ${position},

  title: { ro: ${JSON.stringify(roName)}, en: ${JSON.stringify(enName)} },
  name: { ro: ${JSON.stringify(roName)}, en: ${JSON.stringify(enName)} },
  intro: { ro: ${JSON.stringify(introRo)}, en: ${JSON.stringify(introEn)} },
  description: { ro: ${JSON.stringify(descRo)}, en: ${JSON.stringify(descEn)} },
  image: { ro: ${JSON.stringify(IMAGE_PATH)}, en: ${JSON.stringify(IMAGE_PATH)} },

  started: false,
  finished: false,
  practicesCompleted: 0,
  lastPracticeFinishedId: null,
  lastPracticePositionSec: 0,

  totalPractices: ${PRACTICES_COUNT},
  practices: [${vars.join(', ')}],
};

export default flow;
`;
}

async function main() {
  let position = 1;
  for (const flow of FLOWS) {
    const enName = titleCase(flow.en);
    const roName = flow.ro;
    const id = slugify(enName);

    const copy = COPY[id];
    if (!copy) {
      throw new Error(`Missing copy for flow id "${id}" (${enName})`);
    }

    const flowDir = path.join(flowsRoot, id);
    await fs.mkdir(flowDir, { recursive: true });
    await fs.writeFile(
      path.join(flowDir, 'flow.ts'),
      renderFlowTs({
        id,
        position,
        enName,
        roName,
        introEn: copy.introEn,
        introRo: copy.introRo,
        descEn: copy.descEn,
        descRo: copy.descRo,
      }),
      'utf8',
    );

    position += 1;
  }

  console.log(`Updated intro/description for ${FLOWS.length} flows.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

