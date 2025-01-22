import { Test, TestingModule } from '@nestjs/testing';
import { PersonnelsController } from './personnels.controller';
import { PersonnelsService } from './personnels.service';

describe('PersonnelsController', () => {
  let controller: PersonnelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonnelsController],
      providers: [PersonnelsService],
    }).compile();

    controller = module.get<PersonnelsController>(PersonnelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
