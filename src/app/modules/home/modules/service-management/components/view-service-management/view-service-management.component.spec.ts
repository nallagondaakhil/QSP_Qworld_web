import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewServiceManagementComponent } from './view-service-management.component';

describe('ViewServiceManagementComponent', () => {
  let component: ViewServiceManagementComponent;
  let fixture: ComponentFixture<ViewServiceManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewServiceManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewServiceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
