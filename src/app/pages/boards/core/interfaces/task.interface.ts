import {Priority} from '../../../../core/enums';
import {Subtask} from './subtask.interface';

export interface Task {
  author: string;
  id?: string;
  description: string;
  priority: Priority;
  seqNumber: number;
  subtasks: Subtask[] | string[];
  status: string;
  title: string;
}
