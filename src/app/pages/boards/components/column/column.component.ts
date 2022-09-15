import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {Component, Input, OnInit} from '@angular/core';
import {cloneDeep} from 'lodash';
import {Observable} from 'rxjs';
import {Task} from '../../core/interfaces';
import {BoardsStoreFacade} from '../../core/store/boards-store.facade';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() column!: string;
  @Input() dropList!: string;
  @Input() id!: string;
  color: string = '#' + Math.floor(Math.random() * 16777215).toString(16);
  tasks$!: Observable<Task[]>;

  constructor(private boardsStoreFacade: BoardsStoreFacade) {
  }

  ngOnInit(): void {
    this.tasks$ = this.boardsStoreFacade.getCurrentTasks(this.column);
  }

  drop(event: CdkDragDrop<string | any>): void {
    if (event.previousIndex !== event.currentIndex || event.previousContainer.data !== event.container.data) {
      const task = cloneDeep(event.item.data);
      const previousColumn = task.status;
      task.status = event.container.data;
      this.boardsStoreFacade.updateMultipleTasks(task, event.previousIndex, event.currentIndex, previousColumn);
    }
  }
}
