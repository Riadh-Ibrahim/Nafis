import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstantesFormulairesComponent } from './constantes-formulaires.component';

describe('ConstantesFormulairesComponent', () => {
  let component: ConstantesFormulairesComponent;
  let fixture: ComponentFixture<ConstantesFormulairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstantesFormulairesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConstantesFormulairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
