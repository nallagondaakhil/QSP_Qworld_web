import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessEntityComponent } from './bussiness-entity.component';

describe('BussinessEntityComponent', () => {
  let component: BussinessEntityComponent;
  let fixture: ComponentFixture<BussinessEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BussinessEntityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinessEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
