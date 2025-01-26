import { Component } from '@angular/core';
import { Patient } from '../../interfaces/patient';
import { PatientFilterComponent } from "../patient-filter/patient-filter.component";
import { PatientListComponent } from "../patient-list/patient-list.component";

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [PatientFilterComponent, PatientListComponent],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss'
})
export class PatientsComponent {
  filteredPatients: Patient[] = [];

  onFilteredPatients(patients: Patient[]) {
    this.filteredPatients = patients; // Met à jour la liste des patients affichés
  }
}
