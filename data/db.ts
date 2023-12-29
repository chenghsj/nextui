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
  candidate: {
    user: {
      id: 0,
      firstName: 'HS',
      lastName: 'Cheng',
      imgURL: '',
      aboutMe:
        " 11 Years of NCS. Seeing all of your reactions to our #NCSNostalgia week has been truly humbling and we couldn't be more thankful.",
      tags: ['#google', '#microsoft', '#meta', '#netflix'],
    },
    videos: [
      {
        id: 0,
        title: 'Demo',
        url: 'https://youtu.be/K4TOrB7at0Y?si=Mvw-9D0bKYYt_547',
        views: 21000,
        created: 1668873600000,
        tags: ['#fontend', '#tv', '#streaming', '#uiux'],
        applications: 5,
      },
      {
        id: 1,
        title: 'Demo 2',
        url: 'https://youtu.be/xrRDlOWR1OU?si=4-Q657qmn81itZpI',
        views: 21000,
        created: 1668873600000,
        tags: ['#fontend', '#tv', '#streaming', '#uiux'],
        applications: 5,
      },
    ],
    workExp: [
      {
        id: 23,
        company: 'Apple Inc.',
        companyImgURL: '',
        position: 'Product Designer',
        currentJob: true,
        startDate: '2023/09/01',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit, unde explicabo praesentium laborum distinctio facere cumque a vitae ut, quam error fugiat, dolorum vero. Incidunt ipsam architecto perspiciatis, temporibus animi maiores? Sunt sapiente dolorum voluptatem, blanditiis omnis ad perspiciatis tempora fugiat eos amet neque vero iure facilis atque, sed repellat.',
        type: 'FullTime',
        tags: ['#uiux', '#figma', '#b2b', '#iphone', '#ios16'],
      },
      {
        id: 50,
        company: 'Google Inc.',
        companyImgURL: '',
        position: 'UX Designer',
        currentJob: false,
        startDate: '2020/12/01',
        endDate: '2023/09/01',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit, unde explicabo praesentium laborum distinctio facere cumque a vitae ut, quam error fugiat, dolorum vero. Incidunt ipsam architecto perspiciatis, temporibus animi maiores? Sunt sapiente dolorum voluptatem, blanditiis omnis ad perspiciatis tempora fugiat eos amet neque vero iure facilis atque, sed repellat.',
        type: 'FullTime',
        tags: ['#ai', '#b2c2b', '#b2b', '#productstrategy', '#generative'],
      },
    ],
    education: [
      {
        id: 20,
        name: 'NCKU',
        schoolImgURL: '',
        degree: "Bachelor's Degree | Full",
        time: '2016/09/01 - 2020/06/30',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit, unde explicabo praesentium laborum distinctio facere cumque a vitae ut, quam error fugiat, dolorum vero. Incidunt ipsam architecto perspiciatis, temporibus animi maiores? Sunt sapiente dolorum voluptatem, blanditiis omnis ad perspiciatis tempora fugiat eos amet neque vero iure facilis atque, sed repellat.',
      },
    ],
  },
};

export default db;
