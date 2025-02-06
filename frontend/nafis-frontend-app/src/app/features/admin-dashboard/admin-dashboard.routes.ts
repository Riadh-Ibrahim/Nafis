import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { UserTableComponent } from '../../shared/user-table/user-table.component';
import { MainComponent } from './main/main.component';
import { PatientManagementComponent } from './patient-management/patient-management.component';
import { DoctorManagementComponent } from './doctor-management/doctor-management.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { ReportingComponent } from './reporting/reporting.component';
import { CustomDashboardComponent } from './custom-dashboard/custom-dashboard.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: CustomDashboardComponent,
      },
      {
        path: 'reporting',
        component: ReportingComponent,
      },
      {
        path: 'patients',
        component: PatientManagementComponent,
      },
      {
        path: 'doctors',
        component: DoctorManagementComponent,
      },
      {
        path: 'add-doctor',
        component: AddDoctorComponent,
      },
      {
        path: 'patients/add-patient',
        component: AddPatientComponent,
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  {
    path: '**',
    component: AdminDashboardComponent,
  },
];
