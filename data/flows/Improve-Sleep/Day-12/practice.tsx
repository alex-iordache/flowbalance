import type { Practice } from '../../types';

const roDescription = (
  <>
    <p><strong>Bun găsit,</strong></p>
    <p>
      A te strecura într-un așternut răcoros ajută la declanșarea unei scăderi a temperaturii corpului tău. Acest lucru dă
      semnale corpului pentru a produce melatonina care induce somnul. De aceea este o idee bună să faci o baie caldă sau
      un duș fierbinte înainte de ora de somn. Ambele îți cresc temporar temperatura corpului care coboară gradual odată ce
      intri în contact cu aerul rece, provocându-ți senzația de somnolență.
    </p>

    <p className="mt-4"><strong>Sugestie:</strong></p>
    <p>
      Ai mai mult de 20 de grade în dormitor? Dacă da, ai putea încerca timp de 3 zile să menții o temperatură constantă,
      undeva între 18–21, și vezi cum te simți apoi.
    </p>

    <p className="mt-4">
      Ascultă această înregistrare audio, care te va ajuta să te conectezi cu emoţiile tale, astfel încât să depăşeşti mai
      uşor situaţiile stresante din viaţa ta.
    </p>
  </>
);

const enDescription = (
  <>
    <p><strong>Welcome,</strong></p>
    <p>
      Slipping into cool sheets helps trigger a drop in body temperature. This signals the body to produce melatonin—the
      hormone that supports sleep. That’s why it can be a good idea to take a warm bath or a hot shower before bedtime.
      Both raise your body temperature temporarily, which then gradually drops once you’re in cooler air—often bringing a
      sense of sleepiness.
    </p>

    <p className="mt-4"><strong>Suggestion:</strong></p>
    <p>
      Is your bedroom warmer than 20°C (68°F)? If yes, try for 3 days to keep a steady temperature around 18–21°C and
      notice how you feel.
    </p>

    <p className="mt-4">
      Listen to today’s audio recording. It will help you connect with your emotions so you can move through stressful
      situations more easily.
    </p>
  </>
);

const practice: Practice = {
  id: "Improve-Sleep-Day-12",
  position: 12,
  title: { ro: "Ziua 12", en: "Day 12" },
  name: { ro: "Ziua 12", en: "Day 12" },
  intro: {
    ro: "Optimizează temperatura și sprijină melatonina printr-o rutină simplă.",
    en: "Optimize temperature and support melatonin with a simple routine.",
  },
  description: { ro: roDescription, en: enDescription },
  audioUrl: { ro: "audioFiles/furtuna.mp3", en: "audioFilesEnAi/furtuna-en.mp3" },

  finished: false,
  lastPositionSec: 0,
};

export default practice;

