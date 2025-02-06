import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientProfilComponent } from './patient-profil.component';

describe('PatientProfilComponent', () => {
  let component: PatientProfilComponent;
  let fixture: ComponentFixture<PatientProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientProfilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
