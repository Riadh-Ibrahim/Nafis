import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, switchMap, of } from 'rxjs';
import { DashboardState } from '../../interfaces/dashboardState';
import { UrlSegment } from '@angular/router';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private mockDataService: MockDataService) {}

  getDashboardState(segments: UrlSegment[]): Observable<DashboardState> {
    if (segments.length < 2) {
      return EMPTY;
    }

    const type = segments[0].path as 'doctor' | 'patient';
    const id = segments[1].path;

    return type === 'doctor'
      ? this.getDoctorDashboardState(id)
      : this.getPatientDashboardState(id);
  }

  private getDoctorDashboardState(id: string): Observable<DashboardState> {
    return this.mockDataService.getPersonnel(parseInt(id)).pipe(
      switchMap((personnel) => {
        if (!personnel) {
          return of({
            type: 'doctor',
            stats: null,
            fullName: '',
            subtitle: '',
            greetingMessage: '',
            error: true,
          } as DashboardState);
        }
        return this.mockDataService.getMedicalStats(id).pipe(
          map((stats) => ({
            type: 'doctor',
            stats,
            fullName: `${personnel.prenom} ${personnel.nom}`,
            subtitle: `${personnel.specialite || 'Médecin'} - ${personnel.service}`,
            greetingMessage: this.getTimeOfDay(),
            error: false,
          } as DashboardState))
        );
      }),
      catchError(() => of({
        type: 'doctor',
        stats: null,
        fullName: '',
        subtitle: '',
        greetingMessage: '',
        error: true,
      } as DashboardState))
    );
  }

  private getPatientDashboardState(id: string): Observable<DashboardState> {
    return this.mockDataService.getPatient(parseInt(id)).pipe(
      switchMap((patient) => {
        if (!patient) {
          return of({
            type: 'patient',
            stats: null,
            fullName: '',
            subtitle: '',
            greetingMessage: '',
            error: true,
          } as DashboardState);
        }
        return this.mockDataService.getPatientStats(id).pipe(
          map((stats) => ({
            type: 'patient',
            stats,
            fullName: `${patient.prenom} ${patient.nom}`,
            subtitle: `№ Sécurité Sociale: ${patient.numeroSecu}`,
            greetingMessage: this.getTimeOfDay(),
            error: false,
          } as DashboardState))
        );
      }),
      catchError(() => of({
        type: 'patient',
        stats: null,
        fullName: '',
        subtitle: '',
        greetingMessage: '',
        error: true,
      } as DashboardState))
    );
  }

  private getTimeOfDay(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bon matin';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  }
}
