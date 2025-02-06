import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, switchMap, of } from 'rxjs';
import { DashboardState } from '../../interfaces/dashboardState';
import { UrlSegment } from '@angular/router';
import { MockDataService } from './mock-data.service';
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private mockDataService: MockDataService) {}

  getDashboardState(segments: UrlSegment[]): Observable<DashboardState> {
    if (segments.length < 2) {
      console.warn('Not enough segments in URL');
      return EMPTY;
    }

    const type = segments[0].path as 'doctor' | 'patient';
    const id = parseInt(segments[1].path, 10);

    console.log('Creating dashboard state for:', { type, id });

    return (type === 'doctor'
        ? this.getDoctorDashboardState(id.toString())
        : this.getPatientDashboardState(id.toString())
    ).pipe(
      tap(state => {
        console.log('Created dashboard state:', state);
      })
    );
  }
  private getDoctorDashboardState(id: string): Observable<DashboardState> {
    return this.mockDataService.getPersonnel(parseInt(id)).pipe(
      switchMap((personnel) => {
        if (!personnel) {
          return of({
            type: 'doctor',
            userId: parseInt(id),  // Add this
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
            userId: parseInt(id),  // Add this
            stats,
            fullName: `${personnel.prenom} ${personnel.nom}`,
            subtitle: `${personnel?.specialite || 'Médecin'} - ${personnel?.service || 'Service inconnu'}`,
            greetingMessage: this.getTimeOfDay(),
            error: false,
          } as DashboardState))
        );
      }),
      catchError(() => of({
        type: 'doctor',
        userId: parseInt(id),  // Add this
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
            type: 'patient' as const,
            userId: parseInt(id),
            stats: null,
            fullName: '',
            subtitle: '',
            greetingMessage: '',
            error: true,
          });
        }

        return this.mockDataService.getPatientStats(id).pipe(
          map((stats) => ({
            type: 'patient' as const,
            userId: parseInt(id),
            stats,
            fullName: `${patient.prenom} ${patient.nom}`,
            subtitle: `№ Sécurité Sociale: ${patient?.numeroSecu || 'Inconnu'}`,
            greetingMessage: this.getTimeOfDay(),
            error: false,
          }))
        );
      })
    );
  }
  private getTimeOfDay(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bon matin';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  }
}
