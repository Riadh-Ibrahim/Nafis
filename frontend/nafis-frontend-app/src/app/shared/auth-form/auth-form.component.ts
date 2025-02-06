// auth-form.component.ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/button/button.component';
import { UserRoleEnum } from '../../core/enums/user-role.enum';

export type AuthMode = 'login' | 'register';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonComponent],
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  // Parent passes the mode: either 'login' or 'register'
  @Input() mode: AuthMode = 'login';

  // Parent can provide a list of valid roles
  @Input() userRoles: string[] = Object.values(UserRoleEnum);

  // Emit form data when the user submits the form
  @Output() authSubmit = new EventEmitter<any>();

  authForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  // Build the form dynamically based on the mode
  private initForm(): void {
    // Always include email, password, and role
    const controls: any = {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
    };

    // Add additional controls for registration mode
    if (this.mode === 'register') {
      controls.firstname = ['', Validators.required];
      controls.lastname = ['', Validators.required];
    }

    this.authForm = this.fb.group(controls);
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      // Emit the form value for the parent to handle (dispatching the right action, etc.)
      this.authSubmit.emit(this.authForm.value);
    }
  }
}
