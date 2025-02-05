import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { DashboardGreetingComponent } from './dashboard-greeting/dashboard-greeting.component';
import {
  Subject,
  takeUntil,
  catchError,
  Observable,
  switchMap,
  map,
  EMPTY,
} from 'rxjs';
import { CalendarSidebarComponent } from './calender-sidebar/calender-sidebar.component';
import { DashboardState } from '../../interfaces/dashboardState';
import { DashboardService } from '../../core/services/dashboard.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DoctorDashboardComponent,
    PatientDashboardComponent,
    DashboardGreetingComponent,
    CalendarSidebarComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  dashboardState$!: Observable<DashboardState>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.initializeDashboard();
  }

  private initializeDashboard() {
    this.dashboardState$ = this.route.url.pipe(
      switchMap((segments) =>
        this.dashboardService.getDashboardState(segments)
      ),
      tap((state) => {
        console.log('Dashboard State:', {
          type: state.type,
          userId: state.userId,
          error: state.error,
        });
      }),
      catchError((error) => {
        console.error('Failed to initialize dashboard:', error);
        return EMPTY;
      })
    );
  }

  getUserId(state: DashboardState): number {
    const id = this.route.snapshot.url[1].path;
    return parseInt(id);
  }

  getUserType(state: DashboardState): 'doctor' | 'patient' {
    return state.type;
  }

  ngOnDestroy() {
    this.destroy$.next(void 0);
    this.destroy$.complete();
  }
}
