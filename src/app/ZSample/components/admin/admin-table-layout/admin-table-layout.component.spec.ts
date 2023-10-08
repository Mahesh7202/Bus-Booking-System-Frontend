import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTableLayoutComponent } from './admin-table-layout.component';

describe('AdminTableLayoutComponent', () => {
  let component: AdminTableLayoutComponent;
  let fixture: ComponentFixture<AdminTableLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTableLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTableLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
