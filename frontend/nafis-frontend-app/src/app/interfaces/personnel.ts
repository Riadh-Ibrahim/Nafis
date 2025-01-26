export type PersonnelType =
  | 'MEDECIN'
  | 'INFIRMIER'
  | 'AIDE_SOIGNANT'
  | 'ADMINISTRATIF'
  | 'TECHNICIEN';

export type PersonnelCategorie =
  | 'TITULAIRE'
  | 'CONTRACTUEL'
  | 'VACATAIRE'
  | 'STAGIAIRE'
  | 'RESIDENT';

export type PersonnelSpecialite =
  | 'CARDIOLOGIE'
  | 'PEDIATRIE'
  | 'NEUROLOGIE'
  | 'URGENCES'
  | 'CHIRURGIE'
  | 'RADIOLOGIE'
  | 'PSYCHIATRIE'
  | 'GENERALISTE'
  | 'AUTRE';

export interface Personnel {
  id: number;
  nom: string;
  prenom: string;
  type: PersonnelType;
  categorie: PersonnelCategorie;
  specialite?: PersonnelSpecialite;
  service: string;
  email: string;
  telephone: string;
  matricule: string;
  dateRecrutement: Date;
  statut: 'PRESENT' | 'ABSENT' | 'CONGE' | 'MISSION';
}

export interface StatistiquesPresence {
  personnelId: number;
  periode: {
    debut: string;
    fin: string;
  };
  statistiques: {
    joursPresent: number;
    joursAbsent: number;
    joursConge: number;
    joursMission: number;
    tauxPresence: number;
  };
  details: {
    conges: CongeDetail[];
    absences: AbsenceDetail[];
    missions: MissionDetail[];
  };
}

interface CongeDetail {
  debut: string;
  fin: string;
  type: 'ANNUEL' | 'MALADIE' | 'FORMATION' | 'AUTRE';
  motif?: string;
}

interface AbsenceDetail {
  date: string;
  justifie: boolean;
  motif?: string;
}

interface MissionDetail {
  debut: string;
  fin: string;
  description: string;
  lieu: string;
}

export interface PersonnelStats {
  total: number;
  parType: Record<PersonnelType, number>;
  parCategorie: Record<PersonnelCategorie, number>;
  parSpecialite: Record<PersonnelSpecialite, number>;
  presentAujourdhui: number;
  enConge: number;
  enMission: number;
  absents: number;
}

// Updated AdminStats in DashboardStats
export interface AdminStats {
  totalPatients: number;
  personnel: PersonnelStats;
  occupiedRooms: number;
  alertesNonAcquittees: number;
}
