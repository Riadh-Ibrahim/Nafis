import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chambre, ChambreLog } from '../../interfaces/chambre';
import { GestionChambreService } from "../../core/services/gestion-chambre.service";

@Component({
  selector: 'app-gestion-chambre',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-chambre.component.html',
  styleUrls: ['./gestion-chambre.component.scss']
})
export class GestionChambreComponent {
  private roomService = inject(GestionChambreService);
  
  rooms = this.roomService.getRooms();
  selectedRoom = signal<Chambre | null>(null);

  selectRoom(room: Chambre) {
    this.selectedRoom.set(room);
  }

  getRoomTypeLabel(type: 'SIMPLE' | 'DOUBLE' | 'SOINS_INTENSIFS'): string {
    switch (type) {
      case 'SIMPLE': return 'Simple';
      case 'DOUBLE': return 'Double';
      case 'SOINS_INTENSIFS': return 'Soins Intensifs';
      default: return type;
    }
  }

  getRoomCapacity(type: 'SIMPLE' | 'DOUBLE' | 'SOINS_INTENSIFS'): number {
    switch (type) {
      case 'SIMPLE': return 1;
      case 'DOUBLE': return 2;
      case 'SOINS_INTENSIFS': return 2;
      default: return 1;
    }
  }

  formatSecu(numeroSecu: string): string {
    return numeroSecu.replace(/(\d{1})(\d{2})(\d{2})(\d{2})(\d{3})(\d{3})(\d{2})/, '$1 $2 $3 $4 $5 $6 $7');
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  updateStatus(status: 'LIBRE' | 'OCCUPE' | 'NETTOYAGE') {
    if (this.selectedRoom()) {
      this.roomService.updateRoomStatus(this.selectedRoom()!.numero, status);
      this.selectedRoom.update(room => room ? { ...room, statut: status } : null);
    }
  }

  finishCleaning() {
    if (this.selectedRoom()) {
      this.roomService.finishCleaning(this.selectedRoom()!.numero);
    }
  }

  getRoomHistory(): ChambreLog[] {
    const history = this.roomService.getHistory()();
    return history
      .find(h => h.chambreId === this.selectedRoom()?.numero)
      ?.historique || [];
  }

  canAddPatient(): boolean {
    const room = this.selectedRoom();
    if (!room) return false;
    if (room.statut === 'NETTOYAGE') return false;
    return room.patients.length < this.getRoomCapacity(room.type);
  }

  removePatient(patientId: number) {
    if (this.selectedRoom()) {
      this.roomService.removePatientFromRoom(this.selectedRoom()!.numero, patientId);
    }
  }

  openAddPatientDialog() {
    console.log('Opening add patient dialog...');
  }

  getStatusColor(status: 'LIBRE' | 'OCCUPE' | 'NETTOYAGE'): string {
    switch (status) {
      case 'LIBRE':
        return 'bg-green-100 text-green-800';
      case 'OCCUPE':
        return 'bg-red-100 text-red-800';
      case 'NETTOYAGE':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  trackByNumero(_: number, room: Chambre) {
    return room.numero;
  }

  trackByDate(_: number, log: ChambreLog) {
    return log.date;
  }
}