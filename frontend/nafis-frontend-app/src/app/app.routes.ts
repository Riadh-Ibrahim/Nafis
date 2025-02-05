import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { NotificationComponent } from './features/notification/notification.component';
import { ChatComponent } from './features/chat/chat.component';

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
    path: 'login',
    loadChildren: () => import("./features/login/login.routes").then(m => m.LOGIN_ROUTES)
  },

  {
    path: 'constantes-vitales',
    loadChildren: () => import("./features/constantes-formulaires/constantes-formulaires.routes").then(m => m.CONSTANTES_ROUTES)
  },
  
  {
    path: 'patients',
    loadChildren: () => import("./features/patient-filter/patient-filter.routes")
      .then(m => m.PATIENT_FILTER_ROUTES)
  },
  {
    path: 'notifications',
    loadChildren: () => import("./features/notification/notification.routes").then(m => m.NOTIFICATION_ROUTES)
  },

  {
    path: 'chat',
    component: ChatComponent
  }

];
