import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Platform} from '@angular/cdk/platform';
import {DataService} from '../data.service';
import {MatDialog} from '@angular/material';
import {MoodleLinkDialogComponent} from './moodle-link-dialog.component';

@Directive({
  selector: '[dashMoodleLink]'
})
export class MoodleLinkDirective implements OnInit{

  @Input() dashMoodleLink: string;

  private showDialog: boolean = false;

  constructor(private el: ElementRef, private domSanitizer: DomSanitizer, private platform: Platform, private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit() {
    this.initLink();
  }

  private initLink() {
    this.setHref(this.dashMoodleLink);
    this.el.nativeElement.target = '_blank';
    this.el.nativeElement.rel = 'noopener';

    if (this.platform.ANDROID || this.platform.IOS) {
      if (this.dataService.moodleAppInstalled === true) {
        this.setHref('moodlemobile://link=' + this.dashMoodleLink);
      } else if (this.dataService.moodleAppInstalled === undefined) {
        this.removeHref();
        this.showDialog = true;
      }
    }
  }

  private setHref(url: string) {
    this.el.nativeElement.href = url;
  }

  private removeHref() {
    this.el.nativeElement.removeAttribute('href');
  }

  @HostListener('click') onClick() {
    if (this.showDialog) {
      let dialogRef = this.dialog.open(MoodleLinkDialogComponent, {
        data: { url: this.dashMoodleLink },
      });

      dialogRef.afterClosed().subscribe(res => {
        this.initLink();
      })
    }
  }

}
