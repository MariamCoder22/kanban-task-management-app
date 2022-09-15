import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {cloneDeep} from 'lodash';
import {filter, map, Observable, of, pluck, take} from 'rxjs';
import {Priority} from '../../../../core/enums';
import {
  getCurrentBoard,
  getCurrentBoardIndex, getCurrentTasks,
  getNumberOfBoards, isLoadingBoards,
  isSavingBoard, isSavingTask,
} from '../../../../core/store/app.reducer';
import * as fromApp from '../../../../core/store/app.reducer';
import {Board, Column, Task} from '../interfaces';
import {Subtask} from '../interfaces/subtask.interface';
import * as boardActions from './boards.actions';

@Injectable({
  providedIn: 'root',
})
export class BoardsStoreFacade {
  boards$: Observable<Board[]> = this.store.pipe(pluck('boards'), filter(boards => boards.isLoaded), pluck('boards'));
  currentBoard$: Observable<Board | undefined> = this.store.pipe(select(getCurrentBoard));
  currentBoardIndex$: Observable<number> = this.store.pipe(select(getCurrentBoardIndex));
  currentColumns$: Observable<Column[]> = this.store.pipe(select(getCurrentBoard)).pipe(pluck('columns')) as Observable<Column[]>;
  currentTasks$: Observable<Task[]> = this.store.pipe(select(getCurrentTasks));
  isLoadingBoards$: Observable<boolean> = this.store.pipe(select(isLoadingBoards));
  isSavingBoard$: Observable<boolean> = this.store.pipe(select(isSavingBoard));
  isSavingTask$: Observable<boolean> = this.store.pipe(select(isSavingTask));
  numberOfBoards$: Observable<number> = this.store.pipe(select(getNumberOfBoards));
  priorities$: Observable<Priority[]> = of([Priority.Low, Priority.Medium, Priority.High, Priority.Critical]);
  statuses$: Observable<string[]> = this.currentBoard$.pipe(pluck('columns')) as Observable<string[]>;

  constructor(private store: Store<fromApp.State>) {
  }

  addNewBoard(board: Board): void {
    this.store.dispatch(boardActions.addNewBoard({board}));
  }

  createTask(task: Task): void {
    task.subtasks = task.subtasks.map(subtask => ({title: subtask, completed: false})) as Subtask[];
    this.store.dispatch(boardActions.createTask({task}));
  }

  deleteBoard(): void {
    this.store.dispatch(boardActions.deleteBoard());
  }

  deleteTask(task: Task): void {
    this.store.dispatch(boardActions.deleteTask({task}));
  }

  getCurrentTasks(column: string): Observable<Task[]> {
    return this.currentTasks$.pipe(map(tasks => (tasks || []).filter(task => task?.status === column)));
  }

  loadBoards(): void {
    this.store.dispatch(boardActions.loadBoards());
  }

  selectBoard(board: Board) {
    this.store.dispatch(boardActions.selectBoard({board}));
  }

  unselectBoard(): void {
    this.store.dispatch(boardActions.unselectBoard());
  }

  updateBoard(board: Board): void {
    this.store.dispatch(boardActions.updateBoard({board}));
  }

  updateMultipleTasks(task: Task, prevIndex: number, curIndex: number, previousColumn: string): void {
    this.store.pipe(select(getCurrentTasks)).pipe(take(1)).subscribe(tasks => {
      const updatedTasks: { id: string, task: Task }[] = [];
      if (task.status !== previousColumn) {
        const oldColumn = cloneDeep(tasks.filter(x => x.status === previousColumn));
        const newColumn = cloneDeep(tasks.filter(x => x.status === task.status));
        oldColumn.splice(prevIndex, 1);
        this.updateIndexes(oldColumn, updatedTasks);
        newColumn.splice(curIndex, 0, task);
        this.updateIndexes(newColumn, updatedTasks);
        if (task.seqNumber === curIndex) {
          updatedTasks.push({id: task.id!, task});
        }
      } else {
        const column = cloneDeep(tasks.filter(x => x.status === task.status));
        column.splice(prevIndex, 1);
        column.splice(curIndex, 0, task);
        this.updateIndexes(column, updatedTasks);
      }
      this.store.dispatch(boardActions.updateMultipleTasks({updatedTasks }));
    });
  }

  updateTask(task: Task): void {
    this.store.dispatch(boardActions.updateTask({task}));
  }

  private updateIndexes(column: Task[], updatedTasks: { id: string, task: Task }[]): void {
    column.forEach((task, idx) => {
      if (task.seqNumber !== idx) {
        task.seqNumber = idx;
        updatedTasks.push({ id: task.id!, task});
      }
    });
  }
}
