import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  semester: string;

  constructor() { }

  openTor(semester) {
    this.semester = semester;
  }
}
