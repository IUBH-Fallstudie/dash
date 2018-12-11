import {Component, OnInit} from '@angular/core';
import {Link} from '../../classes/link';

@Component({
  selector: 'dash-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {

  public mainLinks: Link[] = [
    new Link('dashboard', 'https://mycampus.iubh.de/my/', 'myCampus - Startseite',
      'Hier findest du alle Materialen für die Module', '', ''),
    new Link('live_help', 'https://care-fs.iubh.de/de/#', 'Care - Startseite',
      'Hier gibt es alle Infos zum Studium', '', ''),
    new Link('local_library', 'https://care-fs.iubh.de/de/studium/library-and-information-services.php',
      'Library Information Service', 'Hier geht es zur Büchersuche', '', ''),
  ];
  public functionLinks: Link[] = [
    new Link('note',
      'https://care-fs.iubh.de/de/studium/antragsverwaltung.php?p_id=4113&action=addRequestForm&id=10000073',
      'Antrag auf Einsicht stellen', 'Fülle das Formular aus, um eine Klausur einzusehen', '', ''),
    new Link('note', 'https://care-fs.iubh.de/de/studium//kursbuchung.php', 'Kursbuchung',
      'Buche hier direkt deine nächsten Kurse', '', ''),
  ];
  public phoneLinks: Link[] = [
    new Link('phone', 'tel:+4986519023453', 'Studierendensekretariat', '+49 (0)8651 90234 53',
      'mail:studium@iubh-fernstudium.de', 'studium@iubh-fernstudium.de'),
    new Link('phone', 'tel:+4986519023428', 'Prüfungsamt', '+49 (0)8651 90234 28',
      'mail:pruefungsamt@iubh-fernstudium.de', 'pruefungsamt@iubh-fernstudium.de'),
    new Link('phone', 'tel:+4986519023456', 'Anerkennung', '+49 (0)8651 90234 56',
      'mail:anerkennung@iubh-fernstudium.de', 'anerkennung@iubh-fernstudium.de'),
    ];

  constructor() {
  }

  ngOnInit() {
  }

}
