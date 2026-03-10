import type { Practice } from '../../types';

const practice: Practice = {
  id: 'Breathing-Exercises-Practice-01',
  position: 1,
  title: { ro: 'Respirația inimii', en: 'Heart breathing' },
  name: { ro: 'Respirația inimii', en: 'Heart breathing' },
  intro: { ro: '', en: '' },
  description: { ro: '', en: '' },
  audioUrl: {
    ro: 'audioFiles/respiratia-inimii.mp3',
    en: 'audioFiles/respiratia-inimii.mp3',
  },
  finished: false,
  lastPositionSec: 0,
};

export default practice;
