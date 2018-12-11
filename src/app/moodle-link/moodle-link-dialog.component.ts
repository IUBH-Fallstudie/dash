import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DataService} from '../data.service';

@Component({
  selector: 'dash-moodle-link-dialog',
  templateUrl: './moodle-link-dialog.component.html',
  styleUrls: ['./moodle-link-dialog.component.scss']
})
export class MoodleLinkDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<MoodleLinkDialogComponent>, private dataService: DataService) { }

  ngOnInit() {
  }

  onButtonClicked(appInstalled: boolean) {
    this.dataService.moodleAppInstalled = appInstalled;
    this.dialogRef.close();
  }
}
