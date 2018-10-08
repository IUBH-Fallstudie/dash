import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'dash-semester-table',
  templateUrl: './semester-table.component.html',
  styleUrls: ['./semester-table.component.scss']
})
export class SemesterTableComponent implements OnInit {

  @Input() semesterData;

  constructor() { }

  ngOnInit() {
  }

}
