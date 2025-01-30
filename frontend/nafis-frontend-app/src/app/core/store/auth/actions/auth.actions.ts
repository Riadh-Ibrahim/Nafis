import { createAction, props } from '@ngrx/store';
import { User } from '../models/auth.model';
import { UserRoleEnum } from '../../../enums/user-role.enum';

export const login = createAction(
  '[Auth] Login',// Type de l'action
  props<{ email: string; password: string ;role:string}>() // Payload (données associées)
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ access_token: string }>() // Token reçu après une connexion réussie
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>() // Message d'erreur en cas d'échec de connexion
);

export const register = createAction(
  '[Auth] Register',
  props<{ firstname: string; lastname: string; email: string; password: string; role: UserRoleEnum }>() // Données de l'utilisateur à créer
);

export const registerSuccess = createAction(
  '[Auth] Register Success' // Pas de payload car on ne reçoit pas de données après une inscription réussie
);

export const registerFailure = createAction(
  '[Auth] Register Failure', // Type de l'action
  props<{ error: string }>() // Message d'erreur en cas d'échec d'inscription
);

export const logout = createAction('[Auth] Logout');  // Type de l'action