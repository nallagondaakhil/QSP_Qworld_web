import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductBillingComponent } from './view-product-billing.component';

describe('ViewProductBillingComponent', () => {
  let component: ViewProductBillingComponent;
  let fixture: ComponentFixture<ViewProductBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProductBillingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
