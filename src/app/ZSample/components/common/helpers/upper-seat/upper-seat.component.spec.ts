import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpperSeatComponent } from './upper-seat.component';

describe('UpperSeatComponent', () => {
  let component: UpperSeatComponent;
  let fixture: ComponentFixture<UpperSeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpperSeatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpperSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
