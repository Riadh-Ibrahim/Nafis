import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from '../../../shared/stat-card/stat-card.component';
import { DashboardGreetingComponent } from '../dashboard-greeting/dashboard-greeting.component';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, StatCardComponent, DashboardGreetingComponent],
  template: `
    <div class="space-y-6">
      <app-dashboard-greeting
        [greetingMessage]="greetingMessage"
        [fullName]="fullName"
        [subtitle]="subtitle"
      ></app-dashboard-greeting>
      <h2 class="text-2xl font-bold text-space-cadet">Tableau de bord patient</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <app-stat-card
          title="Prochains Rendez-vous"
          [value]="stats?.upcomingAppointments || 0"
          icon=""
          description="Consultations à venir"
        ></app-stat-card>
        <app-stat-card
          title="Médicaments"
          [value]="stats?.medications?.length || 0"
          icon=""
          description="Actuellement prescrits"
        ></app-stat-card>
        <app-stat-card
          title="Alertes Santé"
          [value]="stats?.healthAlerts || 0"
          icon=""
          description="À surveiller"
        ></app-stat-card>
      </div>
      <h2 class="text-lg font-bold text-space-cadet">Constantes récentes</h2>
      <div class="grid grid-cols-1 text-red-500 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <app-stat-card
          title="Température"
          [value]="stats?.latestVitals?.temperature || 'N/A'"
          icon="thermometer.png"
          description="Dernière mesure de la température"
        ></app-stat-card>
        <app-stat-card
          title="Tension"
          [value]="stats?.latestVitals?.bloodPressure || 'N/A'"
          icon="blood-pressure.png"
          description="Dernière mesure de la tension artérielle"
        ></app-stat-card>
        <app-stat-card
          title="Rythme cardiaque"
          [value]="stats?.latestVitals?.heartRate || 'N/A'"
          icon="cardiogram.png"
          description="Dernière mesure du rythme cardiaque"
        ></app-stat-card>
      </div>
    </div>
  `
})
export class PatientDashboardComponent {
  @Input() greetingMessage: string = '';
  @Input() fullName: string = '';
  @Input() subtitle: string = '';
  @Input() stats: any;
}
