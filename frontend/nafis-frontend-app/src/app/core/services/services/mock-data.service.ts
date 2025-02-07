import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  AdminStats,
  Personnel,
  StatistiquesPresence,
} from '../../../interfaces/personnel';
import { Patient } from '../../../interfaces/patient';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  // Existing mock data
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

  // New mock data for personnel
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

  // Existing methods
  getPatientStats(patientId: string): Observable<any> {
    const patientData =
      this.patientsMockData[patientId] || this.patientsMockData['1'];
    return of(patientData).pipe(delay(500));
  }

  getMedicalStats(doctorId: string): Observable<any> {
    const doctorData =
      this.doctorsMockData[doctorId] || this.doctorsMockData['1'];
    return of(doctorData).pipe(delay(500));
  }

  // New methods for personnel data
  getPersonnel(id: number): Observable<Personnel> {
    const personnel =
      this.personnelMockData.find((p) => p.id === id) ||
      this.personnelMockData[0];
    return of(personnel).pipe(delay(500));
  }

  getAllPersonnel(): Observable<Personnel[]> {
    return of(this.personnelMockData).pipe(delay(500));
  }

  getStatistiquesPresence(
    personnelId: number
  ): Observable<StatistiquesPresence> {
    const stats =
      this.statistiquesPresenceMockData[personnelId] ||
      this.statistiquesPresenceMockData[1];
    return of(stats).pipe(delay(500));
  }

  getAdminStats(): Observable<AdminStats> {
    return of(this.adminStatsMockData).pipe(delay(500));
  }

  // Method to get patients
  getPatient(id: number): Observable<Patient> {
    const patients: { [key: number]: Patient } = {
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
      3: {
        id: 3,
        lastname: 'Leroy',
        firstname: 'Jean',
        dateNaissance: '1975-03-10',
        numeroSecu: '175035678912345',
        adresse: '789 rue de la République, 69002 Lyon',
        telephone: '0612345678',
        email: 'jean.leroy@email.com',
      },
    };
    const patient = patients[id] || patients[1];
    return of(patient).pipe(delay(500));
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
