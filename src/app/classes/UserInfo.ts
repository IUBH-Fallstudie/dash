/** Informationen über den Nutzer. */
export class UserInfo {
  /** Vorname */
  firstName: string;
  /** Nachname */
  lastName: string;
  /** Voller Name */
  fullName: string;
  /** Nutzer-ID des Moodle-Kurses */
  moodleId: number;
  /** Login-Token des Session aus Moodle */
  moodleToken: string;
}
