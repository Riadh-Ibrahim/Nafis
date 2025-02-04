import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationByMonthComponent } from './consultation-by-month.component';

describe('ConsultationByMonthComponent', () => {
  let component: ConsultationByMonthComponent;
  let fixture: ComponentFixture<ConsultationByMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationByMonthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultationByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
