import { Test, TestingModule } from '@nestjs/testing';
import { RendezVousController } from './rendez-vous.controller';
import { RendezVousService } from './rendez-vous.service';

describe('RendezVousController', () => {
  let controller: RendezVousController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RendezVousController],
      providers: [RendezVousService],
    }).compile();

    controller = module.get<RendezVousController>(RendezVousController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
