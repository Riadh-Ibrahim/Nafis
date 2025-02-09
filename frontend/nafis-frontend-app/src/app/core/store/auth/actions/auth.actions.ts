// src/app/store/actions/auth.actions.ts
import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);
export const resetForm = createAction('[Auth] Reset Form');

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ access_token: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const register = createAction(
  '[Auth] Register',
  props<{
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
  }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success' // Pas de payload car on ne reçoit pas de données après une inscription réussie
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

// import { createAction, props } from '@ngrx/store';
// import { UserRoleEnum } from '../../../enums/user-role.enum';

// /**
//  * Login Actions
//  */
// export const login = createAction(
//   '[Auth] Login',
//   props<{ email: string; password: string }>() // Role is not required for login
// );

// export const loginSuccess = createAction(
//   '[Auth] Login Success',
//   props<{ access_token: string; id: number; role: UserRoleEnum }>() // Include user ID and role
// );

// export const loginFailure = createAction(
//   '[Auth] Login Failure',
//   props<{ error: string }>()
// );

// /**
//  * Register Actions
//  */
// export const register = createAction(
//   '[Auth] Register',
//   props<{
//     firstname: string;
//     lastname: string;
//     email: string;
//     password: string;
//     role: UserRoleEnum;
//   }>()
// );

// export const registerSuccess = createAction(
//   '[Auth] Register Success',
//   props<{ id: number; role: UserRoleEnum }>() // Include user ID and role
// );

// export const registerFailure = createAction(
//   '[Auth] Register Failure',
//   props<{ error: string }>()
// );

// /**
//  * Logout Action
//  */
// export const logout = createAction('[Auth] Logout');
