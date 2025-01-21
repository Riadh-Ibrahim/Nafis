import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MockDataService } from '../../../services/mock-data.service';
import { StatCardComponent } from '../../../shared/stat-card/stat-card.component';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, StatCardComponent],
  templateUrl: './doctor-dashboard.component.html'
})
export class DoctorDashboardComponent implements OnInit {
  medicalStats: any;
  doctorId: string = '';

  constructor(
    private route: ActivatedRoute,
    private mockDataService: MockDataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.doctorId = params['id'];
      this.loadDoctorStats();
    });
  }

  private loadDoctorStats(): void {
    this.mockDataService.getMedicalStats(this.doctorId).subscribe(data => {
      this.medicalStats = data;
    });
  }
}
