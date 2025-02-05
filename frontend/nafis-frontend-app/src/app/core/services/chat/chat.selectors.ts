import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MessagingState } from './chat.reducer';



export const selectMessagingState = createFeatureSelector<MessagingState>('messaging');

export const selectRequests = createSelector(
  selectMessagingState,
  state => state.requests
);

export const selectMessages = createSelector(
  selectMessagingState,
  state => state.messages
);
