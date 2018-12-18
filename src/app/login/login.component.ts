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


  constructor(private router: Router, private dataService: DataService, public snackBar: MatSnackBar,
              private titleService: Title) {
    const illustrations = ['examen', 'finish', 'laptop', 'study'];
    this.backgroundIllustration = illustrations[Math.floor(Math.random() * illustrations.length)]
  }

  get canLogin(): boolean {
    return !(this.user === '' || this.pass === '')
  }

  public user: string = '';
  public pass: string = '';

  public loading: boolean = false;

  public backgroundIllustration = '';

<<<<<<< HEAD
  linkExample: LinkPreview = {
    title: 'Dash',
    description: 'Dash soll die IT-Systemlandschaft des IUBH-Fernstudiums zusammenführen und zugänglicher machen.\n' +
      '        Daten aus den Plattformen myCampus und Care sollen\n' +
      '        übersichtlich dargestellt und wichtige Informationen hervorgehoben werden.',
    image: 'assets/android-chrome-192x192.png',
    url: 'https://dash.g1b.me/'
  };
=======

  constructor(private router: Router, private dataService: DataService, public snackBar: MatSnackBar) {
    const illustrations = ['examen', 'finish', 'laptop', 'study'];
    this.backgroundIllustration = illustrations[Math.floor(Math.random() * illustrations.length)]
  }
>>>>>>> 1d1f23bf8b5698fa498410ff8a1b20b31d5a23d5

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

<<<<<<< HEAD
=======
  get canLogin(): boolean {
    return !(this.user === '' || this.pass === '')
  }

>>>>>>> 1d1f23bf8b5698fa498410ff8a1b20b31d5a23d5
}
