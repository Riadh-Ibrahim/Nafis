import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, catchError, of } from "rxjs";
import { MockDataService } from "./mock-data.service";
import { Rendezvous } from "../../interfaces/rendezvous";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private _currentDate: Date = new Date();
  private _currentMonth: string = '';
  private _currentYear: number = 0;
  private _appointments = new BehaviorSubject<Rendezvous[]>([]);

  constructor(private mockDataService: MockDataService) {
    this.updateCurrentMonthAndYear();
  }

  get currentMonth(): string {
    return this._currentMonth;
  }

  get currentYear(): number {
    return this._currentYear;
  }

  get appointments$(): Observable<Rendezvous[]> {
    return this._appointments.asObservable();
  }

  loadAppointments(userId: number, userType: 'doctor' | 'patient'): void {
    console.log('Loading appointments for:', userType, userId);

    if (!userId || !userType) {
      console.log('Missing userId or userType, clearing appointments');
      this._appointments.next([]);
      return;
    }

    const observable = userType === 'doctor'
      ? this.mockDataService.getDoctorRendezvous(userId)
      : this.mockDataService.getPatientRendezvous(userId);

    observable.pipe(
      catchError(err => {
        console.error('Failed to load appointments:', err);
        return of([]);
      })
    ).subscribe(appointments => {
      console.log('Loaded appointments:', appointments);
      this._appointments.next(appointments);
    });
  }
  private updateCurrentMonthAndYear(): void {
    this._currentMonth = this.getMonthName(this._currentDate.getMonth());
    this._currentYear = this._currentDate.getFullYear();
  }

  generateCalendar(): Date[] {
    const firstDay = new Date(this._currentDate.getFullYear(), this._currentDate.getMonth(), 1);
    const lastDay = new Date(this._currentDate.getFullYear(), this._currentDate.getMonth() + 1, 0);

    const calendar: Date[] = [];
    let currentDate = new Date(firstDay);

    while (currentDate <= lastDay) {
      calendar.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return calendar;
  }

  changeMonth(direction: 'prev' | 'next'): Date[] {
    const newDate = new Date(this._currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'prev' ? -1 : 1));
    this._currentDate = newDate;
    this.updateCurrentMonthAndYear();
    return this.generateCalendar();
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }

  isInCurrentMonth(date: Date): boolean {
    return date.getMonth() === this._currentDate.getMonth() &&
      date.getFullYear() === this._currentDate.getFullYear();
  }

  getMonthName(monthIndex: number): string {
    const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    return monthNames[monthIndex];
  }

  getAppointmentsForDate(date: Date | null): Rendezvous[] {
    if (!date || !this._appointments.value) return [];

    return this._appointments.value.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate.getDate() === date.getDate() &&
        appointmentDate.getMonth() === date.getMonth() &&
        appointmentDate.getFullYear() === date.getFullYear();
    });
  }

  hasAppointmentsOnDate(date: Date): boolean {
    return this._appointments.value.some(appointment => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate.getDate() === date.getDate() &&
        appointmentDate.getMonth() === date.getMonth() &&
        appointmentDate.getFullYear() === date.getFullYear();
    });
  }
}
