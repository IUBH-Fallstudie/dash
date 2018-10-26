import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicStatsComponent } from './basic-stats.component';

describe('BasicStatsComponent', () => {
  let component: BasicStatsComponent;
  let fixture: ComponentFixture<BasicStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
