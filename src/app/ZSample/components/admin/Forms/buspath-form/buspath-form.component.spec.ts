import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuspathFormComponent } from './buspath-form.component';

describe('BuspathFormComponent', () => {
  let component: BuspathFormComponent;
  let fixture: ComponentFixture<BuspathFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuspathFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuspathFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
