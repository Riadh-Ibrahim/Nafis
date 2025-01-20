import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Input } from '@angular/core'

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})

export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'add' = 'primary';
  @Input() disabled = false;
}
