import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Meta} from "@angular/platform-browser";

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

  constructor(private dataService: DataService, private meta: Meta) {
  }

  ngOnInit() {
    this.dataService.fetchRawInfo();
  }

  openSearch() {
    this.searchOpen = true;
    setTimeout(() => {
      this.meta.updateTag({name: 'theme-color', content: '#e68c74'});
    }, 300);
  }

  closeSearch() {
    this.searchOpen = false;
    this.meta.updateTag({name: 'theme-color', content: '#113a47'});
  }


}
