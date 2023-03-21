import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubscribedServiceComponent } from './edit-subscribed-service.component';

describe('EditSubscribedServiceComponent', () => {
  let component: EditSubscribedServiceComponent;
  let fixture: ComponentFixture<EditSubscribedServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSubscribedServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubscribedServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
