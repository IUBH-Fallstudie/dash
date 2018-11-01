import { Component, OnInit } from '@angular/core';
import {LinkService} from './link.service';

@Component({
  selector: 'dash-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {

  constructor(public link: LinkService) { }

  ngOnInit() {
  }

}
