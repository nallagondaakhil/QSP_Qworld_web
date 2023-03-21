import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductManagementComponent } from './view-product-management.component';

describe('ViewProductManagementComponent', () => {
  let component: ViewProductManagementComponent;
  let fixture: ComponentFixture<ViewProductManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProductManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
