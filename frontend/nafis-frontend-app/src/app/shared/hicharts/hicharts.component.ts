import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import { interval } from 'rxjs'; // Use RxJS interval for polling

@Component({
  standalone: true,
  selector: 'app-my-chart',
  templateUrl: './hicharts.component.html',
  styleUrls: ['./hicharts.component.css'],
})
export class MyChartComponent implements OnInit {
  chart: Highcharts.Chart = new Highcharts.Chart('chartContainer', {});

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.chart = Highcharts.chart('chartContainer', {
      /* ... chart options ... */
    });

    interval(5000).subscribe(() => {
      // Poll every 5 seconds
      this.http.get('your-rest-api-endpoint').subscribe((data: any) => {
        // Update chart with received data
        this.chart.series[0].setData(data.values); // Example: Replacing all series data
      });
    });
  }
}
