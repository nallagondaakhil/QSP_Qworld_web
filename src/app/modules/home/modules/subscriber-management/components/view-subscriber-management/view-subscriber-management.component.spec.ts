import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubscriberManagementComponent } from './view-subscriber-management.component';

describe('ViewSubscriberManagementComponent', () => {
  let component: ViewSubscriberManagementComponent;
  let fixture: ComponentFixture<ViewSubscriberManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubscriberManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubscriberManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
