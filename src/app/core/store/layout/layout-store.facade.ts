import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Theme} from '../../enums';
import * as fromApp from '../app.reducer';
import {selectSidenavState, selectTheme} from './layout.selector';
import * as layoutActions from './layout.actions';

@Injectable({
  providedIn: 'root'
})
export class LayoutStoreFacade {
  isSidenavClosed$: Observable<boolean> = this.store.pipe(select(selectSidenavState));
  theme$: Observable<Theme> = this.store.pipe(select(selectTheme));

  constructor(private store: Store<fromApp.State>) {
  }

  toggleSidenav(): void {
    this.store.dispatch(layoutActions.toggleTheme());
  }
}
