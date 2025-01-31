import { Module } from '@nestjs/common';
import { ConstantesVitalesService } from './constantes-vitales.service';
import { ConstantesVitalesController } from './constantes-vitales.controller';
import { MetricsModule } from 'src/metrics/metrics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstantesVitales } from './entities/constantes-vitale.entity';
import { AlertesModule } from 'src/alerte/entities/alerte.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConstantesVitales]),
    MetricsModule,
    AlertesModule
  ],
  controllers: [ConstantesVitalesController],
  providers: [ConstantesVitalesService],
  exports: [ConstantesVitalesService]
})
export class ConstantesVitalesModule {}
