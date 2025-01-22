import { Controller, Post, Param, ParseIntPipe } from '@nestjs/common';
import { IoTSimulatorService } from './iot-simulation.service';
@Controller('iot-simulator')
export class IoTSimulatorController {
  constructor(private readonly iotSimulatorService: IoTSimulatorService) {}

  @Post('simulate-abnormal/:patientId')
  async simulateAbnormalVitals(@Param('patientId', ParseIntPipe) patientId: number) {
    await this.iotSimulatorService.simulateAbnormalVitals(patientId);
    return { message: `Simulated abnormal vitals for patient ${patientId}` };
  }
}