import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addNotification, markAsRead } from '../store/notification/notification.actions';
import { alerte } from '../../interfaces/alerte';
@Injectable({
  providedIn: 'root', // Le service est disponible dans toute l'application
})
export class NotificationService {
  constructor(private store: Store) {}

  
  addAlerte(type: 'CRITIQUE' | 'ATTENTION' | 'INFO', message: string): void {
    const alerte: alerte = {
      id: Date.now(), // Génère un ID unique basé sur le timestamp
      type,
      message,
      timestamp: new Date().toISOString(), // Date et heure actuelles
      acquittee: false, // Par défaut, l'alerte n'est pas acquittée
    };
    this.store.dispatch(addNotification({ notification: alerte }));
  }

 
  acquitterAlerte(id: number, acquitteePar?: string): void {
    this.store.dispatch(markAsRead({ id, acquitteePar }));
  }
}