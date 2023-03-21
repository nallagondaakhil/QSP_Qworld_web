import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductServiceComponent } from './view-product-service.component';

describe('ViewProductServiceComponent', () => {
  let component: ViewProductServiceComponent;
  let fixture: ComponentFixture<ViewProductServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProductServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
