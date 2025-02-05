import { Component, Inject, Input, OnInit } from '@angular/core';
import { MockDataService } from '../../core/services/services/mock-data.service';
import { Patient } from '../../interfaces/patient';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent implements OnInit {
  @Input() patients: Patient[] = []; // Array to store the patients

  constructor(
    @Inject(MockDataService) private mockDataService: MockDataService
  ) {}

  ngOnInit(): void {
    // Fetch all patients when the component initializes
    this.mockDataService.getAllPatients().subscribe((patients) => {
      this.patients = patients; // Assign the fetched patients to the component's property
      console.log(patients); // Log the patients to the console for debugging
    });
  }

  // Handle the click event for viewing patient details
  viewPatientDetails(patientId: number): void {
    console.log('Viewing details for patient with ID:', patientId);
    // You can add logic here to navigate to the details page or open a modal
  }
}
