import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'dash-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: string;
  public pass: string;

  constructor(private http: HttpClient, private router: Router, private as: AuthService) { }

  ngOnInit() {
  }

  public auth(user: string, password: string) {
    this.http.post('/moodle/auth', {user: user, pass: password})
      .subscribe(
        res => {
          this.as.user = res;
          this.as.credentials = {user: user, pass: password};
          console.log(res);
          this.router.navigate(['']);
        },
        err => {
          console.error(err);
        }
      );

    this.http.post('/en/', `login-form=login-form&user=${user}&password=${password}&login-referrer=`,
      {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Upgrade-Insecure-Requests': '1',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
          }
        )
      })
      .subscribe(
        // Moodle will handle authentication
        res => {
        },
        err => {
        }
      );
  }

}
