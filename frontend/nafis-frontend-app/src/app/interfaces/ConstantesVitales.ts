import { alerte } from "./alerte";

export interface ConstantesVitales {
  patientId: number;
  timestamp: string;
  temperature: number;
  tensionArterielle: string;
  frequenceCardiaque: number;
  saturationOxygene: number;
  alertes?: alerte[]

}

