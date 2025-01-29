import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Thermometer, Heart, Activity } from 'lucide-angular';
import { ConstantesService } from '../../core/services/ConstantesViatles.service';
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

  constructor(
    private fb: FormBuilder,
    private constantesService: ConstantesService,
  ) {
    this.constantesForm = this.fb.group({
      temperature: ['', [Validators.required, Validators.min(35), Validators.max(42)]],
      frequenceCardiaque: ['', [Validators.required, Validators.min(30), Validators.max(200)]],
      tensionArterielle: ['', [Validators.required, Validators.pattern(/^\d{2,3}\/\d{2,3}$/)]],
      saturationOxygene: ['', [Validators.required, Validators.min(50), Validators.max(100)]],
    });
  }

  onSubmit(): void {
    if (this.constantesForm.valid) {
      const formData = this.constantesForm.value;
      this.constantesService.saveConstantes(formData).subscribe({
        next: (response) => {
          console.log('Backend Response:', response);
          if (response.anomalies && response.anomalies.length > 0) {
            alert(`Anomalies détectées : ${response.anomalies.join(', ')}`);
          } else {
            alert('Les constantes vitales ont été enregistrées avec succès !');
          }
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Une erreur est survenue lors de l\'enregistrement.');
        },
      });
    } else {
      alert('Veuillez vérifier les valeurs saisies.');
    }
  }
}
