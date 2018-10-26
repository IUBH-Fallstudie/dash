import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../data.service";

@Component({
  selector: 'dash-basic-stats',
  templateUrl: './basic-stats.component.html',
  styleUrls: ['./basic-stats.component.scss']
})
export class BasicStatsComponent implements OnInit {

  public allProgress;

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.allProgress = this.dataService.allProgress;
  }

}
