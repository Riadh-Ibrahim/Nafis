import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MockDataService } from '../../../services/mock-data.service';
import { StatCardComponent } from '../../../shared/stat-card/stat-card.component';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, StatCardComponent],
  templateUrl: './patient-dashboard.component.html'
})
export class PatientDashboardComponent implements OnInit {
  patientStats: any;
  patientId: string = '';

  constructor(
    private route: ActivatedRoute,
    private mockDataService: MockDataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.patientId = params['id'];
      this.loadPatientStats();
    });
  }

  private loadPatientStats(): void {
    this.mockDataService.getPatientStats(this.patientId).subscribe(data => {
      this.patientStats = data;
    });
  }
}
