import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'dash-tor',
  templateUrl: './tor.component.html',
  styleUrls: ['./tor.component.scss']
})
export class TorComponent implements OnInit {

  @Input() tor: any;

  constructor() {
  }

  ngOnInit() {}

  calcSemesterProgress(semester: any) {
    let passedModules = 0;
    let openModules = 0;
    for (const course of semester) {
      course.status === 'P' ? passedModules++ : openModules++;
    }
    return Math.floor(passedModules / (passedModules + openModules) * 100);
  }
}
