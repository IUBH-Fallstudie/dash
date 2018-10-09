import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from "@angular/material";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'dash-semester-table',
  templateUrl: './semester-table.component.html',
  styleUrls: ['./semester-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SemesterTableComponent implements OnInit {

  @Input() semesterData: any;

  displayedColumns: string[] = ['module', 'status'];

  constructor() {
  }

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
