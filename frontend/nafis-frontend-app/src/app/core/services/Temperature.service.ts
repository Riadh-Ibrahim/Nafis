import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { signal, computed } from '@angular/core';

export interface TemperatureData {
  temperature: number;
  timestamp: number;
}

@Injectable({
  providedIn: 'root',
})
export class TemperatureService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8883/temperature';

  // Signal for storing the latest temperature
  private _currentTemperature = signal<TemperatureData | null>(null);

  // Computed signal for formatted temperature
  currentTemperature = computed(() => {
    const temp = this._currentTemperature();
    return temp ? `${temp.temperature}°C` : 'N/A';
  });

  getLatestTemperature(): Observable<number> {
    return this.http
      .get<TemperatureData>(`ws://localhost:8883/temperature`)
      .pipe(
        map((data) => {
          this._currentTemperature.set(data);
          return data.temperature;
        })
      );
  }

  connectToWebSocket(): WebSocket {
    const ws = new WebSocket(`ws://localhost:8883/temperature`);

    ws.onmessage = (event) => {
      const data: TemperatureData = JSON.parse(event.data);
      this._currentTemperature.set(data);
    };

    return ws;
  }
}
