  
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
  HttpResponse
} from '@angular/common/http';
import { take, exhaustMap, map } from 'rxjs/operators';
import { AuthService, AUTH_HEADER } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if(this.auth.user) {
      
    }
    return this.auth.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }

        const modifiedReq = req.clone({
          setHeaders: AUTH_HEADER(user),
        });
        return next.handle(modifiedReq);
      })
    );
  }

  
}
