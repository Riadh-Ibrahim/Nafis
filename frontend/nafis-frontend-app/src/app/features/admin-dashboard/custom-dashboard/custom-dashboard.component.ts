// admin-dashboard.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Chart, registerables } from 'chart.js';

// Register all Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './custom-dashboard.component.html',
  styleUrls: ['./custom-dashboard.component.scss'],
})
export class CustomDashboardComponent implements OnInit, OnDestroy {
  // Chart instances
  staticChart!: Chart;
  pollingChart!: Chart;
  pollingSubscription!: Subscription;

  // Static metrics data
  metrics = {
    totalPatients: 1500,
    totalDoctors: 80,
    appointmentsToday: 200,
    revenueToday: 7500,
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Initialize the static bar chart
    this.initStaticChart();

    // Initialize the polling (real-time) line chart
    this.initPollingChart();

    // Begin polling an API endpoint every 5 seconds
    this.pollingSubscription = interval(5000)
      .pipe(
        switchMap(() =>
          // Replace with your actual endpoint that returns an object { labels: string[], data: number[] }
          this.http.get<{ labels: string[]; data: number[] }>(
            'https://api.example.com/polling-chart-data'
          )
        )
      )
      .subscribe((response) => {
        this.updatePollingChart(response.labels, response.data);
      });
  }

  initStaticChart(): void {
    const ctx = document.getElementById('staticChart') as HTMLCanvasElement;
    this.staticChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Monthly Appointments',
            data: [50, 60, 70, 80, 90, 100],
            backgroundColor: 'rgba(46, 204, 113, 0.6)',
            borderColor: 'rgba(46, 204, 113, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  initPollingChart(): void {
    const ctx = document.getElementById('pollingChart') as HTMLCanvasElement;
    this.pollingChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['0s', '5s', '10s', '15s', '20s'],
        datasets: [
          {
            label: 'Real-Time Revenue',
            data: [7000, 7100, 7050, 7150, 7200],
            backgroundColor: 'rgba(52, 152, 219, 0.3)',
            borderColor: 'rgba(52, 152, 219, 1)',
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  updatePollingChart(labels: string[], data: number[]): void {
    this.pollingChart.data.labels = labels;
    this.pollingChart.data.datasets[0].data = data;
    this.pollingChart.update();
  }

  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
}
