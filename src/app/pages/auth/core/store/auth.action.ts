import {createAction, props} from '@ngrx/store';

export const signIn = createAction('[Auth Page] Sign In', props<{ password: string, email: string}>());
export const signInSuccess = createAction('[Firebase] Sign In Success');
export const signInFailure = createAction('[Firebase] Sign In Failure', props<{ error: any }>());

export const signUp = createAction('[Auth Page] Sign Up', props<{ password: string, email: string}>());
export const signUpSuccess = createAction('[Firebase] Sign Up Success');
export const signUpFailure = createAction('[Firebase] Sign Up Failure', props<{ error: any}>());

export const logout = createAction('[Sidenav] Logout');

export const resetErrors = createAction('[Auth Page] Reset errors');
