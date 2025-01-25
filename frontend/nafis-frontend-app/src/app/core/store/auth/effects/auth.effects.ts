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
      ofType(AuthActions.login), // On écoute les actions de type login
      mergeMap(({ email, password }) =>  // On récupère les données de l'utilisateur
        this.authService.login({ email, password }).pipe( // On appelle la méthode login du service AuthService
          map(response => AuthActions.loginSuccess({ access_token: response.access_token })), // Si la connexion réussit, on envoie l'action loginSuccess avec le token reçu
          catchError(error => of(AuthActions.loginFailure({ error: error.message })))   // Si la connexion échoue, on envoie l'action loginFailure avec le message d'erreur
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ access_token }) => { // On récupère le token reçu après une connexion réussie
          this.authService.setToken(access_token); // On stocke le token dans le service AuthService
          this.router.navigate(['/dashboard']); // On redirige l'utilisateur vers le dashboard
        })
      ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({ email, password }) =>

        this.authService.register({ email, password }).pipe(
          map(() => AuthActions.registerSuccess()),
          catchError(error => of(AuthActions.registerFailure({ error: error.message })))
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
