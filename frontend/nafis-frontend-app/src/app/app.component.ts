import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { FooterComponent } from './shared/footer/footer.component';
import { LucideAngularModule } from 'lucide-angular';
import { IconsModule } from '../icons.module';
import { ChatbotComponent } from './features/chatbot/chatbot.component';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // NoopAnimationsModule,
    LucideAngularModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    IconsModule ,
    ChatbotComponent,

],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nafis-frontend-app';
  handleClick() {
    alert("ahowa")
  }
}
