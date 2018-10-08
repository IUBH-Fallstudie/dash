import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'dash-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public userData: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.transcriptOfRecords();
  }

  private transcriptOfRecords() {
    this.http.get('/overview-data').subscribe(
      res => this.userData = res,
      err => console.error
    );
  }

}
