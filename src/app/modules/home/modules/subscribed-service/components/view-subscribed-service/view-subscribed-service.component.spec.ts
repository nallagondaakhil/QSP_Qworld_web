import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubscribedServiceComponent } from './view-subscribed-service.component';

describe('ViewSubscribedServiceComponent', () => {
  let component: ViewSubscribedServiceComponent;
  let fixture: ComponentFixture<ViewSubscribedServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubscribedServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubscribedServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
