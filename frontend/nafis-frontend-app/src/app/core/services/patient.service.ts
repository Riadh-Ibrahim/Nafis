import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserRoleEnum } from '../enums/user-role.enum';

export interface UserResponse {
  id: number;
  firstname?: string;
  lastname?: string;
  email: string;
  role: UserRoleEnum;
  dateNaissance?: string;
  numeroSecu?: string;
  adresse?: string;
  telephone?: string;
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl = 'http://localhost:3000/patients';

  constructor(private http: HttpClient) {}

  // Consider moving this to a shared utility service if used across multiple services
  private mapUserResponse(response: UserResponse): UserResponse {
    return { ...response }; // Spread operator provides a simple, clean mapping
  }

  getPatientById(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/${id}`)
      .pipe(
        map(response => this.mapUserResponse(response))
      );
  }

  getPatients(page = 0, size = 20): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${this.baseUrl}?page=${page}&size=${size}`)
      .pipe(
        map(responses => responses.map(response => this.mapUserResponse(response)))
      );
  }

  // Additional methods you might want to add:
  createPatient(patientData: Partial<UserResponse>): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.baseUrl, patientData)
      .pipe(
        map(response => this.mapUserResponse(response))
      );
  }

  updatePatient(id: number, patientData: Partial<UserResponse>): Observable<UserResponse> {
    return this.http.patch<UserResponse>(`${this.baseUrl}/${id}`, patientData)
      .pipe(
        map(response => this.mapUserResponse(response))
      );
  }

  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}