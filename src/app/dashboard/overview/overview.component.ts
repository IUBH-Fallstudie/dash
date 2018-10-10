import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../auth.service";

@Component({
  selector: 'dash-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  @Input('tor') tor: any;
  public activeCourses = [];

  constructor(public a: AuthService) {
  }

  ngOnInit() {
    for (let semester of this.tor) {
      for (let module of semester.modules) {
        for (let course of module.courses) {
          if (course.status === 'A') {
            for (let moodleCourse of this.a.moodleOverview) {
              if (course.id === moodleCourse.shortName) {
                this.activeCourses.push(moodleCourse);
                console.log(moodleCourse);
                break;
              }
            }
          }
        }
      }
    }
  }

}
