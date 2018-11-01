export class Link {
  picture: string;
  url: string;
  titel: string;
  description: string;


  constructor(picture: string, url: string, titel: string, description: string) {
    this.picture = picture;
    this.url = url;
    this.titel = titel;
    this.description = description;
  }
}
