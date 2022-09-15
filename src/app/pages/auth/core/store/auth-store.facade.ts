import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {filter, map, Observable} from 'rxjs';
import {authError, isLoading, isLoggedIn} from '../../../../core/store/app.reducer';
import * as fromApp from '../../../../core/store/app.reducer';
import * as authActions from './auth.action';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreFacade {
  isAuthError$: Observable<string> = this.store.pipe(select(authError)).pipe(filter(Boolean), map(({code}) => {
    let message = 'Error occurred.';
    switch (code) {
      case 'auth/wrong-password': {
        message = 'Invalid credentials.';
        break;
      }
      case 'auth/user-not-found': {
        message = 'User with this e-mail does not exist.';
        break
      }
      case 'auth/email-already-in-use': {
        message = 'User already exists, please sign in.';
        break;
      }
    }
    return message;
  }));
  isLoading$: Observable<boolean> = this.store.pipe(select(isLoading));
  isLoggedIn$: Observable<boolean> = this.store.pipe(select(isLoggedIn));

  constructor(private store: Store<fromApp.State>) {
  }

  preserveSession(): void {
    this.store.dispatch(authActions.signInSuccess());
  }

  signUp(password: string, email: string): void {
    this.store.dispatch(authActions.signUp({password, email}));
  }

  signIn(password: string, email: string): void {
    this.store.dispatch(authActions.signIn({password, email}));
  }

  logout(): void {
    this.store.dispatch(authActions.logout());
  }

  resetErrors(): void {
    this.store.dispatch(authActions.resetErrors());
  }
}
