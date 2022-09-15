import {createComponentFactory, Spectator} from '@ngneat/spectator/jest';
import {Subject} from 'rxjs';
import { AddButtonComponent } from './add-button.component';

describe('AddButtonComponent', () => {
  const createComponent = createComponentFactory({
    component: AddButtonComponent
  });
  let spectator: Spectator<AddButtonComponent>;

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should have label "Add Task"', () => {
    spectator.setInput('label', 'Add Task');
    expect(spectator.query('button')).toHaveText('Add Task');
  });

  it('should call action callback', () => {
    const action = jest.fn();
    spectator.setInput('action', action);
    spectator.dispatchMouseEvent(spectator.query('button')!, 'click');
    expect(action).toHaveBeenCalledTimes(1);
  });

  it('should be disabled', () => {
    const disabled$ = new Subject<boolean>();
    spectator.setInput('disabled$', disabled$);
    disabled$.next(true);
    spectator.detectChanges();
    expect(spectator.query('button')).toBeDisabled();
  });
});
