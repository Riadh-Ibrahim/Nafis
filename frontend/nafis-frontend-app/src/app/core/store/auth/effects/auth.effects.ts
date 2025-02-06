import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import * as AuthActions from '../actions/auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password, role }) =>
        this.authService.login({ email, password, role }).pipe(
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
        tap(({ access_token }) => {
          this.authService.setToken(access_token);
          this.router.navigate(['/dashboard/patient/1']);
        })
      ),
    { dispatch: false }
  );

  // register$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.register),
  //     mergeMap(({ firstname, lastname, email, password, role }) =>
  //       this.authService
  //         .register({ firstname, lastname, email, password, role })
  //         .pipe(
  //           map(() => AuthActions.registerSuccess()),
  //           catchError((error) =>
  //             of(AuthActions.registerFailure({ error: error.message }))
  //           )
  //         )
  //     )
  //   )
  // );
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

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
