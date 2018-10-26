import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataService} from "../../data.service";
import {MatInput} from "@angular/material";
import {animate, state, style, transition, trigger, AnimationEvent} from "@angular/animations";

@Component({
  selector: 'dash-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('close', style({
        'margin-top': '100vh',
      })),
      state('open', style({
        'margin-top': 0,
        'border-radius': '0%',
      })),
      transition('void => open', [
        style({
          'margin-top': 'calc(100vh - 56px)',
        }),
        animate(300)
      ]),
      transition('* => close', [
        animate(300)
      ])
    ])
  ]
})
export class CoursesComponent implements OnInit {

  @Output('close') close: EventEmitter<any>;
  @ViewChild('searchInput') searchInput: MatInput;

  public term = '';
  public closed = false;

  constructor(public dataService: DataService) {
    this.close = new EventEmitter<any>();
  }

  ngOnInit() {
    this.searchInput.focus();
  }

  onClose() {
    this.close.emit();
  }

  onAnimationEvent(event: AnimationEvent) {
    console.log(event);
    if (event.fromState === 'open' && event.toState === 'close') {
      this.onClose();
    }
  }

}
