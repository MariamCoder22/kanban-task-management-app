import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, take} from 'rxjs';
import {DialogMode} from '../../../../core/enums';
import {BoardsStoreFacade} from '../../core/store/boards-store.facade';

@Component({
  selector: 'app-add-edit-board-dialog',
  templateUrl: './add-edit-board-dialog.component.html',
  styleUrls: ['./add-edit-board-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditBoardDialogComponent implements OnInit {
  @Input() mode: DialogMode = DialogMode.Add;
  form!: FormGroup;
  isSavingBoard$: Observable<boolean> = this.boardStoreFacade.isSavingBoard$;

  get columns() {
    return (this.form.get('columns') as FormArray).controls;
  }

  constructor(
    private boardStoreFacade: BoardsStoreFacade,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();
    if (this.mode === DialogMode.Edit) {
      this.populateForm();
    }
  }

  onAddNewColumn(): void {
    (this.form.get('columns') as FormArray).push(this.formBuilder.control('', [Validators.required]));
  }

  onRemoveColumn(idx: number): void {
    (this.form.get('columns') as FormArray).removeAt(idx);
  }

  onSubmit(): void {
    const board = { ...this.form.value };
    board.columns = board.columns.filter(Boolean);

    this.mode === DialogMode.Add
      ? this.boardStoreFacade.addNewBoard(board)
      : this.boardStoreFacade.updateBoard(board)
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      columns: this.formBuilder.array([this.formBuilder.control('')]),
    });
  }

  private populateForm() {
    this.boardStoreFacade.currentBoard$.pipe(take(1)).subscribe(board => {
      this.form.addControl('id', this.formBuilder.control(board?.id));
      const columns = this.form.get('columns') as FormArray;
      columns.clear();
      board?.columns.forEach(column => {
        columns.push(new FormControl(column, Validators.required));
      });
      this.form.patchValue({name: board?.name});
    });
  }
}
