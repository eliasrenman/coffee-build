import { Subscription } from 'rxjs';
import { Endpoint } from './../../../shared/api-endpoints';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/shared/services/auth/user.model';

@Component({
  selector: 'app-usage-guide',
  templateUrl: './usage-guide.component.html',
  styleUrls: ['./usage-guide.component.scss']
})
export class UsageGuideComponent implements OnInit, OnDestroy {

  user: User;
  userSub: Subscription;

  constructor(private auth: AuthService) { }
  ngOnDestroy(): void {
    if(this.user) {
      this.userSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
      this.user = user;
    });
  }

  get notification_endpoint() {
    return Endpoint.GET_NOTIFY_USER + this.user.eid;
  }
}
