export type HomeItem = {
  id: number;
  title: string;
  type: string;
  text: string;
  author: string;
  authorAvatar: string;
  image: string;
};

export const homeItems: HomeItem[] = [
  {
    id: 1,
    title: 'Exploring Maui',
    type: 'Blog',
    text: 'We just got back from a trip to Maui, and we had a great time...',
    author: 'Max Lynch',
    authorAvatar: '/img/max.jpg',
    image: '/img/c1.avif',
  },
  {
    id: 2,
    title: 'Arctic Adventures',
    type: 'Blog',
    text: 'Last month we took a trek to the Arctic Circle. The isolation was just what we needed after...',
    author: 'Nathan Chapman',
    authorAvatar: '/img/nathan.jpg',
    image: '/img/c2.avif',
  },
  {
    id: 3,
    title: 'Frolicking in the Faroe Islands',
    type: 'Blog',
    text: 'The Faroe Islands are a North Atlantic archipelago located 320 kilometres (200 mi) north-northwest of Scotland...',
    author: 'Leo Giovanetti',
    authorAvatar: '/img/leo.jpg',
    image: '/img/c3.avif',
  },
];

export type NotificationItem = {
  id: number;
  title: string;
  when: string;
};

export const notifications: NotificationItem[] = [
  { id: 1, title: 'New friend request', when: '6 hr' },
  { id: 2, title: 'Please change your password', when: '1 day' },
  { id: 3, title: 'You have a new message', when: '2 weeks' },
  { id: 4, title: 'Welcome to the app!', when: '1 month' },
];

export type Settings = {
  enableNotifications: boolean;
};

export const settings: Settings = {
  enableNotifications: true,
};

export type Practices = {
  id: string;
  name: string;
  description: string;
  audioURL: string;
  finished: boolean;
};

export type Flow = {
  id: string;
  name: string;
  intro: string;
  description: string;
  practices: Practices[];
  finished: boolean;
  started: boolean;
};

export const flows: Flow[] = [
  {
    id: 'StressBreak',
    name: 'Stress Break',
    intro: 'Primul pas care este de parcurs, este sa ne calmam, sa ne linistim, sa reinvatam sa respiram usurati.',
    description: 'Mintea poate fi un tsunami de rutine, activitati, comportamente conditionate, angajamente, intentii si dorinte. Adauga acestui lucru incertitudinile necunoscute, neplanificate si neasteptate, care se desfasoara cu fiecare mesaj, email, apel telefonic sau conversatie, si inainte de a sti … ai fost luat de val de reactivitate si ai pierdut urmele obiectivului pe care ti-ai propus sa il atingi.',
    practices: [
      {
        id: 'StressBreak-Ziua-001',
        name: 'Stress Break - Ziua 1',
        description: 'Pentru ziua aceasta pune pe o hartie top 3 situatii din viata ta care te streseaza cel mai des. Remarca ce te deranjeaza, ce te frustreaza, ce te dezamageste.',
        audioURL: 'https://www.simonanicolaescu.ro/wp-content/uploads/2021/10/1-2-trecerea-peste-obstacole.mp3',
        finished: false,
      },
      { id: 'StressBreak-Ziua-002', name: 'Stress Break - Ziua 2', description: '', audioURL: '', finished: false },
      { id: 'StressBreak-Ziua-003', name: 'Stress Break - Ziua 3', description: '', audioURL: '', finished: false },
      { id: 'StressBreak-Ziua-004', name: 'Stress Break - Ziua 4', description: '', audioURL: '', finished: false },
      { id: 'StressBreak-Ziua-005', name: 'Stress Break - Ziua 5', description: '', audioURL: '', finished: false },
      { id: 'StressBreak-Ziua-006', name: 'Stress Break - Ziua 6', description: '', audioURL: '', finished: false },
      { id: 'StressBreak-Ziua-007', name: 'Stress Break - Ziua 7', description: '', audioURL: '', finished: false },
      { id: 'StressBreak-Ziua-008', name: 'Stress Break - Ziua 8', description: '', audioURL: '', finished: false },
      { id: 'StressBreak-Ziua-009', name: 'Stress Break - Ziua 9', description: '', audioURL: '', finished: false },
      { id: 'StressBreak-Ziua-010', name: 'Stress Break - Ziua 10', description: '', audioURL: '', finished: false },
      { id: 'StressBreak-Ziua-011', name: 'Stress Break - Ziua 11', description: '', audioURL: '', finished: false },
      { id: 'StressBreak-Ziua-012', name: 'Stress Break - Ziua 12', description: '', audioURL: '', finished: false },
      { id: 'StressBreak-Ziua-013', name: 'Stress Break - Ziua 13', description: '', audioURL: '', finished: false },
      { id: 'StressBreak-Ziua-014', name: 'Stress Break - Ziua 14', description: '', audioURL: '', finished: false },
      { id: 'StressBreak-Ziua-015', name: 'Stress Break - Ziua 15', description: '', audioURL: '', finished: false },
      { id: 'StressBreak-Ziua-016', name: 'Stress Break - Ziua 16', description: '', audioURL: '', finished: false },
      { id: 'StressBreak-Ziua-017', name: 'Stress Break - Ziua 17', description: '', audioURL: '', finished: false },
      { id: 'StressBreak-Ziua-018', name: 'Stress Break - Ziua 18', description: '', audioURL: '', finished: false },
      { id: 'StressBreak-Ziua-019', name: 'Stress Break - Ziua 19', description: '', audioURL: '', finished: false },
      { id: 'StressBreak-Ziua-020', name: 'Stress Break - Ziua 20', description: '', audioURL: '', finished: false },
      { id: 'StressBreak-Ziua-021', name: 'Stress Break - Ziua 21', description: '', audioURL: '', finished: false },
      { id: 'StressBreak-Ziua-022', name: 'Stress Break - Ziua 22', description: '', audioURL: '', finished: false },
      { id: 'StressBreak-Ziua-023', name: 'Stress Break - Ziua 23', description: '', audioURL: '', finished: false },
      { id: 'StressBreak-Ziua-024', name: 'Stress Break - Ziua 24', description: '', audioURL: '', finished: false },
      { id: 'StressBreak-Ziua-025', name: 'Stress Break - Ziua 25', description: '', audioURL: '', finished: false },
      { id: 'StressBreak-Ziua-026', name: 'Stress Break - Ziua 26', description: '', audioURL: '', finished: false },
      { id: 'StressBreak-Ziua-027', name: 'Stress Break - Ziua 27', description: '', audioURL: '', finished: false },
      { id: 'StressBreak-Ziua-028', name: 'Stress Break - Ziua 28', description: '', audioURL: '', finished: false },
      { id: 'StressBreak-Ziua-029', name: 'Stress Break - Ziua 29', description: '', audioURL: '', finished: false },
      { id: 'StressBreak-Ziua-030', name: 'Stress Break - Ziua 30', description: '', audioURL: '', finished: false },
    ],
    finished: false,
    started: false,
  },
  {
    id: 'Connect',
    name: 'Connect',
    intro: 'Corpul este cel mai important partener de viata, el ne sustine cu energie in tot ceea ce facem. De aceea, este esential sa ramanem conectati la el si sa prevenim bolile.',
    description: 'Abia atunci cand suntem bolnavi, incepem sa ramanem conectati la propriul corp. De fapt, boala in sine reprezinta un semnal al corpului ca este nevoie sa incetinim ritmul cotidian, sa ne odihnim, sa ii acordam atentie mai multa. Corpul este cel mai important partener de viata, el ne sustine cu energie in tot ceea ce facem. De aceea, este esential sa ramanem conectati la el si sa prevenim bolile.',
    practices: [
      { id: 'Connect-Ziua-001', name: '', description: '', audioURL: '', finished: false },
      { id: 'Connect-Ziua-002', name: '', description: '', audioURL: '', finished: false },
      { id: 'Connect-Ziua-003', name: '', description: '', audioURL: '', finished: false },
      { id: 'Connect-Ziua-004', name: '', description: '', audioURL: '', finished: false },
      { id: 'Connect-Ziua-005', name: '', description: '', audioURL: '', finished: false },
      { id: 'Connect-Ziua-006', name: '', description: '', audioURL: '', finished: false },
      { id: 'Connect-Ziua-007', name: '', description: '', audioURL: '', finished: false },
      { id: 'Connect-Ziua-008', name: '', description: '', audioURL: '', finished: false },
      { id: 'Connect-Ziua-009', name: '', description: '', audioURL: '', finished: false },
      { id: 'Connect-Ziua-010', name: '', description: '', audioURL: '', finished: false },
      { id: 'Connect-Ziua-011', name: '', description: '', audioURL: '', finished: false },
      { id: 'Connect-Ziua-012', name: '', description: '', audioURL: '', finished: false },
      { id: 'Connect-Ziua-013', name: '', description: '', audioURL: '', finished: false },
      { id: 'Connect-Ziua-014', name: '', description: '', audioURL: '', finished: false },
    ],
    finished: false,
    started: false,
  },
];

