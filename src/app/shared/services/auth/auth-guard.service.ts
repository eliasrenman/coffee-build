import { HomeComponent } from './../../../pages/home/home.component';
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
import { Path } from '../../paths';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanDeactivate<HomeComponent> {


  constructor(private auth: AuthService, private router: Router) { }
  

  public canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): any {
    
    return this.auth.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree([Path.LOGGED_OUT_ROUTE]);
      })
    );
  }

  canDeactivate(component: HomeComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {   
    return this.auth.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if (isAuth) {
          return this.router.createUrlTree([Path.LOGGED_IN_ROUTE]);
        }
        return true;
      })
    );
  }
  
}