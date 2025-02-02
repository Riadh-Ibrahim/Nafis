import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-specialitylist',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './specialitylist.component.html',
  styleUrl: './specialitylist.component.scss',
})
export class SpecialitylistComponent {}
