import { Test, TestingModule } from '@nestjs/testing';
import { ConstantesVitalesController } from './constantes-vitales.controller';
import { ConstantesVitalesService } from './constantes-vitales.service';

describe('ConstantesVitalesController', () => {
  let controller: ConstantesVitalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConstantesVitalesController],
      providers: [ConstantesVitalesService],
    }).compile();

    controller = module.get<ConstantesVitalesController>(ConstantesVitalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
