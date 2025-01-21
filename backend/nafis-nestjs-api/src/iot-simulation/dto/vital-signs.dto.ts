export interface VitalSignsDto {
    patientId: number;
    timestamp: Date;
    temperature: number;
    tensionArterielle: string;
    frequenceCardiaque: number;
    saturationOxygene: number;
  }