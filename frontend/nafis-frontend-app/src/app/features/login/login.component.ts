import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/button/button.component';
import * as AuthActions from '../../core/store/auth/actions/auth.actions';
import * as AuthSelectors from '../../core/store/auth/selectors/auth.selectors';
import { Store, StoreModule } from '@ngrx/store';
import { provideStore } from '@ngrx/store';
import { authReducer } from '../../core/store/auth/reducers/auth.reducer';
import { UserRoleEnum } from '../../core/enums/user-role.enum';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonComponent],

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;
  isLoginMode = true;
  userRoles = Object.values(UserRoleEnum);

  isLoading$ = this.store.select(AuthSelectors.selectIsLoading);
  error$ = this.store.select(AuthSelectors.selectAuthError);
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private authService: AuthService
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      firstname: [''], 
      lastname: [''],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.authForm.valid) {
      const credentials = this.authForm.value;

      if (this.isLoginMode) {
        this.store.dispatch(AuthActions.login(credentials));
      } else {
        const registrationData = {
          firstname: credentials.firstname,
          lastname: credentials.lastname,
          email: credentials.email,
          password: credentials.password,
          role: credentials.role,
        };
        this.store.dispatch(AuthActions.register(credentials));
      }
    }
  }

  toggleAuthMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.authForm.reset();

  }
}
