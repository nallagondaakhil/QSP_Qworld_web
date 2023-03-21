import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLogsServiceComponent } from './view-logs-service.component';

describe('ViewLogsServiceComponent', () => {
  let component: ViewLogsServiceComponent;
  let fixture: ComponentFixture<ViewLogsServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLogsServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLogsServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
