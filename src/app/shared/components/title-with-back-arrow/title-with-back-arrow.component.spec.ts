import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleWithBackArrowComponent } from './title-with-back-arrow.component';

describe('TitleWithBackArrowComponent', () => {
  let component: TitleWithBackArrowComponent;
  let fixture: ComponentFixture<TitleWithBackArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleWithBackArrowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleWithBackArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
