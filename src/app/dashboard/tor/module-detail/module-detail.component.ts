import {Component, ErrorHandler, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {DataService} from '../../../data.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'dash-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.scss'],
})
export class ModuleDetailComponent implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public dataBottom: any, private bottomSheetRef: MatBottomSheetRef<ModuleDetailComponent>,
              private http: HttpClient, private _loadingSpinner: Ng4LoadingSpinnerService) {
  }

  ngOnInit() {
    console.log(this.dataBottom.semesterName);
    console.log(this.dataBottom.moduleData);
  }

  openCourseDescription (name, semester) {
      this._loadingSpinner.show();
      this.http.get('/kurs/' + name.toLowerCase().replace(' ', '_'))
        .subscribe(
        (res) => {
          window.open('/kurs/' + name.toLowerCase().replace(' ', '-'));
          }, (err) => {
          if (semester.toString().includes('Wahlpflichtmodule')) {
            window.open('https://www.iubh-fernstudium.de/modulhandbuch/bachelor-wirtschaftsinformatik/'
              + '#semester5');
          } else {
            window.open('https://www.iubh-fernstudium.de/modulhandbuch/bachelor-wirtschaftsinformatik/'
              + '#semester' + semester.replace('. Semester', ''));
          }
          console.log('Semester', semester);
          }, () => {
          this._loadingSpinner.hide();
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
  // Semester des Kurses bekommen
  getSemester(course) {
  }
}
