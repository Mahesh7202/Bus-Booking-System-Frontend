import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuspathDetailsComponent } from './buspath-details.component';

describe('BuspathDetailsComponent', () => {
  let component: BuspathDetailsComponent;
  let fixture: ComponentFixture<BuspathDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuspathDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuspathDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
