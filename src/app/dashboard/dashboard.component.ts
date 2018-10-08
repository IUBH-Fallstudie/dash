import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'dash-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    //this.transcriptOfRecords();
    //this.auth();
  }

  private transcriptOfRecords() {
    this.http.get('/tor').subscribe();
  }

}
