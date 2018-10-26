import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataService} from "../../data.service";
import {MatInput} from "@angular/material";

@Component({
  selector: 'dash-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  @Output('close') close: EventEmitter<any>;
  @ViewChild('searchInput') searchInput: MatInput;

  public term = '';

  constructor(public dataService: DataService) {
    this.close = new EventEmitter<any>();
  }

  ngOnInit() {
    this.searchInput.focus();
  }

  onClose() {
    this.close.emit();
  }

}
