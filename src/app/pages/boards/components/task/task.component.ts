import {Component, Input, OnInit} from '@angular/core';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {
  faExclamationTriangle,
  faGaugeHigh,
  faGaugeMed,
  faTemperatureLow,
} from '@fortawesome/free-solid-svg-icons';
import {Priority} from '../../../../core/enums';
import {ModalService} from '../../../../core/services/modal.service';
import {Task} from '../../core/interfaces';
import {Subtask} from '../../core/interfaces/subtask.interface';
import {PreviewTaskComponent} from '../preview-task/preview-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;
  criticalIcon = faExclamationTriangle;
  highIcon = faGaugeHigh;
  lowIcon = faTemperatureLow;
  midIcon = faGaugeMed;
  priority = Priority;

  get completed() {
    return (this.task.subtasks as Subtask[]).filter((task) => task.completed).length;
  }

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  getIcon(): IconDefinition {
    switch(this.task.priority) {
      case Priority.Critical: {
        return this.criticalIcon;
      }
      case Priority.High: {
        return this.highIcon;
      }
      case Priority.Medium: {
        return this.midIcon;
      }
      case Priority.Low: {
        return this.lowIcon;
      }
    }
  }

  previewTask() {
    this.modalService.open(PreviewTaskComponent, { task: this.task });
  }
}
