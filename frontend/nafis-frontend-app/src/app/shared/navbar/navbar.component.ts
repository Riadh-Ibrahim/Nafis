// navbar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Menu, X } from 'lucide-angular';
import { Store } from '@ngrx/store';
import * as AuthSelectors from '../../core/store/auth/selectors/auth.selectors';
import * as AuthActions from '../../core/store/auth/actions/auth.actions';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],

  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isAuthenticated$ = this.store.select(AuthSelectors.selectIsAuthenticated);
  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  constructor(private store: Store) {}
  isOpen = false;
  showNotifications = false; // Contrôle l'affichage du menu déroulant des notifications
  unreadCount = 2; // Nombre de notifications non lues (à remplacer par une logique dynamique)
  notifications = [
    {
      id: 1,
      message: 'Nouvelle alerte : Température critique détectée.',
      read: false,
    },
    {
      id: 2,
      message: 'Rappel : Rendez-vous à 10h avec le Dr. Smith.',
      read: false,
    },
  ];

  navigationItems = [
    { name: 'Home', href: '/dashboard', fragment: '' },
    { name: 'About', href: '/landing', fragment: 'about' },
    { name: 'Services', href: '/landing', fragment: 'features' },
    { name: 'Contact', href: '/landing', fragment: 'testimonials' },
  ];

  // Basculer l'affichage des notifications
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  // Marquer une notification comme lue
  markAsRead(id: number) {
    const notification = this.notifications.find((n) => n.id === id);
    if (notification && !notification.read) {
      notification.read = true;
      this.unreadCount -= 1;
    }
  }
  scrollToFragment(fragment: string) {
    const element = document.getElementById(fragment);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
