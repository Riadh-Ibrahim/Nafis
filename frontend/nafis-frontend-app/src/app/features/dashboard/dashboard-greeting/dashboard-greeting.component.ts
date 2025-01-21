import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-greeting',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 bg-white rounded-lg shadow-sm mb-6">
      <h1 class="text-2xl font-bold text-space-cadet mb-2">
        {{ greetingMessage }},
        <span class="text-citrine">{{ fullName }}</span>
      </h1>
      <p class="text-gray-600">{{ subtitle }}</p>
    </div>
  `
})
export class DashboardGreetingComponent {
  @Input() greetingMessage: string = '';
  @Input() fullName: string = '';
  @Input() subtitle: string = '';
}
