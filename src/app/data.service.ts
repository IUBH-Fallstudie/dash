import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Course, TranscriptOfRecords} from './classes/TranscriptOfRecords';
import {MoodleCourse} from './classes/MoodleCourse';
import {UserInfo} from './classes/UserInfo';


/**
 * Der DataService verwaltet alle Daten der Applikation.
 * Er spricht die von Server bereitgestellten Schnittstellen an und speichert die Daten im LocalStorage.
 * Außerdem sind hier stellt er einige Helper-Functions für Datentransformationen bereit.
 */
@Injectable({
  providedIn: 'root'
})
export class DataService {

  /** Objekt, welches als Basis der Daten agiert. Er wird bei Initialisierung */
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

  /** Liefere alle Kurse aus allen Semestern und Modulen in einem Array */
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

  /** Hole Moodle-Kurse, die derzeit bearbeitet werden.
   * Hierfür wird der Status aus Care verglichen.
   * myCampus zeigt auch bereits abgeschlossene Kurse als aktiv an.
   * Dieses Problem wird damit umgangen.
   * */
  public get activeMoodleCourses(): MoodleCourse[] {
    const activeCourses = [];

    for (const moodleCourse of this.moodleCourses) {
      const matchingCourses = this.allCourses.filter(c =>
        c.id === moodleCourse.shortname);
      if (matchingCourses.length === 1 && matchingCourses[0].status === 'A') {
        activeCourses.push(moodleCourse);
      } else if (matchingCourses.length > 1) {
        if (
          (matchingCourses.filter(c => c.status === 'B').length === 0) &&
          (matchingCourses.filter(c => c.status === 'A').length >= 1)
        ) {
          activeCourses.push(moodleCourse);
        }
      }
    }

    return activeCourses;
  }

  /**
   * Liefere alle Tutorien, die in der Zukunft liegen.
   */
  public get upcomingActiveCourseEvents(): any[] {
    const activeCourses = this.activeMoodleCourses;
    let events = [];
    for (const course of activeCourses) {
      events = events.concat(course.events);
    }
    events.sort((a, b) => {
      return a.timesort - b.timesort;
    });
    return events;
  }

  /** Gebe den Gesamtfortschritt des Studiums zurück */
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
    // Workaround für einen Bug, der die URL-Generierung zerschießt
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }

  /**
   * Hole alle benötigten Daten auf Care und myCampus und speichere diese
   * persistent im LocalStorage
   * */
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

  /**
   * Authentifiziere den User in Care und myCampus
   * @param user
   * @param password
   * @param callback
   */
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

  /** Speichere State im LocalStorage */
  private saveLocal(): void {
    window.localStorage.setItem('_raw', JSON.stringify(this._raw));
  }

  /** Lade gespeicherte Daten aus dem LocalStorage */
  private loadLocal(): void {
    const localState = window.localStorage.getItem('_raw');
    if (localState !== null && localState !== undefined) {
      this._raw = JSON.parse(window.localStorage.getItem('_raw'));
    }
  }

  /** */
  public logout(): void {
    this._raw = undefined;
    window.localStorage.removeItem('_raw');
    location.reload();
  }
}
