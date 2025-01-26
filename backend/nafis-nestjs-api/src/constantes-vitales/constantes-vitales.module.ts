import { Module } from '@nestjs/common';
import { ConstantesVitalesService } from './constantes-vitales.service';
import { ConstantesVitalesController } from './constantes-vitales.controller';

@Module({
  controllers: [ConstantesVitalesController],
  providers: [ConstantesVitalesService],
})
export class ConstantesVitalesModule {}
