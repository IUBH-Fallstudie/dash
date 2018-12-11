import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodleLinkDialogComponent } from './moodle-link-dialog.component';

describe('MoodleLinkDialogComponent', () => {
  let component: MoodleLinkDialogComponent;
  let fixture: ComponentFixture<MoodleLinkDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodleLinkDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodleLinkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
