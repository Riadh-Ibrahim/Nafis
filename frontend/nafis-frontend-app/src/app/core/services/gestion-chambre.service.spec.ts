import { TestBed } from '@angular/core/testing';

import { GestionChambreService } from './gestion-chambre.service';

describe('GestionChambreService', () => {
  let service: GestionChambreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionChambreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
