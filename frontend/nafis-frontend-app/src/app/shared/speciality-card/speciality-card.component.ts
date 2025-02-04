import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { Doctor, Speciality } from '../../interfaces/speciality';

@Component({
  selector: 'app-speciality-card',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './speciality-card.component.html',
  styleUrl: './speciality-card.component.scss',
})
export class SpecialityCardComponent {
  @Input() medSpeciality!: Speciality;
  availableDocs: Doctor[] = [
    {
      id: 1,
      name: 'Dr. A',
      image: '../../../assets/doctor1.jpg',
    },
    {
      id: 1,
      name: 'Dr. B',
      image: '../../../assets/doctor2.jpg',
    },
    {
      id: 1,
      name: 'Dr. C',
      image: '../../../assets/doctor3.jpg',
    },
  ];
}
