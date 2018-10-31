import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';

@Component({
  selector: 'dash-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.scss']
})
export class ModuleDetailComponent implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public module: any, private bottomSheetRef: MatBottomSheetRef<ModuleDetailComponent>) {
  }

  ngOnInit() {
    console.log(this.module);
  }

  // noch verbessern
  courseLink(name) {
    window.open('https://www.iubh-fernstudium.de/kurs/' + name.toLowerCase().replace(' ', '-'));
    // return 'https://www.iubh-fernstudium.de/kurs/' + name.toLowerCase().replace(' ', '_');
  }

  /*openCourseDescription(event: MouseEvent) {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  } */
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
