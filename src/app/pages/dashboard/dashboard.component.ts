import { PushService } from './../../shared/services/push.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private push: PushService) { }

  ngOnInit(): void {
    this.push.registerDevice();
  }

}
