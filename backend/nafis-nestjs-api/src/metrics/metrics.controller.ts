import { Controller, Get } from '@nestjs/common';
import { VitalsMetricsService } from './vital-metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private vitalsMetricsService: VitalsMetricsService) {}

  @Get()
  async getMetrics() {
    return this.vitalsMetricsService.getMetrics();
  }
}