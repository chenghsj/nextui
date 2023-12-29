import { FilePath } from 'tailwindcss/types/config';

export interface RecordedVideotype {
  id: string;
  name: string;
  url: FilePath;
  [k: string]: string;
}
