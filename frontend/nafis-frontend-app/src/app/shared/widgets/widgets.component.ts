import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { IconsModule } from '../../../icons.module';
import { AdminSimpleWidget } from '../../features/admin-dashboard/main/main.component';

@Component({
  selector: 'app-widgets',
  standalone: true,
  imports: [LucideAngularModule, IconsModule],
  templateUrl: './widgets.component.html',
  styleUrl: './widgets.component.scss',
})
export class WidgetsComponent {
  @Input({ required: true }) widget!: AdminSimpleWidget;
}
