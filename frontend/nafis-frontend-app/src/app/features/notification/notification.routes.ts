import { Routes } from '@angular/router';
import { NotificationComponent } from './notification.component';

export const NOTIFICATION_ROUTES: Routes = [
  {
    path: '', // Chemin relatif (sera combiné avec le chemin parent)
    component: NotificationComponent
  }
];