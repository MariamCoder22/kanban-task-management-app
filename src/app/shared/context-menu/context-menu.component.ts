import {Component, HostListener, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {ContextMenu} from '../../core/interfaces';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent {
  @HostListener('document:click', ['$event']) onClick(event: MouseEvent) {
    if (!this.isOpen) { return; }

    if (!(event.target as HTMLElement).closest('.context-menu')
      || (event.target as HTMLElement).classList.contains('context-menu__item')) {
      this.isOpen = false;
    }
  }
  @Input() contextMenu!: ContextMenu[];
  @Input() disabled$!: Observable<boolean>;
  @Input() rightOffset = 9;
  contextMenuId = Math.floor(Math.random() * 100);
  isOpen = false;

  executeAction(action: () => void) {
    this.isOpen = false;
    action();
  }
}
