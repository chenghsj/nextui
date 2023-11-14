const lorem20 =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo beatae ex esse corporis asperiores, adipisci culpa amet cum animi dolor.';

const lorem30 =
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio praesentium suscipit cupiditate laborum delectus expedita adipisci eveniet ullam officiis atque at exercitationem architecto nihil amet asperiores nobis, est fugit. Expedita.';

const db: IDB = {
  home: {
    accordions: [
      {
        id: 1,
        title: 'Accordion 1',
        description: lorem30,
      },
      {
        id: 2,
        title: 'Accordion 2',
        description: lorem30,
      },
      {
        id: 3,
        title: 'Accordion 3',
        description: lorem30,
      },
      {
        id: 4,
        title: 'Accordion 4',
        description: lorem30,
      },
      {
        id: 5,
        title: 'Accordion 5',
        description: lorem30,
      },
    ],
    videos: [
      {
        id: 1,
        url: '/assets/images.png',
        title: 'Lorem ipsum dolor sit amet consectetur.',
        description: lorem20,
      },
      {
        id: 2,
        url: '/assets/images.png',
        title: 'Lorem ipsum dolor sit amet consectetur.',
        description: lorem20,
      },
      {
        id: 3,
        url: '/assets/images.png',
        title: 'Lorem ipsum dolor sit amet consectetur.',
        description: lorem20,
      },
    ],
  },
};

export default db;
