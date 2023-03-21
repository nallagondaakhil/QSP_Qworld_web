import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductManagementComponent } from './edit-product-management.component';

describe('EditProductManagementComponent', () => {
  let component: EditProductManagementComponent;
  let fixture: ComponentFixture<EditProductManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
