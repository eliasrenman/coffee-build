import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/services/auth/user.model';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  user: User = null;
  subscription: Subscription;

  constructor(private dialog: MatDialog,
    private navservice: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.subscription = this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }


  logout() {
    this.authService.logout();
  }
  
  notYetImplemented() {
    alert("This button has yet to be implemented, but thank you for clicking it!")
  }
}
