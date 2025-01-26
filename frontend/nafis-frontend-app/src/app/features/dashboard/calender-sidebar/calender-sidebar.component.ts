import { Component, Output, EventEmitter } from '@angular/core';
import {CommonModule, NgClass} from "@angular/common";
import {CalendarEvent} from "../../../interfaces/calendarEvent";

@Component({
  selector: 'app-calender-sidebar',
  standalone: true,
  imports: [
    NgClass,
    CommonModule
  ],
  templateUrl: './calender-sidebar.component.html',
  styleUrl: './calender-sidebar.component.scss'
})
export class CalendarSidebarComponent {
  weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  calendar: Date[] = [];
  selectedDate: Date | null = null;
  events: CalendarEvent[] = [
    { date: [new Date(2020, 9, 14)], title: ['Take Elle for a walk'] },
    { date: [new Date(2020, 9, 25)], title: ['Doctor appointment'] },
    { date: [new Date(2020, 9, 28)], title: ['Medication refill'] }
  ];

  @Output() eventAdded = new EventEmitter<CalendarEvent>();

  private _currentMonth: string = '';
  private _currentYear: number = 0;
  private _currentDate: Date;

  constructor() {
    this._currentDate = new Date();
    this.generateCalendar();
  }

  generateCalendar() {
    const firstDay = new Date(this._currentDate.getFullYear(), this._currentDate.getMonth(), 1);
    const lastDay = new Date(this._currentDate.getFullYear(), this._currentDate.getMonth() + 1, 0);

    this.currentMonth = this.getMonthName(this._currentDate.getMonth());
    this.currentYear = this._currentDate.getFullYear();

    this.calendar = [];
    let currentDate = new Date(firstDay);
    while (currentDate <= lastDay) {
      this.calendar.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  changeMonth(direction: 'prev' | 'next') {
    const newDate = new Date(this._currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'prev' ? -1 : 1));
    this._currentDate = newDate;
    this.generateCalendar();
    this.selectedDate = null;
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

  isSelectedDate(date: Date): boolean {
    return this.selectedDate !== null &&
      date.toDateString() === this.selectedDate.toDateString();
  }

  selectDate(date: Date) {
    this.selectedDate = date;
  }

  get eventsForSelectedDate(): CalendarEvent[] {
    return this.events.filter(event =>
      event.date.some(d => d.toDateString() === this.selectedDate?.toDateString())
    );
  }

  addEvent() {
    if (!this.selectedDate) {
      return;
    }

    const newEvent: CalendarEvent = {
      date: [this.selectedDate],
      title: ['New Event']
    };

    this.events.push(newEvent);
    this.eventAdded.emit(newEvent);
  }

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

  private getMonthName(monthIndex: number): string {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[monthIndex];
  }
}
