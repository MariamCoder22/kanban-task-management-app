import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {filter, fromEvent, merge} from 'rxjs';
import {ModalService} from '../../core/services/modal.service';

@UntilDestroy()
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() closeAction = () => this.modalService.close();
  @Output() close = new EventEmitter<boolean>();

  constructor(private modalService: ModalService) {
  }

  ngOnInit(): void {
    merge(
      fromEvent(document, 'click'),
      fromEvent(document, 'keydown'),
    ).pipe(filter((event) =>
      (event instanceof MouseEvent && (event.target as HTMLElement).classList.contains('overlay')) || (event instanceof KeyboardEvent && event.key === 'Escape'),
    ), untilDestroyed(this)).subscribe(this.onClose.bind(this));
  }

  onClose(): void {
    this.close.emit(true);
    this.closeAction();
  }
}
