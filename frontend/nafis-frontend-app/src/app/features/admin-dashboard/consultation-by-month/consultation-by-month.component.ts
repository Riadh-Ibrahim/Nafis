import { Component } from '@angular/core';
import { RealtimeTemperatureChartComponent } from '../../../shared/realtime-chart/realtime-chart.component';

@Component({
  selector: 'app-consultation-by-month',
  standalone: true,
  imports: [RealtimeTemperatureChartComponent],
  templateUrl: './consultation-by-month.component.html',
  styleUrl: './consultation-by-month.component.scss',
})
export class ConsultationByMonthComponent {}
