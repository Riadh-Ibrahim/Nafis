import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { ButtonComponent } from "./shared/button/button.component";
import { LoginComponent } from './features/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './shared/footer/footer.component';
import { LucideAngularModule } from 'lucide-angular';
import { ConstantesFormulairesComponent } from "./features/constantes-formulaires/constantes-formulaires.component";
import { StoreModule } from '@ngrx/store';
import { IconsModule } from '../icons.module';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LucideAngularModule,
    RouterOutlet,
    NavbarComponent,
    ButtonComponent,
    LoginComponent,
    FooterComponent,
    ConstantesFormulairesComponent,
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
