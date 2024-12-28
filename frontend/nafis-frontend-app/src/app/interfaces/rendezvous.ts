export interface Rendezvous {
  id: number;
  patientId: number;
  medecinId: number;
  date: Date;
  duree: number; // en minutes
  motif: string;
  statut: 'PLANIFIE' | 'CONFIRME' | 'ANNULE';
  notes?: string;
  rappelEnvoye?: boolean;
}
