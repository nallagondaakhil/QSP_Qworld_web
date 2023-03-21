import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBusinessEntityComponent } from './view-business-entity.component';

describe('ViewBusinessEntityComponent', () => {
  let component: ViewBusinessEntityComponent;
  let fixture: ComponentFixture<ViewBusinessEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBusinessEntityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBusinessEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
