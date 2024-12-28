export interface Personnel {
  id: number;
  nom: string;
  prenom: string;
  fonction: string;
  service: string;
  email: string;
  statut: 'PRESENT' | 'ABSENT' | 'CONGE' | 'MISSION';
}

export interface StatistiquesPresence {
  personnelId: number;
  joursPresent: number;
  joursAbsent: number;
  joursConge: number;
  joursMission: number;
  tauxPresence: number;
}

