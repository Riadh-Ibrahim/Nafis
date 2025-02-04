import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationByCategoryComponent } from './consultation-by-category.component';

describe('ConsultationByCategoryComponent', () => {
  let component: ConsultationByCategoryComponent;
  let fixture: ComponentFixture<ConsultationByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationByCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultationByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
