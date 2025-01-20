export interface Chambre {
  numero: string;
  type: 'SIMPLE' | 'DOUBLE' | 'SOINS_INTENSIFS';
  statut: 'LIBRE' | 'OCCUPE' | 'NETTOYAGE';
  patientIds?: number[];
}

interface ChambreHistorique {
  chambreId: string;
  historique: ChambreLog[];
}

interface ChambreLog {
  date: string;
  statut: 'LIBRE' | 'OCCUPE' | 'NETTOYAGE';
  patientId?: number;
  message: string;
}
