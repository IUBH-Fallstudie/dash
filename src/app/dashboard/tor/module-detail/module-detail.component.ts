import {Component, ErrorHandler, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'dash-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.scss'],
})
export class ModuleDetailComponent implements OnInit {
  private _detailUrl: String = ' ';

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public module: any, private bottomSheetRef: MatBottomSheetRef<ModuleDetailComponent>,
              private http: HttpClient) {
  }

  ngOnInit() {
    console.log(this.module);
  }

  /*
  courseLink(name) {
    window.open('https://www.iubh-fernstudium.de/kurs/' + name.toLowerCase().replace(' ', '-'));
  } */

  openCourseDescription (name) {
      this.http.get('/kurs/' + name.toLowerCase().replace(' ', '_'))
        .subscribe(
        (res) => {
          window.open('/kurs/' + name.toLowerCase().replace(' ', '-'));
          }, (err) => {
          window.open('/kurs/');
          });
  }

  getStatus(module) {
    if (module.courses.length === 1) {
      return module.courses[0].status;
    }

    let lastStatus = '';
    let hasOpenCourse = false;
    for (const course of module.courses) {
      if (course.status !== '') {
        lastStatus = course.status;
      } else {
        hasOpenCourse = true;
      }
    }
    return lastStatus === 'B' && hasOpenCourse ? 'A' : lastStatus;
  }
}
