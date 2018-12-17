import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../data.service";
import {MatSnackBar} from "@angular/material";
import {LinkPreview, MatLinkPreviewService} from '@angular-material-extensions/link-preview';
import {Title} from '@angular/platform-browser';

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

  linkExample: LinkPreview = {
    title: 'Dash',
    description: 'Dash soll die IT-Systemlandschaft des IUBH-Fernstudiums zusammenführen und zugänglicher machen.\n' +
      '        Daten aus den Plattformen myCampus und Care sollen\n' +
      '        übersichtlich dargestellt und wichtige Informationen hervorgehoben werden.',
    image: 'assets/android-chrome-192x192.png',
    url: 'https://dash.g1b.me/'
  };

  ngOnInit() {
    this.titleService.setTitle('Dash Campus - Demo-App für die IUBH');
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
