import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConstantesVitalesService } from './constantes-vitales.service';
import { CreateConstantesVitalesDto } from './dto/create-constantes-vitale.dto';
import { UpdateConstantesVitaleDto } from './dto/update-constantes-vitale.dto';

@Controller('constantes-vitales')
export class ConstantesVitalesController {
  constructor(private readonly constantesVitalesService: ConstantesVitalesService) {}

  @Post()
  create(@Body() createConstantesVitaleDto: CreateConstantesVitalesDto) {
    return this.constantesVitalesService.create(createConstantesVitaleDto);
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
