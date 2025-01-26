import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConstantesVitalesDto } from './dto/create-constantes-vitale.dto';
import { UpdateConstantesVitaleDto } from './dto/update-constantes-vitale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConstantesVitales } from './entities/constantes-vitale.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ConstantesVitalesService {
  constructor(
    @InjectRepository(ConstantesVitales)
    private readonly constantesVitalesRepository: Repository<ConstantesVitales>){}
  
  async create(createConstantesVitaleDto: CreateConstantesVitalesDto) {
   const covi=this.constantesVitalesRepository.create(createConstantesVitaleDto);
   return await this.constantesVitalesRepository.save(covi);
  }

  async findAll() {
    return await this.constantesVitalesRepository.find();
  }

  async findOne(id: number) {
    return await this.constantesVitalesRepository.findOne({where: {id}});
  }

  async update(id: number, updateConstantesVitaleDto: UpdateConstantesVitaleDto) {
    const covi=await this.findOne(id);
    if(!covi){
      throw new NotFoundException();
    }
    Object.assign(covi,updateConstantesVitaleDto);
    return await this.constantesVitalesRepository.save(covi);
  }

  async remove(id: number) {
    const covi=await this.findOne(id);
    if(!covi){
      throw new NotFoundException();
    }
    return await this.constantesVitalesRepository.remove(covi);
  }
  async findLatestByPatient(patientId: number): Promise<CreateConstantesVitalesDto> {
    const constantes = await this.constantesVitalesRepository.findOne({
      where: { patientId },
      order: { timestamp: 'DESC' }, 
    });

    if (!constantes) {
      throw new NotFoundException(`Constantes vitales not found for patient with id ${patientId}`);
    }

    return {
      patientId: constantes.patientId,
      timestamp: constantes.timestamp,
      temperature: constantes.temperature,
      tensionArterielle: constantes.tensionArterielle,
      frequenceCardiaque: constantes.frequenceCardiaque,
      saturationOxygene: constantes.saturationOxygene,
    };
  }
  async analyzeConstantes(patientId: number): Promise<string[]> {
    const constantes = await this.findLatestByPatient(patientId);
    const anomalies: string[] = [];
  
 
    const THRESHOLDS = {
      temperature: { min: 36, max: 37.5 }, // °C
      tensionArterielle: { systolicMax: 120, diastolicMax: 80 }, // mmHg
      frequenceCardiaque: { min: 60, max: 100 }, // bpm
      saturationOxygene: { min: 95 }, // %
    };
  
   
    if (
      constantes.temperature < THRESHOLDS.temperature.min ||
      constantes.temperature > THRESHOLDS.temperature.max
    ) {
      anomalies.push(`Température anormale : ${constantes.temperature}°C`);
    }
  
   
    const [systolic, diastolic] = constantes.tensionArterielle.split('/').map(Number);
    if (
      systolic > THRESHOLDS.tensionArterielle.systolicMax ||
      diastolic > THRESHOLDS.tensionArterielle.diastolicMax
    ) {
      anomalies.push(`Tension artérielle élevée : ${constantes.tensionArterielle}`);
    }
  
    
    if (
      constantes.frequenceCardiaque < THRESHOLDS.frequenceCardiaque.min ||
      constantes.frequenceCardiaque > THRESHOLDS.frequenceCardiaque.max
    ) {
      anomalies.push(`Fréquence cardiaque anormale : ${constantes.frequenceCardiaque} bpm`);
    }
  
    
    if (constantes.saturationOxygene < THRESHOLDS.saturationOxygene.min) {
      anomalies.push(`Saturation en oxygène faible : ${constantes.saturationOxygene}%`);
    }
  
    return anomalies;
  }
  

}
