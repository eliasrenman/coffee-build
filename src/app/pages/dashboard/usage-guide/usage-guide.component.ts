import { Subscription } from 'rxjs';
import { Endpoint } from './../../../shared/api-endpoints';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/services/auth/user.model';

@Component({
  selector: 'app-usage-guide',
  templateUrl: './usage-guide.component.html',
  styleUrls: ['./usage-guide.component.scss']
})
export class UsageGuideComponent implements OnInit {

  user: User;
  userSub: Subscription;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(user => {
      this.user = user;
    });
  }

  get notification_endpoint() {
    return Endpoint.GET_NOTIFICATION + this.user.eid;
  }
}
