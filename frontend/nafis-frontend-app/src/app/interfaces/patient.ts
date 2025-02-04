export interface Patient {
  id: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  numeroSecu: string;
  adresse: string;
  telephone: string;
  email?: string;
  photoUrl?: string;
  status?: 'present' | 'absent';
}
