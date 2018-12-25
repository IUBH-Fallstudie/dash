export class Course {
  credits: string;
  date: any;
  grade: any;
  gradeNum: number;
  id: string;
  name: string;
  rating: any;
  status: string;
  type: string;
}

export class Module extends Course{
  courses: Array<Course>;
}

export class Semester {
  modules: Array<Module>;
  name: string;
}


export class TranscriptOfRecords {
  tor: Array<Semester>;
  weightedOverall: any;

  constructor(tor: Array<Semester>, weightedOverall: any) {
    this.tor = tor;
    this.weightedOverall = weightedOverall;
  }

}
