import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-preview',
  standalone: true,
  imports: [],
  templateUrl: './message-preview.component.html',
  styleUrl: './message-preview.component.scss',
})
export class MessagePreviewComponent {
  @Input() sender: string = '';
  @Input() content: string = '';
}
