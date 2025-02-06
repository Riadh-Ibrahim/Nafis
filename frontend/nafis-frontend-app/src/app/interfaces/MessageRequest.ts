export interface MessageRequest {
  id: number;
  patientId: number;
  doctorId: number;
  statut: 'EN_ATTENTE' | 'ACCEPTE' | 'REFUSE';
  dateCreation: string;
}
