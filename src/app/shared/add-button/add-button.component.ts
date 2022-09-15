import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-add-button',
  template: `
    <button
      [disabled]="disabled$ | async"
      [style.padding]="padding"
      (click)="action()"
      class="button button--primary button--large">
      <i class="icon icon--add"></i>
      {{ label }}
    </button>`,
})
export class AddButtonComponent {
  @Input() action!: () => void;
  @Input() disabled$!: Observable<boolean>;
  @Input() label!: string;
  @Input() padding!: string;
}

