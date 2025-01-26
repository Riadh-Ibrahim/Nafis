import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../core/services/mock-data.service';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { DashboardGreetingComponent } from "./dashboard-greeting/dashboard-greeting.component";
import {Subject, takeUntil, catchError, EMPTY, Observable, switchMap, map} from 'rxjs';
import {CalendarSidebarComponent} from "./calender-sidebar/calender-sidebar.component";

interface DashboardState {
  type: 'doctor' | 'patient' | null;
  stats: any;
  error: boolean;
  greetingMessage: string;
  fullName: string;
  subtitle: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    DoctorDashboardComponent,
    PatientDashboardComponent,
    DashboardGreetingComponent,
    CalendarSidebarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  dashboardState$!: Observable<DashboardState>;
  error$ = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mockDataService: MockDataService
  ) {}

  ngOnInit() {
    this.initializeDashboard();
  }

  private initializeDashboard() {
    this.dashboardState$ = this.route.url.pipe(
      takeUntil(this.destroy$),
      switchMap(segments => {
        if (segments.length < 2) {
          setTimeout(() => this.error$.next(true));
          return EMPTY;
        }

        const type = segments[0].path as 'doctor' | 'patient';
        const id = segments[1].path;

        return this.loadData(type, id);
      }),
      catchError(() => {
        setTimeout(() => this.error$.next(true));
        return EMPTY;
      })
    );
  }

  private loadData(type: 'doctor' | 'patient', id: string): Observable<DashboardState> {
    const baseState: DashboardState = {
      type,
      stats: null,
      error: false,
      greetingMessage: '',
      fullName: '',
      subtitle: ''
    };

    if (type === 'doctor') {
      return this.mockDataService.getPersonnel(parseInt(id)).pipe(
        switchMap(personnel => {
          if (!personnel) {
            setTimeout(() => this.error$.next(true));
            return EMPTY;
          }

          return this.mockDataService.getMedicalStats(id).pipe(
            map(stats => ({
              ...baseState,
              stats,
              fullName: `${personnel.prenom} ${personnel.nom}`,
              subtitle: `${personnel.specialite || 'Médecin'} - ${personnel.service}`,
              greetingMessage: `${this.getTimeOfDay()}`
            }))
          );
        }),
        catchError(() => {
          setTimeout(() => this.error$.next(true));
          return EMPTY;
        })
      );
    } else {
      return this.mockDataService.getPatient(parseInt(id)).pipe(
        switchMap(patient => {
          if (!patient) {
            setTimeout(() => this.error$.next(true));
            return EMPTY;
          }

          return this.mockDataService.getPatientStats(id).pipe(
            map(stats => ({
              ...baseState,
              stats,
              fullName: `${patient.prenom} ${patient.nom}`,
              subtitle: `№ Sécurité Sociale: ${patient.numeroSecu}`,
              greetingMessage: `${this.getTimeOfDay()}`
            }))
          );
        }),
        catchError(() => {
          setTimeout(() => this.error$.next(true));
          return EMPTY;
        })
      );
    }
  }

  private getTimeOfDay(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bon matin';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  }

  ngOnDestroy() {
    this.destroy$.next(void 0);
    this.destroy$.complete();
  }
}
