import { Test, TestingModule } from '@nestjs/testing';
import { StatistiquesPresencesService } from './statistiques-presences.service';

describe('StatistiquesPresencesService', () => {
  let service: StatistiquesPresencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatistiquesPresencesService],
    }).compile();

    service = module.get<StatistiquesPresencesService>(StatistiquesPresencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
