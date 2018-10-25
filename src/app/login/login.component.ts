import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {DataService} from "../data.service";

@Component({
  selector: 'dash-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: string;
  public pass: string;

  public error: boolean = false;

  constructor(private http: HttpClient, private router: Router, private dataService: DataService) { }

  ngOnInit() {
  }

  public login() {
    this.dataService.authenticate(this.user, this.pass, success => {
      if (success) {
        this.router.navigate(['']);
      } else {
        this.error = true;
      }
    });
  }

}
