import { Test, TestingModule } from '@nestjs/testing';
import { ConstantesVitalesService } from './constantes-vitales.service';

describe('ConstantesVitalesService', () => {
  let service: ConstantesVitalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConstantesVitalesService],
    }).compile();

    service = module.get<ConstantesVitalesService>(ConstantesVitalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
