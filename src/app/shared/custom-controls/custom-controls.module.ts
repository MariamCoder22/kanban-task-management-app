import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DropdownComponent} from './dropdown/dropdown.component';



@NgModule({
  declarations: [DropdownComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [DropdownComponent]
})
export class CustomControlsModule { }
