import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductManagementComponent } from './create-product-management.component';

describe('CreateProductManagementComponent', () => {
  let component: CreateProductManagementComponent;
  let fixture: ComponentFixture<CreateProductManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProductManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
