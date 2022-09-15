import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AddButtonComponent} from './add-button/add-button.component';
import {ModalModule} from './modal.module';
import {SpinnerComponent} from './spinner/spinner.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';

@NgModule({
    declarations: [SpinnerComponent, AddButtonComponent, ContextMenuComponent, ConfirmDeleteDialogComponent, ThemeToggleComponent],
    imports: [
        CommonModule,
        ModalModule,
        FormsModule,
    ],
  exports: [SpinnerComponent, AddButtonComponent, ContextMenuComponent, ConfirmDeleteDialogComponent, ThemeToggleComponent],
})
export class SharedModule {}
