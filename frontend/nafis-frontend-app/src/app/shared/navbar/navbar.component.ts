// navbar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Menu, X } from 'lucide-angular';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isOpen = false;

  navigationItems = [
    { name: 'Home', href: '/home', icon: 'home' },
    { name: 'About', href: '/about', icon: 'info' },
    { name: 'Services', href: '/services', icon: 'package' },
    { name: 'Pricing', href: '/pricing', icon: 'dollar-sign' },
    { name: 'Contact', href: '/contact', icon: 'phone' }
  ];
}
