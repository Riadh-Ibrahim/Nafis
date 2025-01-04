// navbar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <nav class="bg-gradient-to-r from-cyan-400 to-cyan-300 shadow-lg fixed w-full top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <!-- Logo Section -->
          <div class="flex-shrink-0 flex items-center space-x-4">
            <img src="../../../assets/medical.svg" class="h-12 w-auto transform hover:scale-110 transition-transform duration-300" alt="NAFIS Logo" />
            <span class="text-3xl font-bold text-white tracking-wider hover:text-cyan-700 transition-colors duration-300">NAFIS</span>
          </div>

          <!-- Mobile menu button -->
          <div class="flex md:hidden">
            <button 
              (click)="isOpen = !isOpen"
              type="button" 
              class="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-cyan-500 focus:outline-none"
              [attr.aria-expanded]="isOpen"
            >
              <span class="sr-only">Open main menu</span>
              <i-lucide 
                [name]="isOpen ? 'x' : 'menu'" 
                class="h-6 w-6"
              ></i-lucide>
            </button>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex md:items-center md:space-x-8">
            <ng-container *ngFor="let item of navigationItems">
              <a 
                [routerLink]="item.href"
                routerLinkActive="text-white bg-cyan-500"
                class="group relative px-4 py-2 text-lg font-medium text-white transition-all duration-300 ease-in-out hover:text-cyan-800"
              >
                <span class="relative z-10">{{ item.name }}</span>
                <span class="absolute bottom-0 left-0 w-0 h-1 bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </a>
            </ng-container>

            <!-- Login/Sign Up Buttons -->
            <div class="flex items-center space-x-4">
              <button class="px-6 py-2 text-white font-medium rounded-full border-2 border-white hover:bg-white hover:text-cyan-500 transition-all duration-300 transform hover:scale-105">
                Login
              </button>
              <button class="px-6 py-2 text-cyan-500 font-medium rounded-full bg-white hover:bg-cyan-100 transition-all duration-300 transform hover:scale-105">
                Sign Up
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div class="md:hidden" [class.hidden]="!isOpen">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <ng-container *ngFor="let item of navigationItems">
              <a 
                [routerLink]="item.href"
                routerLinkActive="text-white bg-cyan-500"
                class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-cyan-500 transition-all duration-300"
              >
                {{ item.name }}
              </a>
            </ng-container>
            
            <!-- Mobile Login/Sign Up -->
            <div class="mt-4 space-y-2">
              <button
              routerLink="/login" class="w-full px-4 py-2 text-white font-medium rounded-full border-2 border-white hover:bg-white hover:text-cyan-500 transition-all duration-300">
                Login
              </button>
              <button class="w-full px-4 py-2 text-cyan-500 font-medium rounded-full bg-white hover:bg-cyan-100 transition-all duration-300">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- Spacer to prevent content from hiding under fixed navbar -->
    <div class="h-20"></div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .router-link-active {
      @apply text-white bg-cyan-500;
    }

    @keyframes slideIn {
      from {
        transform: translateY(-100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    nav {
      animation: slideIn 0.5s ease-out;
    }
  `]
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