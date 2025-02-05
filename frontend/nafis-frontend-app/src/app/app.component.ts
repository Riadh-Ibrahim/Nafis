import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { IconsModule } from '../icons.module';
import { LucideAngularModule, Send, X, ChevronUp } from 'lucide-angular';
import { ChatbotComponent } from './features/chatbot/chatbot.component';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
//import { TemperatureChartComponent } from './features/charts/charts.component';
//import { RealtimeTemperatureChartComponent } from './shared/realtime-chart/realtime-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // NoopAnimationsModule,
    LucideAngularModule,
    NavbarComponent,
    FooterComponent,
    IconsModule ,
    ChatbotComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'nafis-frontend-app';
  handleClick() {
    alert('ahowa');
  }
}
