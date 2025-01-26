import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { AuthState } from '../models/auth.model';
//  Le reducer gère les modifications de l'état en fonction des actions dispatchées.
export const initialState: AuthState = { 
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  access_token: null
};

export const authReducer = createReducer(   // Création du reducer
  initialState,
  on(AuthActions.login, (state) => ({ // On écoute l'action login
    ...state, // On renvoie l'état actuel
    isLoading: true,    // On met à jour isLoading à true
    error: null // On met à jour isLoading à true et on réinitialise l'erreur
  })),
  on(AuthActions.loginSuccess, (state, { access_token }) => ({
    ...state,
    isAuthenticated: true,
    isLoading: false,
    error: null,
    access_token
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isAuthenticated: false,
    isLoading: false,
    error
  })),
  on(AuthActions.register, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(AuthActions.registerSuccess, (state) => ({
    ...state,
    isLoading: false,
    error: null
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  on(AuthActions.logout, () => initialState)
);
