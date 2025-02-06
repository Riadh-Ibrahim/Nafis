import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { UserTableComponent } from '../../shared/user-table/user-table.component';
import { MainComponent } from './main/main.component';
import { PatientManagementComponent } from './patient-management/patient-management.component';
import { DoctorManagementComponent } from './doctor-management/doctor-management.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: MainComponent,
      },
      {
        path: 'users',
        component: PatientManagementComponent,
      },
      {
        path: 'doctors',
        component: DoctorManagementComponent,
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  {
    path: '**',
    component: AdminDashboardComponent,
  },
];
