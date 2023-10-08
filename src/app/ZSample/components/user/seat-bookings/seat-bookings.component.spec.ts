import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatBookingsComponent } from './seat-bookings.component';

describe('SeatBookingsComponent', () => {
  let component: SeatBookingsComponent;
  let fixture: ComponentFixture<SeatBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatBookingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
