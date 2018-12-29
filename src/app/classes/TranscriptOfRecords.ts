/**
 * Ein Kurs aus Care
 */
export class Course {
  /** CP für den Kurs. Im Format `Aktuell / Gesamt`*/
  credits: string;
  /** Datum, an welchem die Note vergeben wurde */
  date: any;
  /** Benotung als String (kan ggf. `passed` oder ähnliches sein) */
  grade: any;
  /** Benotung als Nummer. Für statistische Auswertung. */
  gradeNum: number;
  /** ID des Kurses (shortname)*/
  id: string;
  /** Name des Kurses*/
  name: string;
  /** Erreichte Punktzahl in der Klausur */
  rating: any;
  /** Status (Bestanden, zur Klausur angemeldet etc. */
  status: string;
  /** Grundkurs, Wahlpflicht etc. */
  type: string;
}

/** Beschreibt ein Modul aus Care.
 * Es hat die selbe Struktur wie ein Kurs, nur dass es ein Array von Kursen als Attribut besitzt.*/
export class Module extends Course{
  /** Zum Modul gehörende Kurse*/
  courses: Array<Course>;
}

/** Stellt eine Sammlung von Modulen dar. */
export class Semester {
  /** Module des Semesters */
  modules: Array<Module>;
  /** Bezeichnung */
  name: string;
}

/**
 * Beinhaltet alle Informationen zu Semestern, Modulen und Kursen inkl. dem gewichteten Notendurchschnitt.
 * */
export class TranscriptOfRecords {
  /** Liste der Semester */
  tor: Array<Semester>;
  /** Gewichteter Notendurchschnitt */
  weightedOverall: any;

  constructor(tor: Array<Semester>, weightedOverall: any) {
    this.tor = tor;
    this.weightedOverall = weightedOverall;
  }

}
