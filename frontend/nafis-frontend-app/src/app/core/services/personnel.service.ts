import { Injectable } from '@angular/core';
import { Personnel, Presence } from '../../interfaces/personnel'
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


class PresenceDetail {
}

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  private baseUrl = '/api/personnel';

  constructor(private http: HttpClient) {}

  getPersonnel(): Observable<Personnel[]> {
    return this.http.get<Personnel[]>(this.baseUrl);
  }

  markPresence(presence: Presence): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/presence`, presence);
  }

  getPresenceHistory(personnelId: number): Observable<PresenceDetail[]> {
    return this.http.get<PresenceDetail[]>(`${this.baseUrl}/${personnelId}/presences`);
  }
}
