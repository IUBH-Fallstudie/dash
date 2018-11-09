import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Meta} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'dash-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('fabShowHide', [
      state('show', style({
        transform: 'scale(1)',
      })),
      state('hide', style({
        transform: 'scale(0)',
      })),
      transition('show => hide', [
        animate('0.2s'),
      ]),
      transition('hide => show', [
        animate('0.2s'),
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {

  // Index of Tab that is being activated
  public currentIndex = 0;
  // Index of Tab after animation
  public activeIndex = 0;

  public searchOpen = false;

  constructor(private dataService: DataService, private meta: Meta, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.dataService.fetchRawInfo();

    this.dataService.authenticate(this.dataService._raw.userCredentials['user'], this.dataService._raw.userCredentials['pass'], success => {
      if (!success) {
        this.router.navigate(['auth']);
        this.snackBar.open('Dein Passwort scheint sich geändert zu haben. Bitte logge dich erneut ein.', 'Okay', {
          duration: 5500,
        });
      }
    });
  }

  openSearch() {
    this.searchOpen = true;
    setTimeout(() => {
      this.meta.updateTag({name: 'theme-color', content: '#e68c74'});
    }, 300);
  }

  closeSearch() {
    this.searchOpen = false;
    this.meta.updateTag({name: 'theme-color', content: '#103440'});
  }

  public get contentLoaded() {
    return (this.dataService.moodleCourses.length > 0 && this.dataService.transcriptOfRecords.tor.length !== null);
  }

}
