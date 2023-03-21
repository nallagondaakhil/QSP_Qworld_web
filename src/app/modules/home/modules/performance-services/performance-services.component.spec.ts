import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceServicesComponent } from './performance-services.component';

describe('PerformanceServicesComponent', () => {
  let component: PerformanceServicesComponent;
  let fixture: ComponentFixture<PerformanceServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
