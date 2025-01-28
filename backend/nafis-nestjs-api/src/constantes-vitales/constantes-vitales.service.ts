import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConstantesVitalesDto } from './dto/create-constantes-vitale.dto';
import { UpdateConstantesVitaleDto } from './dto/update-constantes-vitale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConstantesVitales } from './entities/constantes-vitale.entity';
import { Repository } from 'typeorm';
import { VitalsMetricsService } from 'src/metrics/vitals-metrics.service';
import { Alerte, AlerteType } from 'src/alerte/entities/alerte.entity';
import { AlertesService } from 'src/alerte/alerte.service';
@Injectable()
export class ConstantesVitalesService {
  constructor(
    @InjectRepository(ConstantesVitales)
    private readonly constantesVitalesRepository: Repository<ConstantesVitales>,
    private readonly alerteService: AlertesService,  // Inject AlerteService
    
    private readonly vitalsMetricsService: VitalsMetricsService
  ){}
  
  async create(createConstantesVitaleDto: CreateConstantesVitalesDto) {
    const covi = this.constantesVitalesRepository.create(createConstantesVitaleDto);
    return await this.constantesVitalesRepository.save(covi); // returns the saved entity with the id
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
  async findLatestByPatient(patientId: number): Promise<ConstantesVitales> {
    const constantes = await this.constantesVitalesRepository.findOne({
      where: { patientId },
      order: { id: 'DESC' },
    });
  
    if (!constantes) {
      throw new Error('No constantes vitales found for this patient.');
    }
  
    return constantes; // This will return the full entity with the `id` and other fields
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
    //console.log(constantes);
    //console.log(39> THRESHOLDS.temperature.max);
    // Check for anomalies and create alerts
    if (
      constantes.temperature < THRESHOLDS.temperature.min ||
      constantes.temperature > THRESHOLDS.temperature.max
    ) {
      //console.log('Constantes:', constantes);
      //console.log("2");
      anomalies.push(`Température anormale : ${constantes.temperature}°C`);
      await this.alerteService.create({
        type: AlerteType.CRITIQUE, // Set the alert type based on the severity
        message: `Température anormale : ${constantes.temperature}°C`,
        timestamp: new Date(),
        constantesVitales: constantes, // Associate with the constantesVitales entity
      }
    );
    }
  
    const [systolic, diastolic] = constantes.tensionArterielle.split('/').map(Number);
    if (
      systolic > THRESHOLDS.tensionArterielle.systolicMax ||
      diastolic > THRESHOLDS.tensionArterielle.diastolicMax
    ) {
      anomalies.push(`Tension artérielle élevée : ${constantes.tensionArterielle}`);
      await this.alerteService.create({
        type: AlerteType.CRITIQUE, // Set the alert type based on the severity
        message: `Tension artérielle élevée : ${constantes.tensionArterielle}`,
        timestamp: new Date(),
        constantesVitales: constantes, // Associate with the constantesVitales entity
      });
    }
  
    if (
      constantes.frequenceCardiaque < THRESHOLDS.frequenceCardiaque.min ||
      constantes.frequenceCardiaque > THRESHOLDS.frequenceCardiaque.max
    ) {
      anomalies.push(`Fréquence cardiaque anormale : ${constantes.frequenceCardiaque} bpm`);
      await this.alerteService.create({
        type: AlerteType.ATTENTION, // Set the alert type based on the severity
        message: `Fréquence cardiaque anormale : ${constantes.frequenceCardiaque} bpm`,
        timestamp: new Date(),
        constantesVitales: constantes, // Associate with the constantesVitales entity
      });
    }
  
    if (constantes.saturationOxygene < THRESHOLDS.saturationOxygene.min) {
      anomalies.push(`Saturation en oxygène faible : ${constantes.saturationOxygene}%`);
      await this.alerteService.create({
        type: AlerteType.ATTENTION, // Set the alert type based on the severity
        message: `Saturation en oxygène faible : ${constantes.saturationOxygene}%`,
        timestamp: new Date(),
        constantesVitales: constantes, // Associate with the constantesVitales entity
      });
    }
  
    // Return anomalies and create records in VitalsMetricsService if necessary
    anomalies.forEach(anomaly => {
      this.vitalsMetricsService.recordAnomaly(patientId, anomaly);
    });
  
    return anomalies;
  }
  
  

}
