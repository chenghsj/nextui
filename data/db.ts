const lorem20 =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo beatae ex esse corporis asperiores, adipisci culpa amet cum animi dolor.';

const lorem30 =
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio praesentium suscipit cupiditate laborum delectus expedita adipisci eveniet ullam officiis atque at exercitationem architecto nihil amet asperiores nobis, est fugit. Expedita.';

export const imageURL =
  'https://s3-alpha-sig.figma.com/img/15ce/1675/aedc0671b907cdaaa7729b4e72611ce2?Expires=1702252800&Signature=qRIHfahCjUUF7-NBlXeKfMlJn~4ilZ-pQ-lxiEI~UqzBQ~bTu32wbnCWQg~yp8ehihu4BB8-RISlRY2nmQjuOl45RYOY1CcyJ10u9P5-quF9pABvO3vPZsdwjXXbtZV3IJ9wJ7AnDgc6Whe-krI0xRis7EbcPGwanAJrxjW8FnLQoIGllxu~oV8q9H4E00XWXE4lDsTh8NwayC5Dee6vma5YkwRDWqsTRB-HPLwHF8qzX1bB8kRhqhyj~0RTwYE7klXDbAUqMlbOF8W5oQ82pOGM7y32oP6tVBCw-l1FRyjc~cHX4JI9vvItITS3PIlXjY3mJPIh6HQmRz-DUI23YQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4';

export const userTagList = ['#google', '#microsoft', '#meta', '#netflix'];

export const videoTagList = ['#fontend', '#tv', '#streaming', '#uiux'];

export const userVideoURLList = [
  'https://youtu.be/K4TOrB7at0Y?si=Mvw-9D0bKYYt_547',
  'https://youtu.be/xrRDlOWR1OU?si=4-Q657qmn81itZpI',
];

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
      firstName: '',
      lastName: '',
      imgURL: '',
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
    experience: {
      work: [
        {
          company: 'Apple Inc.',
          companyImgURL: '',
          position: 'Product Designer | Full',
          time: '2023/09/01 - Now',
          description: '',
          tags: ['#uiux', '#figma', '#b2b', '#iphone', '#ios16'],
        },
        {
          company: 'Google Inc.',
          companyImgURL: '',
          position: 'UX Designer | Full',
          time: '2020/12/01 - 2023/09/01',
          description: '',
          tags: ['#ai', '#b2c2b', '#b2b', '#productstrategy', '#generative'],
        },
      ],
    },
    education: {
      school: [
        {
          name: 'NCKU',
          schoolImgURL: '',
          degree: "Bachelor's Degree | Full",
          time: '2016/09/01 - 2020/06/30',
          description: '',
        },
      ],
    },
  },
};

export default db;
