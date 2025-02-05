import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { NotificationComponent } from './features/notification/notification.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then(
        (m) => m.DASHBOARD_ROUTES
      ),
  },
  {
    path: 'doctor-search',
    loadChildren: () =>
      import('./features/doctor-search/doctor-search.routes').then(
        (m) => m.DOCTOR_SEARCH_ROUTES
      ),
  },
  {
    path: 'patient-profil',
    loadChildren: () =>
      import('./features/patient-profil/patient-profil.routes').then(
        (m) => m.PATIENT_PROFIL_ROUTES
      ),
  },
  {
    path: 'patient-chart',
    loadChildren: () =>
      import('./features/patient-chart/patient-chart.routes').then(
        (m) => m.PATIENT_CHART_ROUTES
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin-dashboard/admin-dashboard.routes').then(
        (m) => m.DASHBOARD_ROUTES
      ),
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.routes').then((m) => m.LOGIN_ROUTES),
  },

  {
    path: 'constantes',
    loadChildren: () =>
      import(
        './features/constantes-formulaires/constantes-formulaires.routes'
      ).then((m) => m.CONSTANTES_ROUTES),
  },
  {
    path: 'constantes-vitales',
    loadChildren: () =>
      import(
        './features/constantes-formulaires/constantes-formulaires.routes'
      ).then((m) => m.CONSTANTES_ROUTES),
  },
  {
    path: 'doctor-profile',
    loadChildren: () =>
      import('./features/doctor-profile/doctor-profile.routes').then(
        (m) => m.PROFILE_ROUTES
      ),
  },

  {
    path: 'patients',
    loadChildren: () =>
      import('./features/patient-filter/patient-filter.routes').then(
        (m) => m.PATIENT_FILTER_ROUTES
      ),
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./features/notification/notification.routes').then(
        (m) => m.NOTIFICATION_ROUTES
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/landing/landing.routes').then((m) => m.LANDING_ROUTES),
  },
  {
    path: 'specialities',
    loadChildren: () =>
      import('./features/specialitylist/specialitylist.routes').then(
        (m) => m.SPECIALITYLIST_ROUTES
      ),
  },
];
