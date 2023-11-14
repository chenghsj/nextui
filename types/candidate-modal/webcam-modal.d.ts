import { FilePath } from 'tailwindcss/types/config';

export interface IRecordedVideo {
  id: string;
  name: string;
  url: FilePath;
  [k: string]: string;
}
