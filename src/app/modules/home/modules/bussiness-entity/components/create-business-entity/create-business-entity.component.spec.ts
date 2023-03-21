import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBusinessEntityComponent } from './create-business-entity.component';

describe('CreateBusinessEntityComponent', () => {
  let component: CreateBusinessEntityComponent;
  let fixture: ComponentFixture<CreateBusinessEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBusinessEntityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBusinessEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
