import { Injectable } from '@angular/core';
import { CalendarEvent } from "../../interfaces/calendarEvent";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private _currentDate: Date = new Date();
  private _currentMonth: string = '';
  private _currentYear: number = 0;

  events: CalendarEvent[] = [
    { date: [new Date(2025, 0, 14)], title: ['Take Elle for a walk'] },
    { date: [new Date(2025, 0, 25)], title: ['Doctor appointment'] },
    { date: [new Date(2025, 0, 28)], title: ['Medication refill'] }
  ];

  constructor() {}

  get currentMonth(): string {
    return this._currentMonth;
  }

  set currentMonth(month: string) {
    this._currentMonth = month;
  }

  get currentYear(): number {
    return this._currentYear;
  }

  set currentYear(year: number) {
    this._currentYear = year;
  }

  get currentDate(): Date {
    return this._currentDate;
  }

  set currentDate(date: Date) {
    this._currentDate = date;
  }

  generateCalendar(): Date[] {
    const firstDay = new Date(this._currentDate.getFullYear(), this._currentDate.getMonth(), 1);
    const lastDay = new Date(this._currentDate.getFullYear(), this._currentDate.getMonth() + 1, 0);

    this.currentMonth = this.getMonthName(this._currentDate.getMonth());
    this.currentYear = this._currentDate.getFullYear();

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

    return this.generateCalendar();
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate()
      && date.getMonth() === today.getMonth()
      && date.getFullYear() === today.getFullYear();
  }

  isInCurrentMonth(date: Date): boolean {
    return date.getMonth() === this._currentDate.getMonth()
      && date.getFullYear() === this._currentDate.getFullYear();
  }

  getMonthName(monthIndex: number): string {
    const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    return monthNames[monthIndex];
  }

  addEvent(selectedDate: Date | null): CalendarEvent | null {
    if (!selectedDate) return null;

    const newEvent: CalendarEvent = {
      date: [selectedDate],
      title: ['New Event']
    };

    this.events.push(newEvent);
    return newEvent;
  }

  getEventsForDate(date: Date | null): CalendarEvent[] {
    if (!date) return [];
    return this.events.filter(event =>
      event.date.some(d => d.toDateString() === date.toDateString())
    );
  }
}
