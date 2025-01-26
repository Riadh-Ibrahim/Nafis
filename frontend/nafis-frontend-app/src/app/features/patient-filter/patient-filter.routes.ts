import { Routes } from '@angular/router';
import { PatientFilterComponent } from './patient-filter.component';
import { PatientListComponent } from '../patient-list/patient-list.component';

export const PATIENT_FILTER_ROUTES: Routes = [
  {
    path: '',
    component: PatientFilterComponent,
    children: [
      {
        path: 'list',
        component: PatientListComponent
      }
    ]
  }
];