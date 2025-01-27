import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../core/services/mock-data.service';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { DashboardGreetingComponent } from "./dashboard-greeting/dashboard-greeting.component";
import { Subject, takeUntil, catchError, Observable, switchMap, map } from 'rxjs';
import { CalendarSidebarComponent } from "./calender-sidebar/calender-sidebar.component";
import { DashboardState } from "../../interfaces/dashboardState";
import { DashboardService } from "../../core/services/dashboard.service";

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
      switchMap(segments => this.dashboardService.getDashboardState(segments))
    );
  }

  ngOnDestroy() {
    this.destroy$.next(void 0);
    this.destroy$.complete();
  }
}
