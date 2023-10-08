import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseraccountFormComponent } from './useraccount-form.component';

describe('UseraccountFormComponent', () => {
  let component: UseraccountFormComponent;
  let fixture: ComponentFixture<UseraccountFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseraccountFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseraccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
