import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterTableComponent } from './semester-table.component';

describe('SemesterTableComponent', () => {
  let component: SemesterTableComponent;
  let fixture: ComponentFixture<SemesterTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemesterTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
