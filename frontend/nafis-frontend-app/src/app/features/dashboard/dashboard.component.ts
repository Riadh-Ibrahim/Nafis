import { Component, OnInit } from '@angular/core';
import { MockDataService } from "../../services/mock-data.service";
import { FormsModule } from "@angular/forms";
import { StatCardComponent } from "../../shared/stat-card/stat-card.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    StatCardComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userType: string = 'ADMINISTRATIF';
  adminStats: any;
  medicalStats: any;
  nurseStats: any;
  patientStats: any;

  constructor(private mockDataService: MockDataService) {}

  ngOnInit() {
    this.loadDashboardStats();
  }

  loadDashboardStats(): void {
    if (this.userType === 'ADMINISTRATIF') {
      this.mockDataService.getAdminStats().subscribe((data) => {
        this.adminStats = data;
      });
    } else if (this.userType === 'MEDECIN') {
      this.mockDataService.getMedicalStats().subscribe((data) => {
        this.medicalStats = data;
      });
    } else if (this.userType === 'INFIRMIER') {
      this.mockDataService.getNurseStats().subscribe((data) => {
        this.nurseStats = data;
      });
    }
    else if (this.userType === 'PATIENT') {
      this.mockDataService.getPatientStats().subscribe((data) => {
        this.patientStats = data;
      });
    }
  }
}
