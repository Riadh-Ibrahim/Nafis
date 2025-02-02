import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityCardComponent } from './speciality-card.component';

describe('SpecialityCardComponent', () => {
  let component: SpecialityCardComponent;
  let fixture: ComponentFixture<SpecialityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialityCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecialityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
