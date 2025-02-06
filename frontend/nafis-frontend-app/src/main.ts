import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './app/core/store/auth/reducers/auth.reducer';
import { AuthEffects } from './app/core/store/auth/effects/auth.effects';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MessagingEffects } from './app/core/services/chat/chat.effects';
import { messagingReducer } from './app/core/services/chat/chat.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideStore({ auth: authReducer }),
    provideStore({ auth: authReducer, messaging: messagingReducer }),
    provideEffects([AuthEffects, MessagingEffects]),
    provideEffects([AuthEffects]),
    provideAnimationsAsync(),
  ],
}).catch((err) => console.error(err));
