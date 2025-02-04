import { Component } from '@angular/core';
import { UserTableComponent } from '../../../shared/user-table/user-table.component';

@Component({
  selector: 'app-patient-management',
  standalone: true,
  imports: [UserTableComponent],
  templateUrl: './patient-management.component.html',
  styleUrl: './patient-management.component.scss',
})
export class PatientManagementComponent {}
