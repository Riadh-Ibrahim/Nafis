import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Thermometer, Heart, Activity } from 'lucide-angular';

@Component({
  selector: 'app-constantes-formulaires',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
  ],
  templateUrl: './constantes-formulaires.component.html',
  styleUrls: ['./constantes-formulaires.component.scss']
})
export class ConstantesFormulairesComponent {
  constantesForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.constantesForm = this.fb.group({
      temperature: ['', [Validators.required, Validators.min(35), Validators.max(42)]],
      heartRate: ['', [Validators.required, Validators.min(30), Validators.max(200)]],
      bloodPressure: ['', [Validators.required, Validators.pattern(/^\d{2,3}\/\d{2,3}$/)]], 
      oxygenSaturation: ['', [Validators.required, Validators.min(50), Validators.max(100)]],
    });
  }

  onSubmit(): void {
    if (this.constantesForm.valid) {
      console.log('Form Data:', this.constantesForm.value);
      alert('Les constantes vitales ont été enregistrées avec succès !');
    } else {
      alert('Veuillez vérifier les valeurs saisies.');
    }
  }
}
