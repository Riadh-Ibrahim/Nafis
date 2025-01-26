// navbar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Menu, X} from 'lucide-angular';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule,],
  
    templateUrl: './navbar.component.html', 
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isOpen = false;
  showNotifications = false; // Contrôle l'affichage du menu déroulant des notifications
  unreadCount = 2; // Nombre de notifications non lues (à remplacer par une logique dynamique)
  notifications = [
    { id: 1, message: 'Nouvelle alerte : Température critique détectée.', read: false },
    { id: 2, message: 'Rappel : Rendez-vous à 10h avec le Dr. Smith.', read: false },
  ]; 


  navigationItems = [
    { name: 'Home', href: '/home', icon: 'home' },
    { name: 'About', href: '/about', icon: 'info' },
    { name: 'Services', href: '/services', icon: 'package' },
    { name: 'Pricing', href: '/pricing', icon: 'dollar-sign' },
    { name: 'Contact', href: '/contact', icon: 'phone' }
  ];

  // Basculer l'affichage des notifications
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  // Marquer une notification comme lue
  markAsRead(id: number) {
    const notification = this.notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      notification.read = true;
      this.unreadCount -= 1;
    }
  }
}