import { Component, Output, EventEmitter, HostListener, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgClass } from "@angular/common";
import { CalendarService } from '../../../core/services/calendar.service';
import { Subject, takeUntil } from 'rxjs';
import { Rendezvous } from '../../../interfaces/rendezvous';

@Component({
  selector: 'app-calender-sidebar',
  standalone: true,
  imports: [
    NgClass,
    CommonModule
  ],
  templateUrl: './calender-sidebar.component.html',
  styleUrls: ['./calender-sidebar.component.scss']
})
export class CalendarSidebarComponent implements OnInit, OnDestroy {
  @Input() userId!: number;
  @Input() userType!: 'doctor' | 'patient';
  @Output() appointmentAdded = new EventEmitter<Rendezvous>();

  weekdays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  calendar: Date[] = [];
  selectedDate: Date | null = null;
  allAppointments: Rendezvous[] = [];
  displayedAppointments: Rendezvous[] = [];
  private destroy$ = new Subject<void>();

  constructor(private calendarService: CalendarService) {
    this.updateCalendar();
  }

  ngOnInit() {
    console.log('Calendar Init - UserId:', this.userId, 'UserType:', this.userType);

    if (!this.userId || !this.userType) {
      console.warn('Missing required inputs:', { userId: this.userId, userType: this.userType });
      return;
    }

    this.calendarService.loadAppointments(this.userId, this.userType);
    this.calendarService.appointments$
      .pipe(takeUntil(this.destroy$))
      .subscribe(appointments => {
        console.log('Loaded appointments for', this.userType, this.userId, ':', appointments);
        this.allAppointments = appointments;
        this.updateDisplayedAppointments();
      });
  }
  ngOnDestroy() {
    this.destroy$.next(void 0);
    this.destroy$.complete();
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
    this.updateDisplayedAppointments();
  }

  private updateDisplayedAppointments(): void {
    if (this.selectedDate) {
      this.displayedAppointments = this.calendarService.getAppointmentsForDate(this.selectedDate);
    } else {
      this.displayedAppointments = this.allAppointments;
    }
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
      date.getDate() === this.selectedDate.getDate() &&
      date.getMonth() === this.selectedDate.getMonth() &&
      date.getFullYear() === this.selectedDate.getFullYear();
  }

  selectDate(date: Date): void {
    if (this.isSelectedDate(date)) {
      this.selectedDate = null;
    } else {
      this.selectedDate = date;
    }
    this.updateDisplayedAppointments();
  }

  hasAppointments(date: Date): boolean {
    return this.calendarService.hasAppointmentsOnDate(date);
  }
}
