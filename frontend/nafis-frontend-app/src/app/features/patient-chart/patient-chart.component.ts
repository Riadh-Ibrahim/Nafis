import { Component } from '@angular/core';
import { WidgetsComponent } from '../../shared/widgets/widgets.component';
import { RealtimeTemperatureChartComponent } from '../../shared/realtime-chart/realtime-chart.component';

@Component({
  selector: 'app-patient-chart',
  standalone: true,
  imports: [WidgetsComponent, RealtimeTemperatureChartComponent],
  templateUrl: './patient-chart.component.html',
  styleUrl: './patient-chart.component.scss',
})
export class PatientChartComponent {}
