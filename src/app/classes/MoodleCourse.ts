/**
 * Ein Kurs aus Moodle inkl. zukünftiger Tutorien
 */
export class MoodleCourse {
  /** Von Moodle vergebene ID des Kurses */
  id: number;
  /** Voller Name */
  name: string;
  /** Abkürzung (identisch mit der Care-ID des Kurses) */
  shortname: string;
  /** Fortschritt der Übungen */
  progress: number;
  /** Kommende Tutorien */
  events: any[];
  /** Direkter Link zum Kurs auf myCampus*/
  url: string;
  /** URL für das Vorschaubild */
  image: string;
}
