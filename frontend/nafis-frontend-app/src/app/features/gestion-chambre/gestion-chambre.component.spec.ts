import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionChambreComponent } from './gestion-chambre.component';

describe('GestionChambreComponent', () => {
  let component: GestionChambreComponent;
  let fixture: ComponentFixture<GestionChambreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionChambreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionChambreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
