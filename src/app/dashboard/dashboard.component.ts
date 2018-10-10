import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth.service";

@Component({
  selector: 'dash-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public userData: any;

  constructor(private http: HttpClient, private a: AuthService) {
  }

  ngOnInit() {
    this.transcriptOfRecords();
    this.moodleOverview();
  }

  private transcriptOfRecords() {
    this.http.get('/care/tor').subscribe(
      res => this.userData = res,
      err => console.error
    );
  }

  private moodleOverview() {
    this.http.post('/moodle/overview', this.a.user).subscribe(
      (res) => {
        this.a.moodleOverview = res;
      }
    );
  }

}
