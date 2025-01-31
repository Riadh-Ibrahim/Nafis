import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from '../../../shared/stat-card/stat-card.component';
import { DashboardGreetingComponent } from '../dashboard-greeting/dashboard-greeting.component';
import {StatCard} from "../../../interfaces/statCard";

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, StatCardComponent],
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss'],
})
export class DoctorDashboardComponent {
  @Input() stats: any;

  statCards: StatCard[] = [
    {
      title: 'Patients du Jour',
      value: () => this.stats?.todayPatients || 0,
      icon: 'crowd.png',
      description: 'Rendez-vous aujourd\'hui'
    },
    {
      title: 'Alertes Constantes',
      value: () => this.stats?.vitalSignsAlerts || 0,
      icon: 'vital-signs.png',
      description: 'Alertes de surveillance'
    },
    {
      title: 'Consultations',
      value: () => this.stats?.consultations || 0,
      icon: 'medical-appointment.png',
      description: 'Consultations du jour'
    },
    {
      title: 'Rendez-vous',
      value: () => this.stats?.appointments || 0,
      icon: 'doctors-office.png',
      description: 'Prochains rendez-vous'
    }
  ];
}
