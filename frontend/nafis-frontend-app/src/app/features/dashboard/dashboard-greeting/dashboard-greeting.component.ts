import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Personnel } from '../../../interfaces/personnel';
import { Patient } from '../../../interfaces/patient';


@Component({
  selector: 'app-dashboard-greeting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-greeting.component.html',
  styleUrls: ['./dashboard-greeting.component.scss']
})
export class DashboardGreetingComponent {
  @Input() type: 'doctor' | 'patient' = 'doctor';
  @Input() userData?: Personnel | Patient;

  get greetingMessage(): string {
    return `Bon ${this.getTimeOfDay()}`;
  }

  get fullName(): string {
    return `${this.userData?.prenom} ${this.userData?.nom}`;
  }

  get subtitle(): string {
    if (this.type === 'doctor') {
      const personnel = this.userData as Personnel;
      return `${personnel?.specialite || 'Médecin'} - ${personnel?.service}`;
    }
    const patient = this.userData as Patient;
    return `№ Sécurité Sociale: ${patient?.numeroSecu}`;
  }

  private getTimeOfDay(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'matin';
    if (hour < 18) return 'après-midi';
    return 'soir';
  }
}
