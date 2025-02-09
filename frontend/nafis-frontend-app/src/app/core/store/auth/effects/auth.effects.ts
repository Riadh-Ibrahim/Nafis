// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { of } from 'rxjs';
// import { map, mergeMap, catchError, tap } from 'rxjs/operators';
// import { AuthService } from '../../../services/auth.service';
// import * as AuthActions from '../actions/auth.actions';
// import { Router } from '@angular/router';

// @Injectable()
// export class AuthEffects {
//   login$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.login),
//       mergeMap(({ email, password, role }) =>
//         this.authService.login({ email, password, role }).pipe(
//           map((response) =>
//             AuthActions.loginSuccess({ access_token: response.access_token })
//           ),
//           catchError((error) =>
//             of(AuthActions.loginFailure({ error: error.message }))
//           )
//         )
//       )
//     )
//   );

//   loginSuccess$ = createEffect(
//     () =>
//       this.actions$.pipe(
//         ofType(AuthActions.loginSuccess),
//         tap(({ access_token }) => {
//           this.authService.setToken(access_token);
//           this.router.navigate(['/dashboard/patient/1']);
//         })
//       ),
//     { dispatch: false }
//   );

//   register$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.register),
//       mergeMap(({ firstname, lastname, email, password, role }) =>
//         this.authService
//           .register({
//             commonFields: { firstname, lastname, email, password, role },
//           })
//           .pipe(
//             map(() => AuthActions.registerSuccess()),
//             catchError((error) =>
//               of(AuthActions.registerFailure({ error: error.message }))
//             )
//           )
//       )
//     )
//   );

//   constructor(
//     private actions$: Actions,
//     private authService: AuthService,
//     private router: Router
//   ) {}
// }
// src/app/store/effects/auth.effects.ts
// src/app/store/effects/auth.effects.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as AuthActions from '../actions/auth.actions';
import { AuthService } from '../../../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class AuthEffects {
  http: any;
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        this.authService.login({ email, password }).pipe(
          map((response) =>
            AuthActions.loginSuccess({ access_token: response.access_token })
          ),
          catchError((error) =>
            of(AuthActions.loginFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          const isAuthenticated = this.authService.isAuthenticated();

          if (isAuthenticated) {
            const role = this.authService.getUserRole(); // Example method to get role from AuthService
            //const userId = this.authService.getUserId();

            // if (role === 'patient') {
              this.router.navigate([`/dashboard/patient/1`]);
            // } else if (role === 'personnel') {
            //   this.router.navigate([`/dashboard/doctor/1`]);
            // } else {
            //   this.router.navigate([`/landing`]);
            // }
          } else {
            this.router.navigate(['/login']); // Navigate to login page if not authenticated
          }
        })
      ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({ firstname, lastname, email, password, role }) =>
        this.authService
          .register({
            commonFields: { firstname, lastname, email, password, role },
          }) // Wrap inside commonFields
          .pipe(
            map(() => AuthActions.registerSuccess()),
            catchError((error) =>
              of(AuthActions.registerFailure({ error: error.message }))
            )
          )
      )
    )
  );


  // registerSuccess$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.registerSuccess),
  //     tap(({ access_token }) => {
  //       if (access_token) {
  //         try {
  //           const decoded: any = jwtDecode(access_token);
  //           const email = decoded?.email; // Ensure token contains email
  //           if (email) {
  //             this.http.post('/api/user/send-welcome-email', { email }).subscribe();
  //           }
  //         } catch (error) {
  //           console.error('Error decoding token:', error);
  //         }
  //       }
  
  //       const isAuthenticated = this.authService.isAuthenticated();
  //       if (isAuthenticated) {
  //         const role = this.authService.getUserRole();
  //         if (role === 'patient') {
  //           this.router.navigate(['/patients']);
  //         } else if (role === 'doctor') {
  //           this.router.navigate(['/doctor']);
  //         } else {
  //           this.router.navigate(['/dashboard']);
  //         }
  //       } else {
  //         this.router.navigate(['/login']);
  //       }
  //     })
  //   ),
  //   { dispatch: false }
  // );   

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.logout();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}
