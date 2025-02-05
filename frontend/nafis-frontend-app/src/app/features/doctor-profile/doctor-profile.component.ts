import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface ExpertSkill {
  name: string;
  rating: number;
}

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [],
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss'],
})
export class DoctorProfileComponent {
  expertSkills: ExpertSkill[] = [
    { name: 'IVF', rating: 5 },
    { name: 'IUI', rating: 5 },
    { name: 'ICSI', rating: 5 },
    { name: 'TESA', rating: 5 },
    { name: 'PESA', rating: 5 },
    { name: 'IMSI', rating: 5 },
    { name: 'Blastocyte Culture', rating: 5 },
    { name: 'Cryopreservation', rating: 5 },
    { name: 'Laparoscopy', rating: 5 },
    { name: 'Hysteroscopy', rating: 5 },
  ];
}
