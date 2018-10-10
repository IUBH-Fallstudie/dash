import { Component, OnInit } from '@angular/core';
import {MatBottomSheetRef} from "@angular/material";

@Component({
  selector: 'dash-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.scss']
})
export class ModuleDetailComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<ModuleDetailComponent>) { }

  ngOnInit() {
  }

  // 'https://www.iubh-fernstudium.de/kurs/' + course.name.toLowerCase().replace(' ', '-')
}
