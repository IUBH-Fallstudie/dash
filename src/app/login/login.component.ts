import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'dash-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: string;
  public pass: string;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  private auth(user: string, password: string) {
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
        res => {
          this.router.navigate(['']);
        },
        err => {
          //console.log(err);
          this.router.navigate(['']);
        }
      )
  }

}
