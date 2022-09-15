import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {DialogMode, Priority} from '../../../../core/enums';
import {Task} from '../../core/interfaces';
import {Subtask} from '../../core/interfaces/subtask.interface';
import {BoardsStoreFacade} from '../../core/store/boards-store.facade';

@Component({
  selector: 'app-add-edit-task-dialog',
  templateUrl: './add-edit-task-dialog.component.html',
  styleUrls: ['./add-edit-task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditTaskDialogComponent implements OnInit {
  form!: FormGroup;
  isSavingTask$: Observable<boolean> = this.boardsStoreFacade.isSavingTask$;
  mode: DialogMode = DialogMode.Add;
  priorities$: Observable<Priority[]> = this.boardsStoreFacade.priorities$;
  task?: Task;

  get subtaskArray() {
    return this.form.get('subtasks') as FormArray;
  }

  get subtaskControls() {
    return (this.form.get('subtasks') as FormArray).controls;
  }

  constructor(
    public boardsStoreFacade: BoardsStoreFacade,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();
    if (this.task) {
      this.populateForm();
    }
  }

  onAddSubtask(): void {
    this.subtaskArray.push(this.formBuilder.control('', Validators.required));
  }

  onDeleteSubtask(i: number): void {
    this.subtaskArray.removeAt(i);
  }


  onSubmit() {
    const task = this.form.value;

    if (this.mode === DialogMode.Edit && Array.isArray(this.task!.subtasks) && this.task!.subtasks.length) {
      task.subtasks = (task.subtasks as string[])?.map((subtask, idx) => {
        return (this.task!.subtasks[idx] as Subtask)?.title === subtask ? this.task!.subtasks[idx] : { title: subtask, completed: false };
      });
      task.id = this.task!.id;
      task.seqNumber = this.task!.seqNumber;
    }

    this.mode === DialogMode.Add
      ? this.boardsStoreFacade.createTask(task)
      : this.boardsStoreFacade.updateTask(task);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      title: this.formBuilder.control('', Validators.required),
      description: this.formBuilder.control('', Validators.required),
      priority: this.formBuilder.control('Medium', Validators.required),
      subtasks: this.formBuilder.array([this.formBuilder.control('', Validators.required)]),
      status: this.formBuilder.control('', Validators.required),
    });
  }

  private populateForm() {
    this.mode = DialogMode.Edit;
    const subtasks = this.form.get('subtasks') as FormArray;
    subtasks.clear();
    this.task!.subtasks?.forEach(subtask => {
      subtasks.push(this.formBuilder.control((subtask as Subtask).title, Validators.required));
    });

    this.form.patchValue({title: this.task!.title, description: this.task!.description, priority: this.task?.priority, status: this.task!.status});
  }
}
