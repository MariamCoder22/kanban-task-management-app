import {animate, state, style, transition, trigger} from '@angular/animations';
import {Component, forwardRef, Injector, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  animations: [trigger('showOptions', [
    state('close', style({
      transform: 'rotate(0)'
    })),
    state('open', style({
      transform: 'rotate(-180deg)'
    })),
    transition('close <=> open', [
      animate('.3s ease-in')
    ])
  ])],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements OnInit, ControlValueAccessor {
  @Input() options$!: Observable<string[]>;
  @Input() selected?: string;
  control!: NgControl;
  hasError = false;
  errorMessage = `This field is required!`;
  isExpanded = false;
  isDisabled = false;
  onChange!: (_: any) => void;
  onTouched!: () => void;

  constructor(private injector: Injector) {}

  ngOnInit()  : void {
    this.control = this.injector.get(NgControl);
  }

  toggleDropdown(): void {
    if (typeof this.onTouched === 'function') {
      this.hasError = !!(this.control.errors && this.control.touched);
      this.onTouched();
    }
    this.isExpanded = !this.isExpanded;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  selectOption(option: string): void {
    this.selected = option;
    if (typeof this.onChange === 'function') {
      this.onChange(this.selected);
      this.toggleDropdown();
    }
  }

  writeValue(obj: any): void {
    this.selectOption(obj);
  }


}
