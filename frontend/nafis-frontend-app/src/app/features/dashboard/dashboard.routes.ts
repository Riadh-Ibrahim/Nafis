import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'patient/:id',
        component: PatientDashboardComponent
      },
      {
        path: 'doctor/:id',
        component: DoctorDashboardComponent
      }
    ]
  }
];
