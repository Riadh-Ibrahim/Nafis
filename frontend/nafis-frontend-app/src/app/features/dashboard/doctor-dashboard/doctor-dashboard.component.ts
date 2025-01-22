import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MockDataService } from '../../../services/mock-data.service';
import { StatCardComponent } from '../../../shared/stat-card/stat-card.component';
import {DashboardGreetingComponent} from "../dashboard-greeting/dashboard-greeting.component";
import {Personnel} from "../../../interfaces/personnel";

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, StatCardComponent, DashboardGreetingComponent],
  templateUrl: './doctor-dashboard.component.html'
})
export class DoctorDashboardComponent implements OnInit {
  medicalStats: any;
  doctorData?: Personnel;
  doctorId: string = '';

  constructor(
    private route: ActivatedRoute,
    private mockDataService: MockDataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.doctorId = params['id'];
      this.loadDoctorData()
      this.loadDoctorStats();
    });
  }

  private loadDoctorData(): void {
    this.mockDataService.getPersonnel(parseInt(this.doctorId)).subscribe(data => {
      this.doctorData = data;
    });
  }
  private loadDoctorStats(): void {
    this.mockDataService.getMedicalStats(this.doctorId).subscribe(data => {
      this.medicalStats = data;
    });
  }
}
