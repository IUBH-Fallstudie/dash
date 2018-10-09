import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatBottomSheet} from "@angular/material";
import {ModuleDetailComponent} from "./module-detail/module-detail.component";

@Component({
  selector: 'dash-tor',
  templateUrl: './tor.component.html',
  styleUrls: ['./tor.component.scss']
})
export class TorComponent implements OnInit {

  @Input() tor: any;

  constructor(private bottomSheet: MatBottomSheet) {
  }

  ngOnInit() {}

  calcSemesterProgress(semester: any) {
    let passedModules = 0;
    let openModules = 0;
    for (const course of semester) {
      course.status === 'B' ? passedModules++ : openModules++;
    }
    return Math.floor(passedModules / (passedModules + openModules) * 100);
  }

  openBottomSheet(moduleData): void {
    console.log(moduleData);
    this.bottomSheet.open(ModuleDetailComponent);
  }
}
