import {createComponentFactory, Spectator} from '@ngneat/spectator/jest';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {take} from 'rxjs';
import {ThemeService} from '../../core/services';
import {ModalService} from '../../core/services/modal.service';
import {getNumberOfBoards, isLoadingBoards} from '../../core/store/app.reducer';
import {LayoutStoreFacade} from '../../core/store/layout/layout-store.facade';
import {selectSidenavState} from '../../core/store/layout/layout.selector';
import {BoardsStoreFacade} from '../../pages/boards/core/store/boards-store.facade';
import {SidebarComponent} from './sidebar.component';

describe('SidebarComponent', () => {
  let store: MockStore;
  const initialState = {
    boards: {
      isLoaded: true,
      boards: [
        {
          id: '1234',
          name: 'MockBoard',
          columns: [{name: 'MockColumn1'}, {name: 'MockColumn2'}],
          isFullyLoaded: false,
        },
      ],
    },
    layout: {
      isSidenavClosed: false,
    },
  };
  const createComponent = createComponentFactory({
    component: SidebarComponent,
    providers: [
      provideMockStore({
        initialState,
        selectors: [
          {selector: selectSidenavState, value: initialState.layout.isSidenavClosed},
          {selector: getNumberOfBoards, value: initialState.boards.boards.length},
          {selector: isLoadingBoards, value: initialState.boards.isLoaded},
        ],
      }),
      BoardsStoreFacade,
      LayoutStoreFacade,
      ThemeService,
      ModalService,
    ],
  });
  let spectator: Spectator<SidebarComponent>;

  beforeEach(() => {
    spectator = createComponent();
    store = spectator.inject(MockStore);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should be expanded by default', () => {
    expect(spectator.query('.sidebar')).not.toHaveClass('sidebar--hidden');
  });

  it('should call the close handler', () => {
    const toggleFn = jest.spyOn(spectator.component, 'toggleSidenav');
    spectator.dispatchMouseEvent(spectator.query('.sidebar__sidebar-toggle')!, 'click');
    expect(toggleFn).toHaveBeenCalled();
  });

  it('should the sidebar be closed', () => {
    store.setState({layout: {isSidenavClosed: true}});
    store.select(selectSidenavState).pipe(take(1)).subscribe(() => {
      expect(spectator.query('.sidebar')).toHaveClass('sidebar--hidden');
    });
  });
});
