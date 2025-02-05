import {
  Component,
  OnDestroy,
  signal,
  computed,
  effect,
  inject,
} from '@angular/core';

import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule, DatePipe } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import { TemperatureService } from '../../core/services/Temperature.service';
import 'chartjs-plugin-streaming';
import { StreamingPlugin, RealTimeScale } from 'chartjs-plugin-streaming';
import 'chartjs-adapter-date-fns'; // Required for time scale

// Register the plugins
Chart.register(StreamingPlugin, RealTimeScale);

@Component({
  selector: 'realtime-temperature-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './realtime-chart.component.html',
  styleUrls: ['./realtime-chart.component.scss'],
})
export class RealtimeTemperatureChartComponent implements OnDestroy {
  private temperatureService = inject(TemperatureService);
  private wsConnection: WebSocket | null = null;

  // Signals
  isInitialized = signal<boolean>(true);
  isStreaming = signal<boolean>(true);
  error = signal<string>('');
  currentTemperature = signal<number | null>(null);
  lastUpdateTime = signal<Date>(new Date());

  private temperatureData = signal<Array<{ x: number; y: number }>>([]);

  // Chart Options with proper typing for streaming plugin
  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 750,
      easing: 'easeInOutQuart',
    },
    plugins: {
      title: {
        display: true,
        text: 'Real-time Temperature Monitor',
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: 20,
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          padding: 20,
          boxWidth: 15,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => `Temperature: ${context.parsed.y}°C`,
        },
      },
    },
    scales: {
      x: {
        type: 'realtime',
        realtime: {
          duration: 20000, // Show the last 20 seconds of data
          refresh: 5000, // Refresh every 5 seconds
          delay: 1000, // Delay to accommodate server data latency
          onRefresh: (chart: any) => {
            if (this.isStreaming()) {
              const currentTemp = this.currentTemperature();
              if (currentTemp !== null && currentTemp !== undefined) {
                chart.data.datasets[0].data.push({
                  x: Date.now(),
                  y: currentTemp,
                });
              }
            }
          },
        },
        time: {
          unit: 'second',
          displayFormats: {
            second: 'HH:mm:ss',
          },
        },
        title: {
          display: true,
          text: 'Time',
        },
        grid: {
          display: true,
          color: 'rgba(0,0,0,0.1)',
        },
      },
      y: {
        beginAtZero: false,
        min: 35, // Minimum value for temperature
        max: 40, // Maximum value for temperature
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
        grid: {
          display: true,
          color: 'rgba(0,0,0,0.1)',
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'nearest',
    },
  };

  // Computed chart data
  chartData = computed(() => ({
    datasets: [
      {
        data: this.temperatureData(),
        label: 'Temperature (°C)',
        fill: false,
        tension: 0.5, // Higher tension for smoother lines
        borderColor: '#ff6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: '#ff6384',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#ff6384',
      },
    ],
  }));

  isBrowser!: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: unknown) {
    this.initWebSocket();
  }

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId as Object);
  }

  toggleDataStream(): void {
    if (this.isStreaming()) {
      this.wsConnection?.close();
      this.isStreaming.set(false);
    } else {
      this.initWebSocket();
      this.isStreaming.set(true);
    }
  }

  clearData(): void {
    this.temperatureData.set([]);
  }

  private initWebSocket(): void {
    try {
      this.wsConnection = this.temperatureService.connectToWebSocket();

      this.wsConnection.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.updateChartData(data.temperature);

        if (
          data.temperature !== null &&
          data.temperature !== undefined &&
          !isNaN(data.temperature)
        ) {
          this.updateChartData(data.temperature);
        } else {
          console.warn('Invalid temperature data received:', data);
        }
      };

      this.wsConnection.onerror = (error) => {
        this.error.set('Connection error. Retrying...');
        setTimeout(() => this.initWebSocket(), 5000);
      };
    } catch (err) {
      this.error.set('Failed to connect to temperature service');
    }
  }

  private updateChartData(temperature: number): void {
    const newData = [
      ...this.temperatureData(),
      {
        x: Date.now(),
        y: temperature,
      },
    ];

    this.temperatureData.set(newData);
    this.currentTemperature.set(temperature);
    this.lastUpdateTime.set(new Date());
    this.error.set('');
  }

  ngOnDestroy(): void {
    this.wsConnection?.close();
  }
}
