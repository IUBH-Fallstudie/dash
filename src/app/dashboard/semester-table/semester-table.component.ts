import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'dash-semester-table',
  templateUrl: './semester-table.component.html',
  styleUrls: ['./semester-table.component.scss']
})
export class SemesterTableComponent implements OnInit {

  @Input() semesterData;

  displayedColumns: string[] = ['module', 'status'];

  constructor() { }

  ngOnInit() {
  }

  generateStatus(module) {

  }

}
