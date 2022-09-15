import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, from, map, of, switchMap, tap} from 'rxjs';
import {AuthStoreFacade} from './auth-store.facade';
import * as authActions from './auth.action';

@Injectable()
export class AuthEffects {
  signUp$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.signUp),
    switchMap(({email, password}) => {
      return from(this.auth.createUserWithEmailAndPassword(email, password)).pipe(
        map(() => authActions.signUpSuccess()),
        catchError((error) => of(authActions.signUpFailure({error}))),
      );
    }),
  ));

  signIn$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.signIn),
    switchMap(({email, password}) => {
        return from(this.auth.signInWithEmailAndPassword(email, password)).pipe(
          map(() => authActions.signInSuccess()),
          catchError((error) => of(authActions.signInFailure({error}))),
        )
      },
    ))
  );

  authSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.signInSuccess, authActions.signUpSuccess),
    tap(() => this.router.navigateByUrl('/'))
  ), { dispatch: false})

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.logout),
    switchMap(() => from(this.auth.signOut()).pipe(tap(() => this.router.navigateByUrl('/auth/sign-in')))
    )
  ), { dispatch: false});

  constructor(
    private actions$: Actions,
    private auth: AngularFireAuth,
    private authStoreFacade: AuthStoreFacade,
    private router: Router) {}
}
