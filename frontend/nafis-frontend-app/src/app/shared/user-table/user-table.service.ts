import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { Patient } from '../../interfaces/patient';
@Injectable({
  providedIn: 'root', // Makes it available throughout the application
})
export class UserService {
  private apiUrl = 'http://localhost:3000/patients'; // Base API URL (NestJS backend)

  constructor(private http: HttpClient) {}

  /**
   * Fetch all users
   */
  getUsers(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }

  /**
   * Fetch a single Patient by ID
   * @param PatientId - Patient ID
   */
  getPatientById(PatientId: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${PatientId}`);
  }

  /**
   * Create a new Patient
   * @param Patient - Patient object (Patient, Admin, Personnel)
   */
  createPatient(Patient: Partial<Patient>): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl, Patient);
  }

  /**
   * Update a Patient (PATCH)
   * @param PatientId - Patient ID
   * @param updates - Partial Patient object with fields to update
   */
  updatePatient(
    PatientId: number,
    updates: Partial<Patient>
  ): Observable<Patient> {
    return this.http.patch<Patient>(`${this.apiUrl}/${PatientId}`, updates);
  }

  /**
   * Delete a Patient
   * @param PatientId - Patient ID
   */
  deletePatient(PatientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${PatientId}`);
  }
}
