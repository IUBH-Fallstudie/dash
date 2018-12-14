import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'dash-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.scss'],
})
export class ModuleDetailComponent implements OnInit {

  public loading = false;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private bottomSheetRef: MatBottomSheetRef<ModuleDetailComponent>,
              private http: HttpClient, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.data.moduleData.handbookLoading = true;
    this.loadHandbook(this.data.moduleData, this.data.searchView ? 'kurs' : 'modul');
    for (const course of this.data.moduleData.courses) {
      course.handbookLoading = true;
      this.loadHandbook(course, 'kurs');
    }
  }

  loadHandbook(parent, type) {
    this.http.get(this.generateHandbookLink(type, parent.name), {responseType: 'text'})
      .subscribe(
        (res) => {
          parent.handbookLink = 'https://www.iubh-fernstudium.de' + this.generateHandbookLink(type, parent.name);
          parent.handbookLoading = false;
          this.cdRef.detectChanges();
        },
        (err) => {
          parent.handbookLoading = false;
          this.cdRef.detectChanges();
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
  
  private generateHandbookLink(prefix: string, courseName: string): string {
    let urlCourseName = courseName.toLowerCase().replace(new RegExp(' ', 'g'), '-');
    urlCourseName = urlCourseName.replace(/ä/g, 'ae');
    urlCourseName = urlCourseName.replace(/ö/g, 'oe');
    urlCourseName = urlCourseName.replace(/ü/g, 'ue');
    urlCourseName = urlCourseName.replace(/ß/g, 'ss');
    return `/${prefix}/${urlCourseName}/`;
  }
}

