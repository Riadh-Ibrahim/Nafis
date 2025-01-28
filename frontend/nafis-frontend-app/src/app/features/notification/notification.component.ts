import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { markAsRead } from '../../core/store/notification/notification.actions';
import { selectNotifications } from '../../core/store/notification/notification.selectors';
import { alerte } from '../../interfaces/alerte';
import { NotificationService } from '../../core/services/notification.service';
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  alertes$: Observable<alerte[]>; // Observable pour suivre les notifications

  constructor(
    private store: Store,
    private notificationService: NotificationService
  ) {
    // Sélectionner les notifications depuis le store NgRx
    this.alertes$ = this.store.select(selectNotifications);
  }

  ngOnInit(): void {
    // Exemple : Ajouter une notification de test au démarrage
    this.notificationService.addAlerte(
      'INFO',
      'Bienvenue dans le système de gestion hospitalière.'
    );
  }

  acquitterAlerte(id: number): void {
    this.notificationService.acquitterAlerte(id, 'Utilisateur');
  }
}
