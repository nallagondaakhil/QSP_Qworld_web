import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserManagementComponent } from './edit-user-management.component';

describe('EditUserManagementComponent', () => {
  let component: EditUserManagementComponent;
  let fixture: ComponentFixture<EditUserManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
