  import { ApplicationConfig } from '@angular/core';
  import { provideRouter } from '@angular/router';
  import { provideHttpClient, withFetch  } from '@angular/common/http';
  import { routes } from './app.routes';
  import { provideClientHydration } from '@angular/platform-browser';
  import { provideStore } from '@ngrx/store';
  import { provideEffects } from '@ngrx/effects';
  import { authReducer } from './core/store/auth/reducers/auth.reducer';
  import { AuthEffects } from './core/store/auth/effects/auth.effects';
  import { 
    LucideAngularModule, 
    Menu, 
    X, 
    Thermometer, 
    Heart, 
    Activity, 
    AlertCircle, 
    Save,
    Home, 
    Info,
    Bell,
    Package, 
    DollarSign,
    Phone,
    Stethoscope,
    
  } from 'lucide-angular';
  export const appConfig: ApplicationConfig = {
    providers: [
      provideRouter(routes),
      provideClientHydration(),
      provideHttpClient(withFetch()),
      provideStore({ auth: authReducer }),
      provideEffects([AuthEffects]),
      ...LucideAngularModule.pick({ Menu,
        X,
        Thermometer,
        Heart,
        Activity,
        AlertCircle,
        Save,
        Home,
        Info,
        Package,
        Bell,
        'dollar-sign': DollarSign,
        Phone,
        Stethoscope, // Include the Lungs icon here
      }).providers || []

      
    ]
  };
