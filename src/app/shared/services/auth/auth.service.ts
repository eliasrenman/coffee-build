import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  avatar: string;
  displayName: string;
  id: number;
  jwt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user = new BehaviorSubject<User>(null);
  
  private tokenExpirationTimer: any;
  private logoutRedirectRoute = '/';

  constructor(private router: Router) { }

  
  logout() {
    this.user.next(null);
    this.router.navigate([this.logoutRedirectRoute]);
    this.clearStorage();
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  private handleLogin(res: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + 86400 * 1000);
    const user = new User(res.avatar, res.displayName, res.jwt, expirationDate);
    this.user.next(user);
    this.autoLogout(86400 * 1000);
    localStorage.setItem('auth-user', JSON.stringify(user));
  }

  
  private clearStorage() {
    localStorage.removeItem('auth-user');
  }

  autoLogin() {
    const userData: {
      avatar: string;
      displayName: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('auth-user'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.avatar,
      userData.displayName,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}