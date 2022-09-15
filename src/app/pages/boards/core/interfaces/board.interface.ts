import {Column} from './column.interface';

export interface Board {
  author: string;
  id: string;
  name: string;
  columns: Column[]
  isFullyLoaded: boolean;
}
