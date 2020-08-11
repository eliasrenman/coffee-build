import { Path } from './../../shared/paths';
import { Endpoint } from './../../shared/api-endpoints';
import { AuthService } from './../../shared/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  redirectUrl: string;

  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private http: HttpClient) { }

  ngOnInit() {
    const loginCode = this.route.snapshot.queryParamMap.get("code");
    if(loginCode) {
      this.authService.loginByCode(loginCode);
      window.history.pushState({}, document.title, Path.HOME);
    } else {
      this.http.get(Endpoint.GET_AUTH_REDIRECT).subscribe((res: any) => {
        this.redirectUrl = res.data;
      })
    }

  }
  preventLinkClick(e: any) {
    if(!this.redirectUrl) {

      e.preventDefault();
    }
  }
}
