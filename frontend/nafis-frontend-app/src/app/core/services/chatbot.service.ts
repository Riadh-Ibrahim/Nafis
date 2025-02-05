import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environement';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GeminiResponse } from '../../interfaces/chatbot.types';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {   
  private readonly API_KEY = environment.geminiApiKey; 
  private readonly API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
  private requestTimestamps: number[] = [];
  private readonly MAX_REQUESTS_PER_MINUTE = 60;

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<string> {
    if (!this.checkQuota()) {
      return of('Désolé, j\'ai atteint ma limite de requêtes. Veuillez patienter un moment.');
    }

    const payload = {
      contents: [{
        parts: [{
          text: `Tu es un assistant médical intelligent nommé Nafis Assistant qui aide avec le système de gestion hospitalière. 
                 Contexte: Tu aides les patients et le personnel médical.
                 Question: ${message}`
        }]
      }]
    };

    return this.http.post<GeminiResponse>(`${this.API_URL}?key=${this.API_KEY}`, payload)
      .pipe(
        map(response => response.candidates[0].content.parts[0].text),
        catchError(this.handleError)
      );
  }

  private checkQuota(): boolean {
    const now = Date.now();
    this.requestTimestamps = this.requestTimestamps.filter(
      timestamp => now - timestamp < 60000
    );
    if (this.requestTimestamps.length >= this.MAX_REQUESTS_PER_MINUTE) {
      return false;
    }
    this.requestTimestamps.push(now);
    return true;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else if (error.status === 429) {
      errorMessage = 'Quota dépassé. Veuillez patienter.';
    }
    return throwError(() => errorMessage);
  }
}