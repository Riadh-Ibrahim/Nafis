import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-greeting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-greeting.component.html',
  styleUrls: ['./dashboard-greeting.component.scss']
})
export class DashboardGreetingComponent {
  @Input() greetingMessage: string = '';
  @Input() fullName: string = '';
  @Input() subtitle: string = '';
}
