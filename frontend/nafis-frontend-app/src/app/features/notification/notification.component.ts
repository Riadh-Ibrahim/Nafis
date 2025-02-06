import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../core/services/notification.service';
import { alerte } from '../../interfaces/alerte';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  alertes: alerte[] = []; // Liste des alertes

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    // Récupérer les alertes depuis le backend au chargement du composant
    this.notificationService.getAlertes().subscribe(
      (alertes) => {
        this.alertes = alertes;
      },
      (error) => {
        console.error('Erreur lors de la récupération des alertes', error);
      }
    );
  }

  // Acquitter une alerte
  acquitterAlerte(id: number): void {
    this.notificationService.acquitterAlerte(id, 'Utilisateur').subscribe(
      (updatedAlerte) => {
        // Mettre à jour la liste des alertes après acquittement
        const index = this.alertes.findIndex((a) => a.id === id);
        if (index !== -1) {
          this.alertes[index] = updatedAlerte;
        }
      },
      (error) => {
        console.error('Erreur lors de l\'acquittement de l\'alerte', error);
      }
    );
  }
}