import { Component, Inject, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { Patient } from '../../interfaces/patient';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from './user-table.service';
//import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [FormsModule, CheckboxComponent, ButtonComponent, RouterLink],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent {
  isChecked = false;
  patients: Patient[] = [];

  myForm = new FormGroup({
    terms: new FormControl(false),
  });
  constructor(@Inject(UserService) private patientService: UserService) {}

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this.patientService.getUsers().subscribe(
      (data: Patient[]) => {
        this.patients = data;
      },
      (error: any) => {
        console.error('Error fetching patients:', error);
      }
    );
  }

  // patients: Patient[] = [
  //   {
  //     id: 1,
  //     prenom: 'Jean',
  //     nom: 'Pierre',
  //     status: 'present',
  //     photoUrl: 'https://example.com/photo.jpg',
  //     numeroSecu: '1234567890123',
  //     email: 'jpmartin@gmail',
  //     telephone: '1234567890123',
  //     dateNaissance: '1995-01-01',
  //     adresse: '123 Rue de Rivoli, 75001 Paris',
  //     //role: 'patient',
  //   },
  //   {
  //     id: 2,
  //     nom: 'Marc',
  //     prenom: 'Dupont',
  //     photoUrl: '../../../assets/user1.webp',
  //     status: 'present',
  //     email: 'mdupont@gmail',
  //     numeroSecu: '2345678901234',
  //     telephone: '2345678901234',
  //     dateNaissance: '1990-06-15',
  //     adresse: '234 Rue de Rivoli, 75001 Paris',
  //     //role: 'patient',
  //   },
  //   {
  //     id: 3,
  //     nom: 'Marie',
  //     prenom: 'Leroy',
  //     photoUrl: '../../../assets/user2.jpg',
  //     status: 'absent',
  //     numeroSecu: '4567890123456',
  //     //email: 'mleroy@gmail',
  //     telephone: '3456789012345',
  //     dateNaissance: '1995-11-12',
  //     adresse: '345 Rue de Rivoli, 75001 Paris',
  //     //role: 'patient',
  //   },
  // ];
  //@Input() patients!: any[];
  @Input() isDoctor: boolean = false;
  @Input() showRealTimevitals!: boolean;
}
