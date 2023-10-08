import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowerSeatComponent } from './lower-seat.component';

describe('LowerSeatComponent', () => {
  let component: LowerSeatComponent;
  let fixture: ComponentFixture<LowerSeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LowerSeatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LowerSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
