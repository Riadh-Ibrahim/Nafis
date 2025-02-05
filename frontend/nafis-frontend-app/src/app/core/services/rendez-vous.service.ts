import { Injectable } from '@angular/core';
import {Rendezvous } from '../../interfaces/rendezvous'
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  private baseUrl = '/api/rendez-vous';

  constructor(private http: HttpClient) {}

  createRendezvous(rdv: Omit<Rendezvous, 'id'>): Observable<Rendezvous> {
    return this.http.post<Rendezvous>(this.baseUrl, rdv);
  }

  getRendezvous(): Observable<Rendezvous[]> {
    return this.http.get<Rendezvous[]>(this.baseUrl);
  }
}
