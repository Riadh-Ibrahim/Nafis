import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { GestionChambreComponent } from '../gestion-chambre/gestion-chambre.component';

export const DASHBOARD_ROUTES: Routes = [

  {
    path: ':type/:id',
    component: DashboardComponent,
  },
  {
    path: 'chambres',
    component: GestionChambreComponent,
  },
  {
    path: '**',
    component: DashboardComponent,
  },
];
