import { Component, OnInit } from '@angular/core';
import {DataService} from '../../data.service';
import {Platform} from '@angular/cdk/platform';

@Component({
  selector: 'dash-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(public dataService: DataService, public platform: Platform) { }

  ngOnInit() {
  }

  public showMoodleAppInstalledSetting(): boolean {
    return this.platform.ANDROID || this.platform.IOS;
  }

}
