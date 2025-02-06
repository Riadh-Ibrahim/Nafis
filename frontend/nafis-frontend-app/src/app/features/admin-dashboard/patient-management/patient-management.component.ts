import { Component } from '@angular/core';
import { UserTableComponent } from '../../../shared/user-table/user-table.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-patient-management',
  standalone: true,
  imports: [UserTableComponent, ButtonComponent, RouterLink],
  templateUrl: './patient-management.component.html',
  styleUrl: './patient-management.component.scss',
})
export class PatientManagementComponent {
  patients: any = [];
}
