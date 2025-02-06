import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from '../../../shared/stat-card/stat-card.component';
import { DashboardGreetingComponent } from '../dashboard-greeting/dashboard-greeting.component';
import { StatCard } from '../../../interfaces/statCard'
@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, StatCardComponent, DashboardGreetingComponent],
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})

export class PatientDashboardComponent {
  @Input() stats: any;

  statCards: StatCard[] = [
    {
      title: 'Prochains Rendez-vous',
      value: () => this.stats?.upcomingAppointments || 0,
      icon: 'medical-appointment.png',
      description: 'Consultations à venir'
    },
    {
      title: 'Médicaments',
      value: () => this.stats?.medications?.length || 0,
      icon: 'pharmacy.png',
      description: 'Actuellement prescrits'
    },
    {
      title: 'Alertes Santé',
      value: () => this.stats?.healthAlerts || 0,
      icon: 'risks.png',
      description: 'À surveiller'
    }
  ];

  recentStats: StatCard[] = [
    {
      title: 'Température',
      value: () => this.stats?.latestVitals?.temperature || 'N/A',
      icon: 'thermometer.png',
      description: 'Dernière mesure de la température'
    },
    {
      title: 'Tension',
      value: () => this.stats?.latestVitals?.bloodPressure || 'N/A',
      icon: 'blood-pressure.png',
      description: 'Dernière mesure de la tension artérielle'
    },
    {
      title: 'Rythme cardiaque',
      value: () => this.stats?.latestVitals?.heartRate || 'N/A',
      icon: 'cardiogram.png',
      description: 'Dernière mesure du rythme cardiaque'
    }
  ];

}
