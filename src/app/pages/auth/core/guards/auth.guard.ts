import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable, take} from 'rxjs';
import {AuthStoreFacade} from '../store/auth-store.facade';

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authStoreFacade: AuthStoreFacade, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>  {
    return this.authStoreFacade.isLoggedIn$.pipe(take(1),map(isLoggedIn => {
      return isLoggedIn || this.router.createUrlTree(['/auth/sign-in']);
    }));
  }
}
