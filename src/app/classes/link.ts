export class Link {
  picture: string;
  url: string;
  titel: string;
  description: string;
  mail: string;
  mailTitel: string;
  mailPicture: string;


  constructor(picture: string, url: string, titel: string, description: string, mail: string, mailTitel: string, mailPicture: string) {
    this.picture = picture;
    this.url = url;
    this.titel = titel;
    this.description = description;
    this.mail = mail;
    this.mailTitel = mailTitel;
    this.mailPicture = mailPicture;
  }
}
