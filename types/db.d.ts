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
  candidate: CandidatePageType;
};
