import { Component } from '@angular/core';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MainComponent } from './main/main.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [SideNavComponent, MainComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {}
