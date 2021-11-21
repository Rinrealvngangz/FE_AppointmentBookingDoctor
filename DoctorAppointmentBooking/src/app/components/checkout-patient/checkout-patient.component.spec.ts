import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutPatientComponent } from './checkout-patient.component';

describe('CheckoutPatientComponent', () => {
  let component: CheckoutPatientComponent;
  let fixture: ComponentFixture<CheckoutPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
