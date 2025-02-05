import { Component } from '@angular/core';
import { UserTableComponent } from '../../shared/user-table/user-table.component';

@Component({
  selector: 'app-patient-profil',
  standalone: true,
  imports: [UserTableComponent],
  templateUrl: './patient-profil.component.html',
  styleUrl: './patient-profil.component.scss',
})
export class PatientProfilComponent {}
