import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBusinessEntityComponent } from './edit-business-entity.component';

describe('EditBusinessEntityComponent', () => {
  let component: EditBusinessEntityComponent;
  let fixture: ComponentFixture<EditBusinessEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBusinessEntityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBusinessEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
