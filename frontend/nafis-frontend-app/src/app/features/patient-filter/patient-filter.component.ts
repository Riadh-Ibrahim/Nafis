import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Patient } from '../../interfaces/patient';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-patient-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-filter.component.html',
  styleUrl: './patient-filter.component.scss',
})
export class PatientFilterComponent implements OnInit {
  @Output() filteredPatients = new EventEmitter<Patient[]>();
  filterForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private mockDataService: MockDataService
  ) {}

  ngOnInit() {
    this.filterForm = this.fb.group({
      nom: [''],
      prenom: [''],
      numeroSecu: [''],
      telephone: [''],
    });
  }

  onFilter() {
    const filterValues = this.filterForm.value;

    this.mockDataService.getAllPatients().subscribe((patients) => {
      const filtered = patients.filter((patient) =>
        this.matchesFilter(patient, filterValues)
      );
      console.log('Patients filtrés:', filtered);
      this.filteredPatients.emit(filtered);
    });
  }

  private matchesFilter(patient: Patient, filters: any): boolean {
    return (
      (!filters.nom ||
        patient.lastname.toLowerCase().includes(filters.nom.toLowerCase())) &&
      (!filters.prenom ||
        patient.firstname
          .toLowerCase()
          .includes(filters.prenom.toLowerCase())) &&
      (!filters.numeroSecu ||
        patient.numeroSecu.includes(filters.numeroSecu)) &&
      (!filters.telephone || patient.telephone.includes(filters.telephone))
    );
  }
}
