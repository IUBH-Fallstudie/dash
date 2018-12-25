import {Component, OnInit} from '@angular/core';
import {DataService} from '../../data.service';

@Component({
  selector: 'dash-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(public dataService: DataService) {
  }

  ngOnInit() {
  }
}
