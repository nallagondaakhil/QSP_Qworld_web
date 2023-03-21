import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiceManagementComponent } from './edit-service-management.component';

describe('EditServiceManagementComponent', () => {
  let component: EditServiceManagementComponent;
  let fixture: ComponentFixture<EditServiceManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditServiceManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditServiceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
