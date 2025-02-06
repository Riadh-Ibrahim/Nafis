import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as AuthActions from '../../../core/store/auth/actions/auth.actions';
import * as AuthSelectors from '../../../core/store/auth/selectors/auth.selectors';
import { Store, StoreModule } from '@ngrx/store';
import { provideStore } from '@ngrx/store';
import { authReducer } from '../../../core/store/auth/reducers/auth.reducer';
import { UserRoleEnum } from '../../../core/enums/user-role.enum';
import { AuthFormComponent } from '../../../shared/auth-form/auth-form.component';
@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AuthFormComponent],
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.scss',
})
export class AddPatientComponent implements OnInit {
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
  // dashboard.component.ts
  // admin-registration.component.ts
  handleRegister(registrationData: any) {
    // You might want to extract or transform data if needed before dispatching
    const credentials = this.authForm.value;
    this.store.dispatch(AuthActions.register(registrationData));
  }
}
