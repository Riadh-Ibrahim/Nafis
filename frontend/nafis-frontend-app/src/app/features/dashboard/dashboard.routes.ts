import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const DASHBOARD_ROUTES: Routes = [

  {
    path: ':type/:id',
    component: DashboardComponent,
  },
  {
    path: '**',
    component: DashboardComponent,
  },
];
