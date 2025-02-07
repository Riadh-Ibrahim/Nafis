export interface Patient {
  id: number;
  lastname: string;
  firstname: string;
  dateNaissance: string;
  numeroSecu: string;
  adresse: string;
  telephone: string;
  email: string;
  photoUrl?: string;
  status?: 'present' | 'absent';
}
