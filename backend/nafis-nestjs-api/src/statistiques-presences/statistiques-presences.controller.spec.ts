import { Test, TestingModule } from '@nestjs/testing';
import { StatistiquesPresencesController } from './statistiques-presences.controller';
import { StatistiquesPresencesService } from './statistiques-presences.service';

describe('StatistiquesPresencesController', () => {
  let controller: StatistiquesPresencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatistiquesPresencesController],
      providers: [StatistiquesPresencesService],
    }).compile();

    controller = module.get<StatistiquesPresencesController>(StatistiquesPresencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
