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

  public get activeMoodleCourses(): any[] {
    const activeCourses = [];
    for (const torCourse of this.allCourses) {
      for (const moodleCourse of this.moodleCourses) {
        if (torCourse.id === moodleCourse.shortname && torCourse.status === 'A') {
          activeCourses.push(moodleCourse);
        }
      }
    }
    return activeCourses;
  }

  public get upcomingActiveCourseEvents(): any[] {
    const activeCourses = this.activeMoodleCourses;
    let events = [];
    for (const course of activeCourses) {
      events = events.concat(course.events);
    }
    events.sort((a, b) => {
      return b.timesort - a.timesort;
    });
    return events;
  }

  public get allProgress(): any {
    const semesters = this._raw.transcriptOfRecords.tor;
    let passedModules = 0;
    let openModules = 0;
    let ticks = 0;
    for (const semester of semesters) {
      if (semester.name.includes('Semester')) {
        ticks++;
        for (const module of semester.modules) {
          for (const course of module.courses) {
            course.status === 'B' ? passedModules++ : openModules++;
          }
        }
      }
    }
    return {
      passed: passedModules,
      open: openModules,
      all: passedModules + openModules,
      ticks: ticks,
    };
  }

  public get isLoggedIn() {
    return this._raw.userCredentials && this._raw.userCredentials['user'];
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

    // Setze zusätzlich zum Moodle auth den Moodle Session Cookie, damit Bilder laden (funktioniert nur mit https)
    this.http.post('https://mycampus.iubh.de/login/index.php', `anchor=&username=${user}=${password}&rememberusername=1`,
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