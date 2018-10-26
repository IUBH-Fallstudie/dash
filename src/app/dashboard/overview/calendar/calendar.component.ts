import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../data.service";

@Component({
  selector: 'dash-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit() {
  }

}
