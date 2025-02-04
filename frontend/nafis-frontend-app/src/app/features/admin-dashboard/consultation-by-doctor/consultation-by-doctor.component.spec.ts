import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationByDoctorComponent } from './consultation-by-doctor.component';

describe('ConsultationByDoctorComponent', () => {
  let component: ConsultationByDoctorComponent;
  let fixture: ComponentFixture<ConsultationByDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationByDoctorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultationByDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
