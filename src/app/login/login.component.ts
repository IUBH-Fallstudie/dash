import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../data.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'dash-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private router: Router, private dataService: DataService, public snackBar: MatSnackBar) {
    const illustrations = ['examen', 'finish', 'laptop', 'study'];
    this.backgroundIllustration = illustrations[Math.floor(Math.random() * illustrations.length)];
  }

  get canLogin(): boolean {
    return !(this.user === '' || this.pass === '');
  }

  public user = '';
  public pass = '';

  public loading = false;

  public backgroundIllustration = '';

  ngOnInit() {
  }

  public login(): void {
    if (this.canLogin) {
      this.loading = true;
      this.dataService.authenticate(this.user, this.pass, success => {
        if (success) {
          this.router.navigate(['']);
        } else {
          this.pass = '';
          this.snackBar.open('Nutzername und Passwort stimmen nicht überein. Bitte versuche es erneut.', 'Okay', {
            duration: 5500,
          });
        }
        this.loading = false;
      });
    }
  }
}
