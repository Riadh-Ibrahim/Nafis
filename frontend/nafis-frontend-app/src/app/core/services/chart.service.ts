import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { temperature } from '../../interfaces/temperature';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor(private http: HttpClient) {
    Chart.register(...registerables);
  }

  loadData() {
    return this.http.get<temperature[]>('http://localhost:8883/temperature');
  }
}
