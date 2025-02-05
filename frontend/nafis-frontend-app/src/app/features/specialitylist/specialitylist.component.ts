import { Component } from '@angular/core';
import { Speciality } from '../../interfaces/speciality';
import { SpecialityCardComponent } from '../../shared/speciality-card/speciality-card.component';

@Component({
  selector: 'app-specialitylist',
  standalone: true,
  templateUrl: './specialitylist.component.html',
  styleUrl: './specialitylist.component.scss',
  imports: [SpecialityCardComponent],
})
export class SpecialitylistComponent {
  medSpecialities: Speciality[] = [
    {
      name: 'General Diagnosis',
      image: '../../../assets/general.jpg',
      description:
        'Comprehensive medical care and diagnosis for all health concerns.',
    },
    {
      name: 'Cardiology',
      image: '../../../assets/cardiology.avif',
      description:
        'Focuses on heart health, including diagnosis and treatment of heart conditions.',
    },
    {
      name: 'Pulmonology',
      image: '../../../assets/pulmonology.png',
      description:
        'Specializes in respiratory system health and lung conditions.',
    },
    {
      name: 'Orthopedic',
      image: '../../../assets/orthopedic.jpg',
      description:
        'Focuses on musculoskeletal system issues, including bones and joints.',
    },
    {
      name: 'Pediatrics',
      image: '../../../assets/pediatrics.jpg',
      description: 'Specializes in child health and well-being.',
    },
    {
      name: 'Radiology',
      image: '../../../assets/radiology.jpg',
      description:
        'Utilizes imaging technologies for diagnosis and treatment of diseases.',
    },
    {
      name: 'Dermatology',
      image: '../../../assets/dermatology.jpg',
      description:
        'Cares for skin health, treating conditions and diseases affecting the skin.',
    },
    {
      name: 'Psychiatry',
      image: '../../../assets/psychiatry.jpg',
      description: 'Specializes in mental health and emotional well-being.',
    },
  ];
}
