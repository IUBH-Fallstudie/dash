import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material";

@Component({
  selector: 'dash-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.scss']
})
export class ModuleDetailComponent implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public module: any, private bottomSheetRef: MatBottomSheetRef<ModuleDetailComponent>) {
  }

  ngOnInit() {
    console.log(this.module);
  }

  openModule(name) {
    window.open('https://www.iubh-fernstudium.de/kurs/' + name.toLowerCase().replace(' ', '-'));
  }

}
