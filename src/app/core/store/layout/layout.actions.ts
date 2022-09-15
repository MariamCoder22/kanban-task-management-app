import {createAction, props} from '@ngrx/store';
import {Theme} from '../../enums';

export const setTheme = createAction('[Sidenav] Set theme', props<{ theme: Theme}>());
export const toggleTheme = createAction('[Sidenav] Toggle sidenav');
