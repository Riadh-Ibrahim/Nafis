import { User } from './user';

export interface Patient extends User {
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
