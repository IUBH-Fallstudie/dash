import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../auth.service";

@Component({
  selector: 'dash-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  @Input('tor') tor: any;

  constructor(public a: AuthService) {
  }

  ngOnInit() {
  }

  openMyCampus(url) {
    console.log(url);
    window.open(url);
  }
}
