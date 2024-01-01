type HomeAccordiontype = {
  id: number;
  title: string;
  description: string;
};

type HomeVideoType = {
  id: number;
  url: string;
  title: string;
  description: string;
};

type HomePageType = {
  accordions: HomeAccordiontype[];
  videos: HomeVideoType[];
};

type DBType = {
  home: HomePageType;
};

const lorem20 =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo beatae ex esse corporis asperiores, adipisci culpa amet cum animi dolor.';

const lorem30 =
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio praesentium suscipit cupiditate laborum delectus expedita adipisci eveniet ullam officiis atque at exercitationem architecto nihil amet asperiores nobis, est fugit. Expedita.';

export const imageURL =
  'https://images.unsplash.com/photo-1537727365640-d9b9cbeeac34?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const userTagList = ['#google', '#microsoft', '#meta', '#netflix'];

export const videoTagList = ['#fontend', '#tv', '#streaming', '#uiux'];

export const userVideoURLList = [
  'https://youtu.be/K4TOrB7at0Y?si=Mvw-9D0bKYYt_547',
  'https://youtu.be/xrRDlOWR1OU?si=4-Q657qmn81itZpI',
];

const db: DBType = {
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
        url: imageURL,
        title: 'Lorem ipsum dolor sit amet consectetur.',
        description: lorem20,
      },
      {
        id: 2,
        url: imageURL,
        title: 'Lorem ipsum dolor sit amet consectetur.',
        description: lorem20,
      },
      {
        id: 3,
        url: imageURL,
        title: 'Lorem ipsum dolor sit amet consectetur.',
        description: lorem20,
      },
    ],
  },
};

export default db;
