import { Injectable, signal } from '@angular/core';
import { Patient } from '../../interfaces/patient';
import {
  Chambre,
  ChambreHistorique,
  ChambreLog,
} from '../../interfaces/chambre';

@Injectable({
  providedIn: 'root',
})
export class GestionChambreService {
  private rooms = signal<Chambre[]>([
    {
      numero: '101',
      type: 'SIMPLE',
      statut: 'LIBRE',
      patients: [],
    },
    {
      numero: '102',
      type: 'DOUBLE',
      statut: 'OCCUPE',
      patients: [
        {
          id: 1,
          lastname: 'Dupont',
          firstname: 'Jean',
          dateNaissance: '1980-01-01',
          numeroSecu: '180018001800100',
          adresse: '1 rue de Paris',
          telephone: '0123456789',
          email: 'jean.dupont@email.com',
        },
        {
          id: 2,
          lastname: 'Martin',
          firstname: 'Marie',
          dateNaissance: '1985-05-15',
          numeroSecu: '285058501850200',
          adresse: '2 rue de Lyon',
          telephone: '0987654321',
          email: 'marie.martin@email.com',
        },
      ],
    },
    {
      numero: '103',
      type: 'SOINS_INTENSIFS',
      statut: 'NETTOYAGE',
      patients: [],
    },
  ]);

  private history = signal<ChambreHistorique[]>([]);

  getRooms() {
    return this.rooms;
  }

  getHistory() {
    return this.history;
  }

  getRoomById(roomNumber: string): Chambre | undefined {
    return this.rooms()?.find((room) => room.numero === roomNumber);
  }

  updateRoomStatus(
    roomNumber: string,
    newStatus: 'LIBRE' | 'OCCUPE' | 'NETTOYAGE'
  ) {
    this.rooms.update((rooms) =>
      rooms.map((room) =>
        room.numero === roomNumber ? { ...room, statut: newStatus } : room
      )
    );

    this.addToHistory(roomNumber, {
      date: new Date().toISOString(),
      statut: newStatus,
      message: `Statut changé en ${newStatus}`,
    });
  }

  finishCleaning(roomNumber: string) {
    const room = this.getRoomById(roomNumber);
    if (room && room.statut === 'NETTOYAGE') {
      this.updateRoomStatus(roomNumber, 'LIBRE');
      this.addToHistory(roomNumber, {
        date: new Date().toISOString(),
        statut: 'LIBRE',
        message: 'Nettoyage terminé - Chambre disponible',
      });
    }
  }

  addPatientToRoom(roomNumber: string, patient: Patient) {
    const room = this.getRoomById(roomNumber);
    if (!room) return;

    if (room.type === 'SIMPLE' && room.patients.length >= 1) return;
    if (
      (room.type === 'DOUBLE' || room.type === 'SOINS_INTENSIFS') &&
      room.patients.length >= 2
    )
      return;
    if (room.statut === 'NETTOYAGE') return;

    this.rooms.update((rooms) =>
      rooms.map((room) =>
        room.numero === roomNumber
          ? {
              ...room,
              patients: [...room.patients, patient],
              statut: 'OCCUPE',
            }
          : room
      )
    );

    this.addToHistory(roomNumber, {
      date: new Date().toISOString(),
      statut: 'OCCUPE',
      message: `Patient ${patient.lastname} ${patient.firstname} ajouté à la chambre`,
      patient: {
        id: patient.id,
        action: 'ADDED',
        nom: patient.lastname,
        prenom: patient.firstname,
      },
    });
  }

  removePatientFromRoom(roomNumber: string, patientId: number) {
    const room = this.getRoomById(roomNumber);
    if (!room) return;

    const patient = room.patients.find((p: Patient) => p.id === patientId);
    if (!patient) return;

    this.rooms.update((rooms) =>
      rooms.map((room) => {
        if (room.numero === roomNumber) {
          const updatedPatients = room.patients.filter(
            (p: Patient) => p.id !== patientId
          );
          return {
            ...room,
            patients: updatedPatients,
            statut: updatedPatients.length === 0 ? 'LIBRE' : room.statut,
          };
        }
        return room;
      })
    );

    this.addToHistory(roomNumber, {
      date: new Date().toISOString(),
      statut: room.patients.length === 1 ? 'LIBRE' : 'OCCUPE',
      message: `Patient ${patient.lastname} ${patient.firstname} retiré de la chambre`,
      patient: {
        id: patient.id,
        action: 'REMOVED',
        nom: patient.lastname,
        prenom: patient.firstname,
      },
    });
  }

  private addToHistory(roomNumber: string, log: ChambreLog) {
    this.history.update((history) => {
      const existingHistory = history.find((h) => h.chambreId === roomNumber);
      if (existingHistory) {
        return history.map((h) =>
          h.chambreId === roomNumber
            ? { ...h, historique: [...h.historique, log] }
            : h
        );
      }
      return [...history, { chambreId: roomNumber, historique: [log] }];
    });
  }
}
