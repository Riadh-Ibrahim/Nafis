import { Component } from '@angular/core';

@Component({
  selector: 'app-reporting',
  standalone: true,
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss'],
})
export class ReportingComponent {
  // Static dashboard metrics
  totalPatients: number = 1200;
  totalDoctors: number = 75;
  appointmentsToday: number = 150;
  revenueToday: number = 5000; // USD

  // Dummy data for a simple monthly visits bar chart
  monthlyVisits = [
    { month: 'Jan', visits: 300 },
    { month: 'Feb', visits: 350 },
    { month: 'Mar', visits: 400 },
    { month: 'Apr', visits: 450 },
    { month: 'May', visits: 420 },
    { month: 'Jun', visits: 480 },
    { month: 'Jul', visits: 500 },
    { month: 'Aug', visits: 520 },
    { month: 'Sep', visits: 510 },
    { month: 'Oct', visits: 530 },
    { month: 'Nov', visits: 550 },
    { month: 'Dec', visits: 600 },
  ];
}
