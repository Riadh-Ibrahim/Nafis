import { Module } from '@nestjs/common';
import { VitalsMetricsService } from './vital-metrics.service';
import { MetricsController } from './metrics.controller';
@Module({
  providers: [VitalsMetricsService],
  controllers: [MetricsController],
  exports: [VitalsMetricsService]
})
export class MetricsModule {}