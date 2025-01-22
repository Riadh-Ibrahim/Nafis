import { Test, TestingModule } from '@nestjs/testing';
import { ChambresService } from './chambres.service';

describe('ChambresService', () => {
  let service: ChambresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChambresService],
    }).compile();

    service = module.get<ChambresService>(ChambresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
