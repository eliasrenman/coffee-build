import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  avatar: string;
  displayName: string;
  id: number;
  token: string;
  subscriptions: [{
    device: string;
    id: number;
  }]
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user = new BehaviorSubject<User>(null);
  
  private tokenExpirationTimer: any;
  private logoutRedirectRoute = '/';

  constructor(private router: Router,
    private http: HttpClient) { }

  
  logout() {
    this.user.next(null);
    this.router.navigate([this.logoutRedirectRoute]);
    this.clearStorage();
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  loginByCode(returnCode: string) {
    this.http
      .get<AuthResponseData>(`${environment.apiEndpoint}/auth/callback?code=${returnCode}`)
      .subscribe(this.handleLogin)
  }

  private handleLogin(res: AuthResponseData) {
    const user = new User(res.avatar, res.displayName, res.token);
    this.user.next(user);
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
    } = JSON.parse(localStorage.getItem('auth-user'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.avatar,
      userData.displayName,
      userData._token,
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }
}