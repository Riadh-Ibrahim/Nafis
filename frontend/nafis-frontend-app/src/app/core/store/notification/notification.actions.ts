import { createAction, props } from '@ngrx/store';
import { alerte } from '../../../interfaces/alerte';


export const addNotification = createAction(
  '[Notification] Add Notification',
  props<{ notification: alerte }>());

  export const markAsRead = createAction(
    '[Notification] Mark As Read',
    props<{ id: number, acquitteePar?: string }>() // Ajoute acquitteePar comme paramètre optionnel
);