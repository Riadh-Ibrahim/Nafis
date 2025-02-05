import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgClass],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  @Input() content: string = "";
  @Input() timestamp: Date = new Date("2025-02-05T17:35:31.340Z");
  @Input() incoming: boolean = true;
}
