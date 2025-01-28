import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConstantesVitalesService } from './constantes-vitales.service';
import { CreateConstantesVitalesDto } from './dto/create-constantes-vitale.dto';
import { UpdateConstantesVitaleDto } from './dto/update-constantes-vitale.dto';

@Controller('constantes-vitales')
export class ConstantesVitalesController {
  constructor(private readonly constantesVitalesService: ConstantesVitalesService) {}

  @Post()
async create(@Body() createConstantesVitaleDto: CreateConstantesVitalesDto) {
  // Create and save the constantes vitales
  const savedConstantes = await this.constantesVitalesService.create(createConstantesVitaleDto);

  // Analyze the constantes and detect any anomalies
  const anomalies = await this.constantesVitalesService.analyzeConstantes(savedConstantes.patientId);

  // Return both the saved constantes and any anomalies found
  return {
    savedConstantes,
    anomalies,
  };
}


  @Get()
  findAll() {
    return this.constantesVitalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.constantesVitalesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConstantesVitaleDto: UpdateConstantesVitaleDto) {
    return this.constantesVitalesService.update(+id, updateConstantesVitaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.constantesVitalesService.remove(+id);
  }
  @Get('surveillance/constantes/:patientId')
  async findLatestConstantes(
    @Param('patientId') patientId: string
  ): Promise<CreateConstantesVitalesDto> {
    return this.constantesVitalesService.findLatestByPatient(+patientId);
  }
  @Get('surveillance/analyze/:patientId')
async analyzeConstantes(@Param('patientId') patientId: string): Promise<string[]> {
  return this.constantesVitalesService.analyzeConstantes(+patientId);
}

}
