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
}
