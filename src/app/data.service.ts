import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Course, TranscriptOfRecords} from './classes/TranscriptOfRecords';
import {MoodleCourse} from './classes/MoodleCourse';
import {UserInfo} from './classes/UserInfo';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public _raw = {
    transcriptOfRecords: new TranscriptOfRecords([], 0),
    moodleCourses: [],
    userCredentials: undefined,
    userInfo: {},
    moodleAppInstalled: undefined
  };

  constructor(private http: HttpClient) {
    this.loadLocal();
  }

  public get transcriptOfRecords(): TranscriptOfRecords {
    return this._raw.transcriptOfRecords;
  }

  public get userInfo(): UserInfo {
    return this._raw.userInfo as UserInfo;
  }

  // Das ist definitv bad practise! Bessere Lösungen erfordern, dass der Nutzer für jede Session sein PW erneut eingibt
  public get userCredentials() {
    if (this._raw.userCredentials) {
      return JSON.parse(window.atob(this._raw.userCredentials));
    }
  }

  public set userCredentials(userCredentials: any) {
    this._raw.userCredentials = window.btoa(JSON.stringify(userCredentials));
    this.saveLocal();
  }

  public get allCourses(): Course[] {
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

  public get moodleCourses(): MoodleCourse[] {
    return this._raw.moodleCourses;
  }

  public get activeMoodleCourses(): MoodleCourse[] {
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
          module.status === 'B' ? passedModules++ : openModules++;
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

  public get isLoggedIn(): boolean {
    return this.userCredentials && this.userCredentials['user'];
  }

  public get moodleAppInstalled(): boolean {
    return this._raw.moodleAppInstalled;
  }

  public set moodleAppInstalled(moodleAppInstalled: boolean) {
    this._raw.moodleAppInstalled = moodleAppInstalled;
    this.saveLocal();
  }

  public fetchRawInfo(): void {
    this.http.get('/care/tor').subscribe(
      (res: any) => {
        this._raw.transcriptOfRecords = res;
        this.saveLocal();
      }
    );

    this.http.post('/moodle/overview', this.userCredentials).subscribe(
      (res: any[]) => {
        this._raw.moodleCourses = res;
        this.saveLocal();
      }
    );
  }

  public authenticate(user: string, password: string, callback: any): void {
    this.http.post('/moodle/auth', {user: user, pass: password})
      .subscribe(
        res => {
          this._raw.userInfo = res;
          this.userCredentials = {user: user, pass: password};
          callback(true);
        },
        err => {
          console.error(err);
          callback(false);
        }
      );

    this.http.post('/en/', `login-form=login-form&user=${user}&password=${password}&login-referrer=`,
      {
        responseType: 'text',
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

  private saveLocal(): void {
    window.localStorage.setItem('_raw', JSON.stringify(this._raw));
  }

  private loadLocal(): void {
    const localState = window.localStorage.getItem('_raw');
    if (localState !== null && localState !== undefined) {
      this._raw = JSON.parse(window.localStorage.getItem('_raw'));
    }
  }

  public logout(): void {
    this._raw = undefined;
    window.localStorage.removeItem('_raw');
    location.reload();
  }
}
