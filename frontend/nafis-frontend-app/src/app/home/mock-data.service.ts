import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private adminMockData = {
    totalPatients: 1547,
    personnel: {
      total: 245,
      parType: {
        MEDECIN: 45,
        INFIRMIER: 85,
        AIDE_SOIGNANT: 65,
        ADMINISTRATIF: 30,
        TECHNICIEN: 20
      },
      presentAujourdhui: 200,
      enConge: 20,
      enMission: 5,
      absents: 20
    },
    occupiedRooms: 85,
    alertesNonAcquittees: 12
  };

  private medicalMockData = {
    todayPatients: 25,
    vitalSignsAlerts: 8,
    consultations: 15,
    appointments: 12,
    dernieresConstantes: [
      { patient: "Martin Durant", type: "Température", valeur: "38.5°C" },
      { patient: "Sophie Dubois", type: "Tension", valeur: "12/8" }
    ]
  };

  private nurseMockData = {
    assignedPatients: 12,
    monitoringTasks: 24,
    activeAlerts: 5,
    roomVisits: 8,
    prochaineSurveillance: [
      { chambre: "204", patient: "Jean Martin", heure: "10:30" },
      { chambre: "208", patient: "Marie Durand", heure: "11:00" }
    ]
  };

  private patientMockData = {
    upcomingAppointments: 3,
    medications: [
      { name: "Paracétamol", dosage: "500mg", frequency: "2 fois par jour" },
      { name: "Ibuprofène", dosage: "200mg", frequency: "3 fois par jour" }
    ],
    healthAlerts: 2,
    latestVitals: {
      temperature: "37.2°C",
      bloodPressure: "12/8",
      heartRate: "75 bpm"
    }
  };

  getAdminStats(): Observable<any> {
    return of(this.adminMockData).pipe(delay(500));
  }

  getMedicalStats(): Observable<any> {
    return of(this.medicalMockData).pipe(delay(500));
  }

  getNurseStats(): Observable<any> {
    return of(this.nurseMockData).pipe(delay(500));
  }

  getPatientStats(): Observable<any> {
    return of(this.patientMockData).pipe(delay(500));
  }
}
