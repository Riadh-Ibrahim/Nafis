import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  AdminStats,
  Personnel,
  StatistiquesPresence,
} from '../../interfaces/personnel';
import { Patient } from '../../interfaces/patient';
import { Rendezvous } from '../../interfaces/rendezvous';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  private patientsMockData: { [key: string]: any } = {
    '1': {
      upcomingAppointments: 3,
      medications: [
        { name: 'Paracétamol', dosage: '500mg', frequency: '2 fois par jour' },
        { name: 'Ibuprofène', dosage: '200mg', frequency: '3 fois par jour' },
      ],
      healthAlerts: 2,
      latestVitals: {
        temperature: '37.2°C',
        bloodPressure: '12/8',
        heartRate: '75 bpm',
      },
    },
    '2': {
      upcomingAppointments: 1,
      medications: [
        { name: 'Aspirine', dosage: '100mg', frequency: '1 fois par jour' },
      ],
      healthAlerts: 1,
      latestVitals: {
        temperature: '36.8°C',
        bloodPressure: '11/7',
        heartRate: '68 bpm',
      },
    },
  };

  private doctorsMockData: { [key: string]: any } = {
    '1': {
      todayPatients: 25,
      vitalSignsAlerts: 8,
      consultations: 15,
      appointments: 12,
      dernieresConstantes: [
        { patient: 'Martin Durant', type: 'Température', valeur: '38.5°C' },
        { patient: 'Sophie Dubois', type: 'Tension', valeur: '12/8' },
      ],
    },
    '2': {
      todayPatients: 18,
      vitalSignsAlerts: 5,
      consultations: 10,
      appointments: 8,
      dernieresConstantes: [
        { patient: 'Jean Martin', type: 'Température', valeur: '37.5°C' },
        { patient: 'Marie Dupont', type: 'Tension', valeur: '11/7' },
      ],
    },
  };

  private personnelMockData: Personnel[] = [
    {
      id: 1,
      nom: 'Dubois',
      prenom: 'Pierre',
      type: 'MEDECIN',
      categorie: 'TITULAIRE',
      specialite: 'CARDIOLOGIE',
      service: 'Cardiologie',
      email: 'pierre.dubois@hopital.fr',
      telephone: '0123456789',
      matricule: 'MED001',
      dateRecrutement: new Date('2020-01-15'),
      statut: 'PRESENT',
    },
    {
      id: 2,
      nom: 'Martin',
      prenom: 'Sophie',
      type: 'INFIRMIER',
      categorie: 'CONTRACTUEL',
      service: 'Urgences',
      email: 'sophie.martin@hopital.fr',
      telephone: '0123456790',
      matricule: 'INF001',
      dateRecrutement: new Date('2021-03-20'),
      statut: 'CONGE',
    },
  ];

  private patients: { [key: number]: Patient } = {
    1: {
      id: 1,
      lastname: 'Durant',
      firstname: 'Martin',
      dateNaissance: '1980-05-15',
      numeroSecu: '180055789456123',
      adresse: '123 rue de la Santé, 75014 Paris',
      telephone: '0687654321',
      email: 'martin.durant@email.com',
    },
    2: {
      id: 2,
      lastname: 'Dupont',
      firstname: 'Sophie',
      dateNaissance: '1990-08-25',
      numeroSecu: '190085678912345',
      adresse: '456 avenue de la Liberté, 75010 Paris',
      telephone: '0786543210',
      email: 'sophie.dupont@email.com',
    },
  };

  // Added missing mock data
  private statistiquesPresenceMockData: {
    [key: number]: StatistiquesPresence;
  } = {
    1: {
      personnelId: 1,
      periode: {
        debut: '2025-01-01',
        fin: '2025-01-21',
      },
      statistiques: {
        joursPresent: 15,
        joursAbsent: 2,
        joursConge: 3,
        joursMission: 1,
        tauxPresence: 85.7,
      },
      details: {
        conges: [
          {
            debut: '2025-01-10',
            fin: '2025-01-12',
            type: 'ANNUEL',
          },
        ],
        absences: [
          {
            date: '2025-01-15',
            justifie: true,
            motif: 'Maladie',
          },
        ],
        missions: [
          {
            debut: '2025-01-20',
            fin: '2025-01-20',
            description: 'Conférence médicale',
            lieu: 'Paris',
          },
        ],
      },
    },
    2: {
      personnelId: 2,
      periode: {
        debut: '2025-01-01',
        fin: '2025-01-21',
      },
      statistiques: {
        joursPresent: 12,
        joursAbsent: 3,
        joursConge: 5,
        joursMission: 1,
        tauxPresence: 75.0,
      },
      details: {
        conges: [
          {
            debut: '2025-01-05',
            fin: '2025-01-09',
            type: 'ANNUEL',
          },
        ],
        absences: [
          {
            date: '2025-01-15',
            justifie: true,
            motif: 'Formation',
          },
        ],
        missions: [
          {
            debut: '2025-01-20',
            fin: '2025-01-20',
            description: 'Formation externe',
            lieu: 'Lyon',
          },
        ],
      },
    },
  };

  private adminStatsMockData: AdminStats = {
    totalPatients: 1500,
    personnel: {
      total: 250,
      parType: {
        MEDECIN: 50,
        INFIRMIER: 100,
        AIDE_SOIGNANT: 60,
        ADMINISTRATIF: 30,
        TECHNICIEN: 10,
      },
      parCategorie: {
        TITULAIRE: 150,
        CONTRACTUEL: 50,
        VACATAIRE: 20,
        STAGIAIRE: 20,
        RESIDENT: 10,
      },
      parSpecialite: {
        CARDIOLOGIE: 10,
        PEDIATRIE: 8,
        NEUROLOGIE: 7,
        URGENCES: 15,
        CHIRURGIE: 12,
        RADIOLOGIE: 8,
        PSYCHIATRIE: 6,
        GENERALISTE: 15,
        AUTRE: 19,
      },
      presentAujourdhui: 200,
      enConge: 30,
      enMission: 10,
      absents: 10,
    },
    occupiedRooms: 180,
    alertesNonAcquittees: 15,
  };

  private rendezvousMockData: Rendezvous[] = [
    {
      id: 1,
      patientId: 1,
      medecinId: 1,
      date: '2025-02-01T10:00:00',
      duree: 30,
      motif: 'Consultation annuelle',
      statut: 'PLANIFIE',
      notes: 'Vérifier le traitement actuel',
      rappelEnvoye: false,
    },
    {
      id: 2,
      patientId: 2,
      medecinId: 1,
      date: '2025-02-01T11:00:00',
      duree: 20,
      motif: 'Douleur au dos',
      statut: 'CONFIRME',
      notes: 'Nécessite une IRM',
      rappelEnvoye: true,
    },
    {
      id: 3,
      patientId: 1,
      medecinId: 2,
      date: '2025-02-02T09:30:00',
      duree: 45,
      motif: 'Suivi post-opératoire',
      statut: 'ANNULE',
      notes: 'Annulé par le patient',
      rappelEnvoye: false,
    },
  ];

  getPatientStats(patientId: string): Observable<any> {
    if (!this.patientsMockData[patientId]) {
      return throwError(
        () => new Error(`Patient stats not found for ID: ${patientId}`)
      );
    }
    return of(this.patientsMockData[patientId]).pipe(delay(100));
  }

  getMedicalStats(doctorId: string): Observable<any> {
    if (!this.doctorsMockData[doctorId]) {
      return throwError(
        () => new Error(`Doctor stats not found for ID: ${doctorId}`)
      );
    }
    return of(this.doctorsMockData[doctorId]).pipe(delay(100));
  }

  getPersonnel(id: number): Observable<Personnel | null> {
    const personnel = this.personnelMockData.find((p) => p.id === id);
    if (!personnel) {
      return of(null).pipe(delay(100));
    }
    return of(personnel).pipe(delay(100));
  }

  getAllPersonnel(): Observable<Personnel[]> {
    return of(this.personnelMockData).pipe(delay(100));
  }

  getStatistiquesPresence(
    personnelId: number
  ): Observable<StatistiquesPresence | null> {
    const stats = this.statistiquesPresenceMockData[personnelId];
    if (!stats) {
      return of(null).pipe(delay(100));
    }
    return of(stats).pipe(delay(100));
  }

  getAdminStats(): Observable<AdminStats> {
    return of(this.adminStatsMockData).pipe(delay(100));
  }

  getPatient(id: number): Observable<Patient | null> {
    if (!this.patients[id]) {
      return of(null).pipe(delay(100));
    }
    return of(this.patients[id]).pipe(delay(100));
  }

  // Helper method
  private idExists(id: number | string, collection: any): boolean {
    return (
      collection.hasOwnProperty(id) ||
      (Array.isArray(collection) && collection.some((item) => item.id === id))
    );
  }

  getAllRendezvous(): Observable<Rendezvous[]> {
    console.log('Mock appointments:', this.rendezvousMockData);
    return of(this.rendezvousMockData).pipe(delay(100));
  }

  getRendezvousById(id: number): Observable<Rendezvous | null> {
    const rendezvous = this.rendezvousMockData.find((r) => r.id === id);
    return of(rendezvous || null).pipe(delay(100));
  }

  getPatientRendezvous(patientId: number): Observable<Rendezvous[]> {
    console.log('Getting patient appointments for ID:', patientId);
    const patientRendezvous = this.rendezvousMockData.filter(
      (r) => r.patientId === patientId
    );
    console.log('Found appointments:', patientRendezvous);
    return of(patientRendezvous).pipe(delay(100));
  }

  getDoctorRendezvous(medecinId: number): Observable<Rendezvous[]> {
    console.log('Getting doctor appointments for ID:', medecinId);
    const doctorRendezvous = this.rendezvousMockData.filter(
      (r) => r.medecinId === medecinId
    );
    console.log('Found appointments:', doctorRendezvous);
    return of(doctorRendezvous).pipe(delay(100));
  }

  getAllPatients(): Observable<Patient[]> {
    const patients: Patient[] = [
      {
        id: 1,
        lastname: 'Durant',
        firstname: 'Martin',
        dateNaissance: '1980-05-15',
        numeroSecu: '180055789456123',
        adresse: '123 rue de la Santé, 75014 Paris',
        telephone: '0687654321',
        email: 'martin.durant@email.com',
      },
      {
        id: 2,
        lastname: 'Dupont',
        firstname: 'Sophie',
        dateNaissance: '1990-08-25',
        numeroSecu: '190085678912345',
        adresse: '456 avenue de la Liberté, 75010 Paris',
        telephone: '0786543210',
        email: 'sophie.dupont@email.com',
      },
      // Ajoutez d'autres patients si nécessaire
      {
        id: 3,
        lastname: 'Leroy',
        firstname: 'Jean',
        dateNaissance: '1975-03-10',
        numeroSecu: '175035678912345',
        adresse: '789 rue de la République, 69002 Lyon',
        telephone: '0612345678',
        email: 'jean.leroy@email.com',
      },
    ];

    return of(patients).pipe(delay(500));
  }
}
