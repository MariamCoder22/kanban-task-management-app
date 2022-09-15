import {createSelector} from '@ngrx/store';
import {selectLayout} from '../app.reducer';

export const selectTheme = createSelector(
  selectLayout,
  (state) => state.theme
);

export const selectSidenavState = createSelector(
  selectLayout,
  (state) => state.isSidenavClosed
);
