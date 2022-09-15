import {createServiceFactory, SpectatorService} from '@ngneat/spectator/jest';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {first} from 'rxjs';
import {isLoading, isLoggedIn} from '../../../../core/store/app.reducer';
import {AuthStoreFacade} from './auth-store.facade';
import * as fromAuth from './auth.reducer';

describe('AuthStoreFacade', () => {
  let spectator: SpectatorService<AuthStoreFacade>;
  let store: MockStore;
  const initialState: fromAuth.State = {isLoggedIn: true, isLoggingIn: true, authError: {code: 'auth/wrong-password'}};
  const createService = createServiceFactory({
    service: AuthStoreFacade,
    providers: [
      provideMockStore({initialState}),
    ],
  });

  beforeEach(() => {
    spectator = createService();
    store = spectator.inject(MockStore);
  });

  it('dispatches action for successful login', (done) => {
    spectator.service.preserveSession();
    store.scannedActions$.pipe(first()).subscribe(action => {
      expect(action.type).toBe('[Firebase] Sign In Success');
      done();
    })
  });

  it('dispatches sign up action with user credentials', (done) => {
    const password = 'abc123';
    const email = 'test@test.com'
    spectator.service.signUp(password, email);
    store.scannedActions$.pipe(first()).subscribe(action => {
      expect(action.type).toBe('[Auth Page] Sign Up');
      expect(action).toHaveProperty('email');
      expect(action).toHaveProperty('password');
      done();
    });
  });

  it('dispatches sign in action with user credentials', (done) => {
    const password = 'abc123';
    const email = 'test@test.com'
    spectator.service.signIn(password, email);
    store.scannedActions$.pipe(first()).subscribe(action => {
      expect(action.type).toBe('[Auth Page] Sign In');
      expect(action).toHaveProperty('email');
      expect(action).toHaveProperty('password');
      done();
    });
  });

  it('dispatches logout action', (done) => {
    spectator.service.logout();
    store.scannedActions$.pipe(first()).subscribe(action => {
      expect(action.type).toBe('[Sidenav] Logout');
      done();
    });
  });

  it('dispatches action to reset auth errors', (done) => {
    spectator.service.resetErrors();
    store.scannedActions$.pipe(first()).subscribe(action => {
      expect(action.type).toBe('[Auth Page] Reset errors');
      done();
    });
  });

  it('should select isLoggedIn from store', () => {
    const result = isLoggedIn.projector(initialState);
    expect(result).toBeTruthy();
  });

  it('should select isLoading from store', () => {
    const result = isLoading.projector(initialState);
    expect(result).toBeTruthy();
  });
});
