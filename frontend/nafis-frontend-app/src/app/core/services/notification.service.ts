import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { alerte } from '../../interfaces/alerte';

@Injectable({
  providedIn: 'root', // Le service est disponible dans toute l'application
})
export class NotificationService {
  private apiUrl = 'http://localhost:3000/alertes'; // URL de votre backend

  constructor(private http: HttpClient) {}

  // Ajouter une alerte
  addAlerte(type: 'CRITIQUE' | 'ATTENTION' | 'INFO', message: string): Observable<alerte> {
    const alerte: alerte = {
      id: Date.now(), // Génère un ID unique basé sur le timestamp
      type,
      message,
      timestamp: new Date().toISOString(), // Date et heure actuelles
      acquittee: false, // Par défaut, l'alerte n'est pas acquittée
      acquitteePar: '', // Par défaut, vide
    };
    return this.http.post<alerte>(this.apiUrl, alerte); // Envoyer l'alerte au backend
  }

  // Acquitter une alerte
  acquitterAlerte(id: number, acquitteePar: string): Observable<alerte> {
    const updateData = {
      acquittee: true,
      acquitteePar,
    };
    return this.http.patch<alerte>(`${this.apiUrl}/${id}`, updateData); // Mettre à jour l'alerte dans le backend
  }

  // Récupérer toutes les alertes
  getAlertes(): Observable<alerte[]> {
    return this.http.get<alerte[]>(this.apiUrl); // Récupérer les alertes depuis le backend
  }
}