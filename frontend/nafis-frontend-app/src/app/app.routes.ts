import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes')
      .then(m => m.DASHBOARD_ROUTES)
  },

  {
    path: "login",
    loadChildren: () => import("./features/login/login.routes").then(m => m.LOGIN_ROUTES)
  },

  {
    path: "constantes",
    loadChildren: () => import("./features/constantes-formulaires/constantes-formulaires.routes").then(m => m.CONSTANTES_ROUTES)
  }

];
