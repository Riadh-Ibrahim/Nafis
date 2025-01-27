import { Component, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule, NgClass } from "@angular/common";
import { CalendarEvent } from "../../../interfaces/calendarEvent";
import { CalendarService } from '../../../core/services/calendar.service';

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

  @Output() eventAdded = new EventEmitter<CalendarEvent>();

  constructor(private calendarService: CalendarService) {
    this.updateCalendar();
  }

  get currentMonth(): string {
    return this.calendarService.currentMonth;
  }

  get currentYear(): number {
    return this.calendarService.currentYear;
  }

  updateCalendar(): void {
    this.calendar = this.calendarService.generateCalendar();
  }

  changeMonth(direction: 'prev' | 'next'): void {
    this.calendar = this.calendarService.changeMonth(direction);
    this.selectedDate = null;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      this.changeMonth('prev');
    } else if (event.key === 'ArrowRight') {
      this.changeMonth('next');
    }
  }

  isToday(date: Date): boolean {
    return this.calendarService.isToday(date);
  }

  isInCurrentMonth(date: Date): boolean {
    return this.calendarService.isInCurrentMonth(date);
  }

  isSelectedDate(date: Date): boolean {
    return this.selectedDate !== null &&
      date.toDateString() === this.selectedDate.toDateString();
  }

  selectDate(date: Date): void {
    this.selectedDate = date;
  }

  get eventsForSelectedDate(): CalendarEvent[] {
    return this.calendarService.getEventsForDate(this.selectedDate);
  }

  addEvent(): void {
    const newEvent = this.calendarService.addEvent(this.selectedDate);
    if (newEvent) {
      this.eventAdded.emit(newEvent);
    }
  }
}
