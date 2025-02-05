import { Patient } from "./patient";

export interface Chambre {
  numero: string;
  type: 'SIMPLE' | 'DOUBLE' | 'SOINS_INTENSIFS';
  statut: 'LIBRE' | 'OCCUPE' | 'NETTOYAGE';
  patients: Patient[];
}

export interface ChambreLog {
  date: string;
  statut: 'LIBRE' | 'OCCUPE' | 'NETTOYAGE';
  message: string;
  patient?: {
    id: number;
    action: 'ADDED' | 'REMOVED';
    nom: string;
    prenom: string;
  };
}

export interface ChambreHistorique {
  chambreId: string;
  historique: ChambreLog[];
}