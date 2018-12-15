import {Component, OnInit} from '@angular/core';
import {MatBottomSheet} from '@angular/material';
import {ModuleDetailComponent} from './module-detail/module-detail.component';
import {DataService} from '../../data.service';

@Component({
  selector: 'dash-tor',
  templateUrl: './tor.component.html',
  styleUrls: ['./tor.component.scss'],
})
export class TorComponent implements OnInit {
  public step = '';

  constructor(private bottomSheet: MatBottomSheet, public dataService: DataService) {
  }

  ngOnInit() {
  }


  calcSemesterProgress(semester: any) {
    let passedModules = 0;
    let openModules = 0;
    for (const course of semester) {
      course.status === 'B' ? passedModules++ : openModules++;
    }
    return Math.floor(passedModules / (passedModules + openModules) * 100);
  }

  openBottomSheet(moduleData, semesterName): void {
    console.log(moduleData);
    console.log(semesterName);
    this.bottomSheet.open(ModuleDetailComponent, {
      data: {
        moduleData: moduleData,
        semesterName: semesterName
      }
    });
  }
}
