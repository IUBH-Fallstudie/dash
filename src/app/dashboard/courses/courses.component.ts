import {Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {DataService} from '../../data.service';
import {MatBottomSheet, MatInput} from '@angular/material';
import {animate, state, style, transition, trigger, AnimationEvent} from '@angular/animations';
import {HttpClient} from '@angular/common/http';
import {ModuleDetailComponent} from '../tor/module-detail/module-detail.component';
import {SearchService} from './search.service';

@Component({
  selector: 'dash-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('close', style({
        'margin-top': '100vh',
      })),
      state('open', style({
        'margin-top': 0,
        'border-radius': '0%',
      })),
      transition('void => open', [
        style({
          'margin-top': 'calc(100vh - 56px)',
        }),
        animate(300)
      ]),
      transition('* => close', [
        animate(300)
      ])
    ])
  ]
})
export class CoursesComponent implements OnInit {

  @Output('close') close: EventEmitter<any>;
  @ViewChild('searchInput') searchInput: MatInput;

  public term = '';
  public closed = false;

  constructor(public dataService: DataService, private http: HttpClient, private bottomSheet: MatBottomSheet,
              public torService: SearchService) {
    this.close = new EventEmitter<any>();
  }

  ngOnInit() {
    this.searchInput.focus();
  }

  onClose() {
    this.close.emit();
  }

  onAnimationEvent(event: AnimationEvent) {
    if (event.fromState === 'open' && event.toState === 'close') {
      this.onClose();
    }
  }

  public getCourseInfo(courseId): any {
    for (const semester of this.dataService.transcriptOfRecords.tor) {
      for (const module of semester.modules) {
        for (const course of module.courses) {
          if (course.id === courseId) {
            return {
              semesterName: semester.name,
              module: module,
              courseId: course.id
            }
          }
        }
      }
    }
    return;
  }

  openRecords(course: any) {
    this.closed = true;
    const courseInfo = this.getCourseInfo(course.id);
    this.torService.openTor(courseInfo.semesterName);
    this.openBottomSheet(courseInfo.module, courseInfo.courseId);
  }

  openBottomSheet(module, highlightCourse): void {
    this.bottomSheet.open(ModuleDetailComponent, {
      data: {
        moduleData: module,
        searchView: true,
        highlightCourse: highlightCourse
      }
    });
  }

}

@Pipe({
  name: 'searchCourses',
  pure: false
})
export class SearchCoursesFilter implements PipeTransform {
  transform(courses: any[], term: string): any[] {
    if (term !== '') {
      return courses.filter(course => !(!course.id.toLowerCase().includes(term.toLowerCase())
        && !course.name.toLowerCase().includes(term.toLowerCase())));
    }
    return courses;
  }
}
