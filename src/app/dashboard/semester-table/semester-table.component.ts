import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'dash-semester-table',
  templateUrl: './semester-table.component.html',
  styleUrls: ['./semester-table.component.scss']
})
export class SemesterTableComponent implements OnInit {

  @Input() semesterData;

  displayedColumns: string[] = ['module', 'status'];

  constructor() { }

  ngOnInit() {
  }

  getStatus(module) {
    if (module.courses.length === 1) {
      return module.courses[0].status;
    }

    let lastStatus = '';
    let hasOpenCourse = false;
    for (let course of module.courses) {
      if (course.status !== '') {
        lastStatus = course.status;
      } else {
        hasOpenCourse = true;
      }
    }
    return lastStatus === 'B' && hasOpenCourse ? 'A' : lastStatus;
  }

}
