import {Injectable} from '@angular/core';
import {Links} from './links';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  public mainLinks: Links[];
  public functionLinks: Links[];

  constructor() {
    this.mainLinks = [
      new Links('dashboard', 'https://mycampus.iubh.de/my/', 'myCampus - Startseite',
        'Hier findest du alle Materialen für die Module'),
      new Links('live_help', 'https://care-fs.iubh.de/de/#', 'Care - Startseite',
        'Hier gibt es alle Infos zum Studium'),
      new Links('local_library', 'https://care-fs.iubh.de/de/studium/library-and-information-services.php',
        'Library Information Service', 'Hier geht es zur Büchersuche'),
    ];
    this.functionLinks = [
      new Links('note',
        'https://care-fs.iubh.de/de/studium/antragsverwaltung.php?p_id=4113&action=addRequestForm&id=10000073',
        'Antrag auf Einsicht stellen', 'Fülle das Formular aus, um eine Klausur einzusehen'),
      new Links('note', 'https://care-fs.iubh.de/de/studium//kursbuchung.php', 'Kursbuchung',
        'Buche hier direkt deine nächsten Kurse'),
    ];
  }
}
