import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from '../../../shared/stat-card/stat-card.component';
import { DashboardGreetingComponent } from '../dashboard-greeting/dashboard-greeting.component';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, StatCardComponent, DashboardGreetingComponent],
  template: `
    <div class="space-y-6">
      <app-dashboard-greeting
        [greetingMessage]="greetingMessage"
        [fullName]="fullName"
        [subtitle]="subtitle"
      ></app-dashboard-greeting>
      <h2 class="text-2xl font-bold text-space-cadet">Tableau de bord médical</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <app-stat-card
          title="Patients du Jour"
          [value]="stats?.todayPatients || 0"
          icon=""
          description="Rendez-vous aujourd'hui"
        ></app-stat-card>
        <app-stat-card
          title="Alertes Constantes"
          [value]="stats?.vitalSignsAlerts || 0"
          icon=""
          description="Alertes de surveillance"
        ></app-stat-card>
        <app-stat-card
          title="Consultations"
          [value]="stats?.consultations || 0"
          icon=""
          description="Consultations du jour"
        ></app-stat-card>
        <app-stat-card
          title="Rendez-vous"
          [value]="stats?.appointments || 0"
          icon=""
          description="Prochains rendez-vous"
        ></app-stat-card>
      </div>
    </div>
  `
})
export class DoctorDashboardComponent {
  @Input() greetingMessage: string = '';
  @Input() fullName: string = '';
  @Input() subtitle: string = '';
  @Input() stats: any;
}
