import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from '../../../shared/stat-card/stat-card.component';
import { DashboardGreetingComponent } from '../dashboard-greeting/dashboard-greeting.component';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, StatCardComponent],
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss'],
})
export class DoctorDashboardComponent {
  @Input() stats: any;
  title = 'angular-line-chart';
}
