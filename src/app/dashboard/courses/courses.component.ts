import {Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {DataService} from '../../data.service';
import {MatInput} from '@angular/material';
import {animate, state, style, transition, trigger, AnimationEvent} from '@angular/animations';
import {HttpClient} from '@angular/common/http';

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

  constructor(public dataService: DataService, private http: HttpClient) {
    this.close = new EventEmitter<any>();
  }

  ngOnInit() {
    this.searchInput.focus();
  }

  onClose() {
    this.close.emit();
  }

  onAnimationEvent(event: AnimationEvent) {
    console.log(event);
    if (event.fromState === 'open' && event.toState === 'close') {
      this.onClose();
    }
  }

  openCourseDescription (name) {
    const semester = this.searchSemesterData(name);
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
        });
  }
  public searchSemesterData(name): any {
    for (let semester of this.dataService._raw.transcriptOfRecords.tor) {
      console.log(semester);
      for (let module of semester.modules) {
        for (let courses of module.courses) {
          if (courses.name == name) {
            console.log(name, semester, 'hat geklappt');
            return semester.toString();
          }
        }
      }
    }
    return;
  }


}

@Pipe({
  name: 'searchCourses',
  pure: false
})
export class SearchCoursesFilter implements PipeTransform {
  transform(courses: any[], term: string): any[] {
    if (term !== '') {
      return courses.filter(course => !(!course.id.toLowerCase().includes(term.toLowerCase()) && !course.name.toLowerCase().includes(term.toLowerCase())));
    }
    return courses;
  }
}
