import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../services/mock-data.service';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import {DashboardGreetingComponent} from "./dashboard-greeting/dashboard-greeting.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, CommonModule, DoctorDashboardComponent, PatientDashboardComponent, DashboardGreetingComponent],
  templateUrl:'./dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  type: 'doctor' | 'patient' | null = null;
  stats: any;
  error = false;
  greetingMessage = '';
  fullName = '';
  subtitle = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mockDataService: MockDataService
  ) {}

  ngOnInit() {
    this.route.url.subscribe(segments => {
      if (segments.length >= 2) {
        this.type = segments[0].path as 'doctor' | 'patient';
        const id = segments[1].path;
        this.loadData(id);
      }
    });
  }

  private loadData(id: string): void {
    if (this.type === 'doctor') {
      this.loadDoctorData(parseInt(id));
    } else if (this.type === 'patient') {
      this.loadPatientData(parseInt(id));
    }
  }

  private loadDoctorData(id: number): void {
    this.mockDataService.getPersonnel(id).subscribe({
      next: (data) => {
        if (!data) {
          this.handleError();
          return;
        }
        this.fullName = `${data.prenom} ${data.nom}`;
        this.subtitle = `${data.specialite || 'Médecin'} - ${data.service}`;
        this.greetingMessage = `${this.getTimeOfDay()}`;
        this.loadDoctorStats(id.toString());
      },
      error: () => this.handleError()
    });
  }

  private loadPatientData(id: number): void {
    this.mockDataService.getPatient(id).subscribe({
      next: (data) => {
        if (!data) {
          this.handleError();
          return;
        }
        this.fullName = `${data.prenom} ${data.nom}`;
        this.subtitle = `№ Sécurité Sociale: ${data.numeroSecu}`;
        this.greetingMessage = `Bon ${this.getTimeOfDay()}`;
        this.loadPatientStats(id.toString());
      },
      error: () => this.handleError()
    });
  }

  private loadDoctorStats(id: string): void {
    this.mockDataService.getMedicalStats(id).subscribe({
      next: (data) => this.stats = data,
      error: () => this.handleError()
    });
  }

  private loadPatientStats(id: string): void {
    this.mockDataService.getPatientStats(id).subscribe({
      next: (data) => this.stats = data,
      error: () => this.handleError()
    });
  }

  private handleError(): void {
    this.error = true;
  }

  private getTimeOfDay(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bon matin';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  }
}
