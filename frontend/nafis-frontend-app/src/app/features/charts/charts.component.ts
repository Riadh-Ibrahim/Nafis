import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'temperature-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  template: `
    <div *ngIf="isBrowser">
      <canvas
        baseChart
        [data]="lineChartData"
        [options]="lineChartOptions"
        [type]="'line'"
      >
      </canvas>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        margin: 20px;
      }
    `,
  ],
})
export class TemperatureChartComponent {
  isBrowser!: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: unknown) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId as Object);
  }

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        data: [5, 7, 12, 17, 22, 25, 27, 26, 22, 17, 11, 7], // Temperature in Celsius
        label: 'Temperature (°C)',
        fill: true,
        tension: 0.4,
        borderColor: '#ff6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: '#ff6384',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#ff6384',
      },
    ],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Temperature Variation',
        font: {
          size: 16,
        },
      },
      legend: {
        display: true,
        position: 'bottom',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
    },
  };
}
