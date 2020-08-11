import { Endpoint } from './../../api-endpoints';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  data: {
    avatar: string;
    name: string;
    id: number;
    token: string;
    subscriptions: [{
      device: string;
      id: number;
    }]
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user = new BehaviorSubject<User>(null);
  
  private logoutRedirectRoute = '/';

  constructor(private router: Router,
    private http: HttpClient) { }

  
  logout() {
    this.user.next(null);
    this.router.navigate([this.logoutRedirectRoute]);
    this.clearStorage();
  }

  loginByCode(returnCode: string) {
    this.http
      .get<AuthResponseData>(Endpoint.GET_AUTH_CALLBACK + returnCode)
      .subscribe(this.handleLogin)
  }

  private handleLogin(res: AuthResponseData) {
    const user = new User(
      res.data.avatar, 
      res.data.name, 
      res.data.token, 
      res.data.subscriptions);
    console.log(this.user);
    this.user.next(user);
    localStorage.setItem('auth-user', JSON.stringify(user));
  }

  
  private clearStorage() {
    localStorage.removeItem('auth-user');
  }

  autoLogin() {
    const userData: {
      avatar: string;
      name: string;
      _token: string;
    } = JSON.parse(localStorage.getItem('auth-user'));
    if (!userData) {
      return;
    }
    

    const loadedUser = new User(
      userData.avatar,
      userData.name,
      userData._token,
    );

    this.http.get<{
      data: [Subscription]}
      >(Endpoint.GET_SUBSCRIPTIONS, {                                                                                                                                                                                 
        headers: AUTH_HEADER(loadedUser), 
      }).subscribe(res => {
        loadedUser.subscriptions = res.data;
      })

    if (loadedUser.token) {
      console.log(loadedUser);
      this.user.next(loadedUser);
    }
  }
}

export function AUTH_HEADER(user) {
  return {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
      'Authorization': `Bearer ${user.token}`,
  }
}