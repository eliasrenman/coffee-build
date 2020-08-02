import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
  CanDeactivate
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanDeactivate {


  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {

    return this.auth.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/']);
      })
    );
  }

  canDeactive(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
      
    return this.auth.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if (isAuth) {
          return this.router.createUrlTree(['/']);
        }
        return true;
      })
    );
  }
  
}