import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { Meta } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

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

  // Actual Tab index
  public tabIndex: number;
  // Index of Tab that is being activated
  public currentIndex = 0;
  // Index of Tab after animation
  public activeIndex = 0;

  public searchOpen = false;

  constructor(private dataService: DataService, private meta: Meta, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.navigate(this.route.snapshot.params.tab);

    this.dataService.fetchRawInfo();

    this.dataService.authenticate(this.dataService._raw.userCredentials['user'], this.dataService._raw.userCredentials['pass'], success => {
      if (!success) {
        this.router.navigate(['auth']);
        this.snackBar.open('Dein Passwort scheint sich geändert zu haben. Bitte logge dich erneut ein.', 'Okay', {
          duration: 5500,
        });
      }
    });

    // Handle navigation when browser navigation is used
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart && event.navigationTrigger === 'popstate') {
        // Wait for NavigationEnd to navigate
        const navEndSub = this.router.events.subscribe((subEvent) => {
          if (subEvent instanceof NavigationEnd) {
            this.navigate(this.route.snapshot.params.tab);
            navEndSub.unsubscribe();
          }
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

  public closeSearch() {
    this.searchOpen = false;
    this.meta.updateTag({name: 'theme-color', content: '#103440'});
  }

  public get contentLoaded() {
    return (this.dataService.moodleCourses.length > 0 && this.dataService.transcriptOfRecords.tor.length !== null);
  }

  pseudoNavigate(url: string) {
    this.router.navigate([url]);
  }

  navigate(url: string) {
    switch (url) {
      case 'dashboard':
        this.tabIndex = 0;
        break;
      case 'kurse':
        this.tabIndex = 1;
        break;
      case 'schnellzugriff':
        this.tabIndex = 2;
        break;
    }
    this.pseudoNavigate(url);
  }

}
