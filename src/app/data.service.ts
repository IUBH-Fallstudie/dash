import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public _raw = {
    transcriptOfRecords: {tor: [], weightedOverall: 0},
    moodleCourses: [],
    userCredentials: {},
    userInfo: {}
  };

  constructor(private http: HttpClient) {
    this.loadLocal();
  }

  public get transcriptOfRecords() {
    return this._raw.transcriptOfRecords;
  }

  public get allCourses(): any[] {
    const courses = [];
    for (let semester of this._raw.transcriptOfRecords.tor) {
      for (let module of semester.modules) {
        for (let course of module.courses) {
          courses.push(course);
        }
      }
    }
    return courses;
  }

  public get moodleCourses(): any[] {
    return this._raw.moodleCourses;
  }

  public fetchRawInfo() {
    this.http.get('/care/tor').subscribe(
      (res: any) => {
        this._raw.transcriptOfRecords = res;
        this.saveLocal();
      }
    );

    this.http.post('/moodle/overview', this._raw.userCredentials).subscribe(
      (res: any[]) => {
        this._raw.moodleCourses = res;
        this.saveLocal();
      }
    );
  }

  public authenticate(user: string, password: string, callback: any) {
    this.http.post('/moodle/auth', {user: user, pass: password})
      .subscribe(
        res => {
          this._raw.userInfo = res;
          this._raw.userCredentials = {user: user, pass: password};
          callback(true);
        },
        err => {
          console.error(err);
          callback(false);
        }
      );

    this.http.post('/en/', `login-form=login-form&user=${user}&password=${password}&login-referrer=`,
      {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Upgrade-Insecure-Requests': '1',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
          }
        )
      })
      .subscribe(
        // Moodle kümmert sich um die Erfolgreiche Authentifizierung. Deshalb findet hier kein Error-Handling statt.
      );
  }

  private saveLocal() {
    window.localStorage.setItem('_raw', JSON.stringify(this._raw));
  }

  private loadLocal() {
    const localState = window.localStorage.getItem('_raw');
    if (localState !== null && localState !== undefined) {
      this._raw = JSON.parse(window.localStorage.getItem('_raw'));
    }
  }
}
