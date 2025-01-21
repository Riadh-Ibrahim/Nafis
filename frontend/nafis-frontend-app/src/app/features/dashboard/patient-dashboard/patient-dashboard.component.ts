import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MockDataService } from '../../../services/mock-data.service';
import { StatCardComponent } from '../../../shared/stat-card/stat-card.component';
import {DashboardGreetingComponent} from "../dashboard-greeting/dashboard-greeting.component";
import {Patient} from "../../../interfaces/patient";

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, StatCardComponent, DashboardGreetingComponent],
  templateUrl: './patient-dashboard.component.html'
})
export class PatientDashboardComponent implements OnInit {
  patientStats: any;
  patientId: string = '';
  patientData?: Patient;

  constructor(
    private route: ActivatedRoute,
    private mockDataService: MockDataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.patientId = params['id'];
      this.loadPatientData();
      this.loadPatientStats();
    });
  }
  private loadPatientData(): void {
    this.mockDataService.getPatient(parseInt(this.patientId)).subscribe(data => {
      this.patientData = data;
    });
  }
  private loadPatientStats(): void {
    this.mockDataService.getPatientStats(this.patientId).subscribe(data => {
      this.patientStats = data;
    });
  }
}
