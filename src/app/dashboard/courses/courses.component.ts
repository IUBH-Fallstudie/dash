import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../data.service";

@Component({
  selector: 'dash-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  public term = '';

  constructor(public dataService: DataService) { }

  ngOnInit() {
  }

}
