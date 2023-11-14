type IHomeAccordion = {
  id: number;
  title: string;
  description: string;
};

type IHomeVideo = {
  id: number;
  url: string;
  title: string;
  description: string;
};

type IHomePage = {
  accordions: IHomeAccordion[];
  videos: IHomeVideo[];
};

type IDB = {
  home: IHomePage;
};
