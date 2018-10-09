import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public get user(): any {
    return JSON.parse(window.localStorage.getItem('user'));
  }

  public set user(userData: any) {
    window.localStorage.setItem('user', JSON.stringify(userData));
  }

  public get moodleOverview() {
    return JSON.parse(window.localStorage.getItem('moodleOverview'));
  }

  public set moodleOverview(overviewData: any) {
    window.localStorage.setItem('moodleOverview', JSON.stringify(overviewData));
  }
}
