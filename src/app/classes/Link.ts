export class Link {
  title: string;
  description: string;
  icon: string;
  url: string;

  constructor(picture: string, url: string, titel: string, description: string) {
    this.icon = picture;
    this.url = url;
    this.title = titel;
    this.description = description;
  }
}
