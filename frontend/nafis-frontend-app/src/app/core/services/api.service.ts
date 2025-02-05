import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ApiResponse,
  FiltreRecherche,
  Pagination,
} from '../../interfaces/common';
import { Rendezvous } from '../../interfaces/rendezvous';
import { Personnel } from '../../interfaces/personnel';
import { Chambre } from '../../interfaces/chambre';
import { ConstantesVitales } from '../../interfaces/ConstantesVitales';
import { Patient } from '../../interfaces/patient';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = '';
  constructor(private http: HttpClient) {}

  // Patient endpoints
  getPatients(
    filtres: FiltreRecherche
  ): Observable<ApiResponse<Pagination<Patient>>> {
    const params = this.buildQueryParams(filtres);
    return this.http.get<ApiResponse<Pagination<Patient>>>(
      `${this.apiUrl}/api/patients`,
      { params }
    );
  }

  getPatient(id: number): Observable<ApiResponse<Patient>> {
    return this.http.get<ApiResponse<Patient>>(
      `${this.apiUrl}/api/patients/${id}`
    );
  }

  createPatient(patient: Patient): Observable<ApiResponse<Patient>> {
    return this.http.post<ApiResponse<Patient>>(
      `${this.apiUrl}/api/patients`,
      patient
    );
  }

  updatePatient(
    id: number,
    patient: Patient
  ): Observable<ApiResponse<Patient>> {
    return this.http.put<ApiResponse<Patient>>(
      `${this.apiUrl}/api/patients/${id}`,
      patient
    );
  }

  deletePatient(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(
      `${this.apiUrl}/api/patients/${id}`
    );
  }

  // Surveillance endpoints
  getConstantesVitales(
    patientId: number
  ): Observable<ApiResponse<ConstantesVitales>> {
    return this.http.get<ApiResponse<ConstantesVitales>>(
      `${this.apiUrl}/api/surveillance/constantes/${patientId}`
    );
  }

  // Chambre endpoints
  getChambres(
    filtres?: FiltreRecherche
  ): Observable<ApiResponse<Pagination<Chambre>>> {
    const params = this.buildQueryParams(filtres);
    return this.http.get<ApiResponse<Pagination<Chambre>>>(
      `${this.apiUrl}/api/chambres`,
      { params }
    );
  }

  // Personnel endpoints
  getPersonnel(
    filtres?: FiltreRecherche
  ): Observable<ApiResponse<Pagination<Personnel>>> {
    const params = this.buildQueryParams(filtres);
    return this.http.get<ApiResponse<Pagination<Personnel>>>(
      `${this.apiUrl}/api/personnel`,
      { params }
    );
  }

  // Rendez-vous endpoints
  createRendezVous(
    rendezvous: Rendezvous
  ): Observable<ApiResponse<Rendezvous>> {
    return this.http.post<ApiResponse<Rendezvous>>(
      `${this.apiUrl}/api/rendez-vous`,
      rendezvous
    );
  }

  private buildQueryParams(filtres?: FiltreRecherche): HttpParams {
    let params = new HttpParams();

    if (!filtres) return params;

    if (filtres.terme) params = params.set('terme', filtres.terme);
    if (filtres.dateDebut)
      params = params.set('dateDebut', filtres.dateDebut.toString());
    if (filtres.dateFin)
      params = params.set('dateFin', filtres.dateFin.toString());
    if (filtres.statut) params = params.set('statut', filtres.statut);
    if (filtres.type) params = params.set('type', filtres.type);
    if (filtres.page !== undefined)
      params = params.set('page', filtres.page.toString());
    if (filtres.pageSize)
      params = params.set('size', filtres.pageSize.toString());
    if (filtres.tri) {
      params = params.set('tri', filtres.tri.champ);
      params = params.set('ordre', filtres.tri.ordre);
    }

    return params;
  }
}
