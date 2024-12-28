export interface Patient {
  id?: number;
  nom: string;
  prenom: string;
  dateNaissance: Date;
  numeroSecu: string;
  adresse: string;
  telephone: string;
  email?: string;
  photoUrl?: string;
}

