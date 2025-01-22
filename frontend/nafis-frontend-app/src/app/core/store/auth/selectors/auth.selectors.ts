import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../models/auth.model';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const selectIsLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoading
);

export const selectAccessToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.access_token
);