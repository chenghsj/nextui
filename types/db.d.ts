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

type ICandidatePage = {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    imgURL: string;
    tags?: string[];
  };
  videos: {
    id: number;
    title: string;
    created: number;
    views: number;
    url: string;
    tags?: string[];
    applications: number;
  }[];
  experience: {
    work: {
      company: string;
      companyImgURL: string;
      position: string;
      time: string;
      description: string;
      tags?: string[];
    }[];
  };
  education: {
    school: {
      name: string;
      schoolImgURL: string;
      degree: string;
      time: string;
      description: string;
    }[];
  };
};

type IDB = {
  home: IHomePage;
  candidate: ICandidatePage;
};
