// core/store/notification/notification.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { addNotification, markAsRead } from './notification.actions';
import { alerte } from '../../../interfaces/alerte';
export const initialState: alerte[] = []; // Utilise l'interface Alerte pour le state

export const notificationReducer = createReducer(
  initialState,
  on(addNotification, (state, { notification }) => [...state, notification]),
  on(markAsRead, (state, { id, acquitteePar }) =>
    state.map(alerte =>
      alerte.id === id
        ? { ...alerte, acquittee: true, acquitteePar } // Marque l'alerte comme acquittée
        : alerte
    )
  )
);