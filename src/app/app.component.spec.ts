import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {AppComponent} from './app.component';
import {createComponentFactory, Spectator} from '@ngneat/spectator/jest';
import {ModalService} from './core/services/modal.service';
import {LayoutStoreFacade} from './core/store/layout/layout-store.facade';

describe('AppComponent', () => {
  let store: MockStore;
  const createComponent = createComponentFactory({
    component: AppComponent,
    providers: [LayoutStoreFacade, ModalService, provideMockStore({})],
  });
  let spectator: Spectator<AppComponent>;

  beforeEach(() => {
    spectator = createComponent();
    store = spectator.inject(MockStore);
  });

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [
  //       AppComponent,
  //       SidebarComponent,
  //       NavbarComponent
  //     ],
  //     providers: [ThemeService, provideMockStore({})]
  //   }).compileComponents();
  //
  //   store = TestBed.inject(MockStore);
  // });

  it('should create the app', () => {
    const app = spectator.component;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'kanban-task-management-web-app'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('kanban-task-management-web-app');
  // });
  //
  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('kanban-task-management-web-app app is running!');
  // });
});
