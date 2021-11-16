import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateScheduleTimingsComponent } from './update-schedule-timings.component';

describe('UpdateScheduleTimingsComponent', () => {
  let component: UpdateScheduleTimingsComponent;
  let fixture: ComponentFixture<UpdateScheduleTimingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateScheduleTimingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateScheduleTimingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
