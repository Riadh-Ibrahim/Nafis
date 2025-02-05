import { Component } from '@angular/core';
import { WidgetsComponent } from '../../../shared/widgets/widgets.component';
import { ConsultationByMonthComponent } from '../consultation-by-month/consultation-by-month.component';
import { ConsultationByCategoryComponent } from '../consultation-by-category/consultation-by-category.component';
import { ConsultationByDoctorComponent } from '../consultation-by-doctor/consultation-by-doctor.component';
import { LastFewTransactionsComponent } from '../last-few-transactions/last-few-transactions.component';

export interface AdminSimpleWidget {
  category: string;
  value: number;
  icon?: string;
}
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    WidgetsComponent,
    ConsultationByMonthComponent,
    ConsultationByCategoryComponent,
    ConsultationByDoctorComponent,
    LastFewTransactionsComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  widgets: AdminSimpleWidget[] = [
    {
      category: 'Personnel',
      value: 323,
      icon: 'users',
    },
    {
      category: 'Consultation this month',
      value: 12,
      icon: 'calendar',
    },
    {
      category: 'Urgence this month',
      value: 11,
      icon: 'ambulance',
    },
    {
      category: 'Chambres libres',
      value: 12,
      icon: 'hospital',
    },
  ];
}
