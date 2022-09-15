import {createReducer, on} from '@ngrx/store';
import {Theme} from '../../enums';
import * as layoutActions from './layout.actions';

export interface State {
  theme: Theme,
  isSidenavClosed: boolean
}

export const initialState: State = {
  theme: Theme.Light,
  isSidenavClosed: false
}

export const reducer = createReducer(
  initialState,
  on(layoutActions.setTheme, (state, action) => ({...state, theme: action.theme})),
  on(layoutActions.toggleTheme, (state) => ({...state, isSidenavClosed: !state.isSidenavClosed}))
);

