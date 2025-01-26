import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { notificationReducer } from './notification.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('notifications', notificationReducer)
  ]
})
export class NotificationModule {}