export interface ConstantesVitales {
  patientId: number;
  timestamp: Date;
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
  timestamp: Date;
  acquittee: boolean;
  acquitteePar?: string;
}
