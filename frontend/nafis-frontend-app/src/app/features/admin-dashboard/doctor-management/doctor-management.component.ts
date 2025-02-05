import { Component } from '@angular/core';
import { UserTableComponent } from '../../../shared/user-table/user-table.component';

@Component({
  selector: 'app-doctor-management',
  standalone: true,
  imports: [UserTableComponent],
  templateUrl: './doctor-management.component.html',
  styleUrl: './doctor-management.component.scss',
})
export class DoctorManagementComponent {}
