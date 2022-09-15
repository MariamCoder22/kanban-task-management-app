import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from '../modal/modal.component';

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.scss']
})
export class ConfirmDeleteDialogComponent implements OnInit {
  @ViewChild(ModalComponent, { static: true}) modal!: ModalComponent;
  @Input() closeAction?: () => void;
  @Input() label!: { type: 'Board' | 'Task'; name: string };
  @Output() response$ = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    if (this.closeAction) {
      this.modal.closeAction = this.closeAction;
    }
  }

  confirm() {
    this.response$.emit(true);
    if (typeof this.closeAction === 'function') {
      this.closeAction();
    }
  }

  decline() {
    this.response$.emit(false);
    if (typeof this.closeAction === 'function') {
      this.closeAction();
    }  }
}
