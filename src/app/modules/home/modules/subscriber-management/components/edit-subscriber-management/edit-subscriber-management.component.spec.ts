import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubscriberManagementComponent } from './edit-subscriber-management.component';

describe('EditSubscriberManagementComponent', () => {
  let component: EditSubscriberManagementComponent;
  let fixture: ComponentFixture<EditSubscriberManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSubscriberManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubscriberManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
