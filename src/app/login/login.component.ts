import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../data.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'dash-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: string = '';
  public pass: string = '';


  constructor(private router: Router, private dataService: DataService, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  public login() {
    this.dataService.authenticate(this.user, this.pass, success => {
      if (success) {
        this.router.navigate(['']);
      } else {
        this.pass = '';
        this.snackBar.open('Nutzername und Passwort stimmen nicht überein. Bitte versuche es erneut.', 'Okay', {
          duration: 5500,
        });
      }
    });
  }

}
