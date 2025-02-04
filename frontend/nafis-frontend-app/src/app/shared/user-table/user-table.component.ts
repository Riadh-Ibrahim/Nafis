import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { Patient } from '../../interfaces/patient';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [FormsModule, CheckboxComponent, ButtonComponent],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent {
  isChecked = false;

  myForm = new FormGroup({
    terms: new FormControl(false),
  });

  patients: Patient[] = [
    {
      id: 1,
      prenom: 'Jean',
      nom: 'Pierre',
      status: 'present',
      photoUrl: 'https://example.com/photo.jpg',
      numeroSecu: '1234567890123',
      email: 'jpmartin@gmail',
      telephone: '1234567890123',
      dateNaissance: '1995-01-01',
      adresse: '123 Rue de Rivoli, 75001 Paris',
      //role: 'patient',
    },
    {
      id: 2,
      nom: 'Marc',
      prenom: 'Dupont',
      photoUrl: '../../../assets/user1.webp',
      status: 'present',
      email: 'mdupont@gmail',
      numeroSecu: '2345678901234',
      telephone: '2345678901234',
      dateNaissance: '1990-06-15',
      adresse: '234 Rue de Rivoli, 75001 Paris',
      //role: 'patient',
    },
    {
      id: 3,
      nom: 'Marie',
      prenom: 'Leroy',
      photoUrl: '../../../assets/user2.jpg',
      status: 'absent',
      numeroSecu: '4567890123456',
      //email: 'mleroy@gmail',
      telephone: '3456789012345',
      dateNaissance: '1995-11-12',
      adresse: '345 Rue de Rivoli, 75001 Paris',
      //role: 'patient',
    },
  ];
  @Input() isDoctor: boolean = false;
}
