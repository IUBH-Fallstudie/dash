import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../auth.service";
import {DataService} from "../../../data.service";

@Component({
  selector: 'dash-moodle-courses',
  templateUrl: './moodle-courses.component.html',
  styleUrls: ['./moodle-courses.component.scss']
})
export class MoodleCoursesComponent implements OnInit {


  constructor(public dataService: DataService) { }

  ngOnInit() {
  }

}
