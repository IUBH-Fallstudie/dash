import {Component, OnInit} from '@angular/core';
import {Link} from '../../classes/Link';
import {ContactInfo} from '../../classes/ContactInfo';

@Component({
  selector: 'dash-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {

  public platformLinks: Link[] = [
    new Link('dashboard', 'https://mycampus.iubh.de/my/', 'myCampus - Startseite',
      'Hier findest du alle Materialen für die Module'),
    new Link('live_help', 'https://care-fs.iubh.de/de/#', 'Care - Startseite',
      'Alle Infos zum Studium'),
    new Link('local_library', 'https://care-fs.iubh.de/de/studium/library-and-information-services.php',
      'Library Information Service', 'Hier geht es zur Bücherei'),
  ];
  public functionLinks: Link[] = [
    new Link('note',
      'https://care-fs.iubh.de/de/studium/antragsverwaltung.php',
      'Anträge stellen', 'Anträge stellen und verwalten'),
    new Link('note', 'https://care-fs.iubh.de/de/studium/kursbuchung.php', 'Kursbuchung',
      'Buche hier direkt deine nächsten Kurse'),
  ];
  public contactInfos: ContactInfo[] = [
    new ContactInfo('Studierendensekretariat', '+49 (0)8651 90234 53', 'studium@iubh-fernstudium.de'),
    new ContactInfo('Prüfungsamt', '+49 (0)8651 90234 28', 'pruefungsamt@iubh-fernstudium.de'),
    new ContactInfo('Anerkennung', '+49 (0)8651 90234 56','anerkennung@iubh-fernstudium.de'),
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
