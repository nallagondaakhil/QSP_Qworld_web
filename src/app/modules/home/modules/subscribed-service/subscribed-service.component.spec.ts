import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedServiceComponent } from './subscribed-service.component';

describe('SubscribedServiceComponent', () => {
  let component: SubscribedServiceComponent;
  let fixture: ComponentFixture<SubscribedServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribedServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribedServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
