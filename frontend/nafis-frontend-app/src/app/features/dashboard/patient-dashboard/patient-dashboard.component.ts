import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from '../../../shared/stat-card/stat-card.component';
import { DashboardGreetingComponent } from '../dashboard-greeting/dashboard-greeting.component';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, StatCardComponent, DashboardGreetingComponent],
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent {
  @Input() stats: any;
}
