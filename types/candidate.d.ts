type AboutMeType = {
  id: number;
  firstName: string;
  lastName: string;
  imgURL: string;
  aboutMe: string;
  tags?: string[];
};

type ResumeVideoType = {
  id: number;
  title: string;
  created: number;
  views: number;
  url: string;
  tags?: string[];
  applications: number;
};

enum WorkTypeEnum {
  FullTime = 'FullTime',
  PartTime = 'PartTime',
}

type WorkExpType = {
  id: number;
  company: string;
  companyImgURL: string;
  position: string;
  startDate: string;
  endDate?: string;
  currentJob?: boolean;
  description: string;
  type: keyof typeof WorkTypeEnum;
  tags?: string[];
};

type EducationType = {
  id: number;
  name: string;
  schoolImgURL: string;
  degree: string;
  time: string;
  description: string;
};

type CandidatePageType = {
  user: AboutMeType;
  videos: ResumeVideoType[];
  workExp: WorkExpType[];
  education: EducationType[];
};
