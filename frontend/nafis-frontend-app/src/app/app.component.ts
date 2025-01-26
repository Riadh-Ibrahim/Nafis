import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { FooterComponent } from './shared/footer/footer.component';
import { LucideAngularModule } from 'lucide-angular';
import { IconsModule } from '../icons.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LucideAngularModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    IconsModule ,

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
