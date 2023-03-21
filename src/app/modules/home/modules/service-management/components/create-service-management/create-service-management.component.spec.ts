import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceManagementComponent } from './create-service-management.component';

describe('CreateServiceManagementComponent', () => {
  let component: CreateServiceManagementComponent;
  let fixture: ComponentFixture<CreateServiceManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateServiceManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateServiceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
