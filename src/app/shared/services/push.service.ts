import { environment } from 'src/environments/environment';
import { Endpoint } from './../api-endpoints';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/services/auth/user.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Injectable, OnDestroy } from "@angular/core";
import { Subscription as UserSubscription } from './auth/user.model';

@Injectable({
  providedIn: "root"
})
export class PushService implements OnDestroy {
  private static SW_PATH = '/assets/sw.js';
  user: User;
  userSub: Subscription;

  constructor(private auth: AuthService,
    private http: HttpClient) { 
      this.userSub = this.auth.user.subscribe(res => this.user = res);
    }

  ngOnDestroy(): void {
    if(this.user)
      this.userSub.unsubscribe();
  }

  public registerDevice() {
    if (this.user) {
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        return;
      }
      navigator.serviceWorker.register(PushService.SW_PATH).then(() => {

        this.askPermission().then(() => {
          this.registerServiceWorker().then((value: PushSubscription) => {
            this.storeSubscription(value);
          });
        });
      })
    }
  }

  private askPermission() {
    return new Promise((resolve, reject) => {
      Notification.requestPermission().then((result) => {
        resolve(result);
      });
    })
      .then((permissionResult) => {
        if (permissionResult !== 'granted') {
          throw new Error('We weren\'t granted permission.');
        }
      });
  }

  private registerServiceWorker() {
    return navigator.serviceWorker.register(PushService.SW_PATH)
      .then((registration) => {
        return registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.urlBase64ToUint8Array(environment.apiVapId)
        });
      })
      .then((pushSubscription) => {
        return pushSubscription;
      });
  }
  private urlBase64ToUint8Array(base64String) {
    const base64 = (base64String + '='.repeat((4 - base64String.length % 4) % 4))
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
    
    const rawData = window.atob(base64);
    let outputArray = new Uint8Array(rawData.length);
    
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    console.log(base64String, base64, outputArray);
    return outputArray;
  }

  private storeSubscription(subscription: PushSubscription) {
    var platform = require('platform');
    let data = {
      device: platform.description,
      ...subscription.toJSON()
    }

    this.http.post<{data: UserSubscription[]}>(Endpoint.POST_NOTIFICATION, data)
      .subscribe(res => {
        this.user.subscriptions = res.data;
        this.auth.user.next(this.user);
      });
  }
}