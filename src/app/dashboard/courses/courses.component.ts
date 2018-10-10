import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'dash-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  @Input() tor: any;
  public courses = [];
  public term = '';

  constructor() { }

  ngOnInit() {
    for (let semester of this.tor) {
      for (let module of semester.modules) {
        for (let course of module.courses) {
          this.courses.push(course);
        }
      }
    }
  }

}
