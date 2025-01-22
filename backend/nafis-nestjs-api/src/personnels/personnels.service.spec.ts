import { Test, TestingModule } from '@nestjs/testing';
import { PersonnelsService } from './personnels.service';

describe('PersonnelsService', () => {
  let service: PersonnelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonnelsService],
    }).compile();

    service = module.get<PersonnelsService>(PersonnelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
