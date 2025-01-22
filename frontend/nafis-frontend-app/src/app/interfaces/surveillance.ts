export interface ConstantesVitales {
  patientId: number;
  timestamp: string;
  temperature: number;
  tensionArterielle: string;
  frequenceCardiaque: number;
  saturationOxygene: number;
  alertes?: Alerte[];

}

export interface Alerte {
  id: number;
  type: 'CRITIQUE' | 'ATTENTION' | 'INFO';
  message: string;
  timestamp: string;
  acquittee: boolean;
  acquitteePar?: string;
}
