import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { AuthState } from '../models/auth.model';

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  access_token: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    isLoading: true,
    error: null
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
