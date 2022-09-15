import {FormBuilder} from '@angular/forms';
import {Spectator, createComponentFactory} from '@ngneat/spectator/jest';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {ModalService} from '../../../../core/services/modal.service';
import {BoardsStoreFacade} from '../../core/store/boards-store.facade';
import {PreviewTaskComponent} from './preview-task.component';

class Task {
  constructor(
    public author: string,
    public id: string,
    public title: string,
    public description: string,
    public status: string,
    public subtasks: { title: string, completed: boolean }[]) {
  }
}

describe('PreviewTaskComponent', () => {
  let store: MockStore;
  const createComponent = createComponentFactory({
    component: PreviewTaskComponent,
    providers: [BoardsStoreFacade, ModalService, FormBuilder, provideMockStore({})],
  });
  let spectator: Spectator<PreviewTaskComponent>;

  beforeEach(() => {
    spectator = createComponent({
      props: {
        task: {
          author: '12jdasd012edas',
          id: '313212adsdasdsaas',
          title: 'Super Task',
          description: 'Lorem ipsum',
          subtasks: [{title: 'my subtask', completed: false}],
          status: 'todo',
        },
      },
    });
    store = spectator.inject(MockStore);
  });

  it('should create component', () => {
    expect(spectator.component).toBeDefined();
  });

  it('should return number of completed subtasks', () => {
    spectator.setInput('task', new Task('123', '345', 'Test Task', 'No Description', 'todo',
      [{title: 'First subtask', completed: false}, {title: 'Second subtask', completed: true}]));
    expect(spectator.component.completed).toBe(1);
  });
});
