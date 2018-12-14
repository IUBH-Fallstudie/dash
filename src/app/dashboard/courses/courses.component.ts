import {Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {DataService} from '../../data.service';
import {MatBottomSheet, MatInput} from '@angular/material';
import {animate, state, style, transition, trigger, AnimationEvent} from '@angular/animations';
import {HttpClient} from '@angular/common/http';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {ModuleDetailComponent} from '../tor/module-detail/module-detail.component';

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

  constructor(public dataService: DataService, private http: HttpClient, private bottomSheet: MatBottomSheet) {
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

  //TODO
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

  openBottomSheet(data): void {
    this.bottomSheet.open(ModuleDetailComponent, {
      data: {
        moduleData: data,
        searchView: true,
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
      return courses.filter(course => !(!course.id.toLowerCase().includes(term.toLowerCase()) && !course.name.toLowerCase().includes(term.toLowerCase())));
    }
    return courses;
  }
}
