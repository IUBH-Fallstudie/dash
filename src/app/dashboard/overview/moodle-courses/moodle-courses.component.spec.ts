import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodleCoursesComponent } from './moodle-courses.component';

describe('MoodleCoursesComponent', () => {
  let component: MoodleCoursesComponent;
  let fixture: ComponentFixture<MoodleCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodleCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodleCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
