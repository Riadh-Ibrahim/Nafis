import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFilterComponent } from './patient-filter.component';

describe('PatientFilterComponent', () => {
  let component: PatientFilterComponent;
  let fixture: ComponentFixture<PatientFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
