import { Component, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LandingComponent implements AfterViewInit {
  features = [
    { icon: 'fa-heart', title: 'Easy Management', description: 'Manage your healthcare with ease' },
    { icon: 'fa-lock', title: 'Secure', description: 'Your data is always secure with us' },
    { icon: 'fa-check-circle', title: 'Reliable', description: 'Trusted by thousands of users' },
  ];

  testimonials = [
    { quote: 'NAFIS HealthCare has changed the way I manage my health.', name: 'John Doe' },
    { quote: 'It’s a life-saving platform that I can trust.', name: 'Jane Smith' },
  ];

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    gsap.from('.hero-title', { opacity: 0, y: -50, duration: 1, ease: 'power3.out' });
    gsap.from('.hero-subtitle', { opacity: 0, y: 50, duration: 1, delay: 0.3 });
    gsap.from('.hero-buttons', { opacity: 0, scale: 0.8, duration: 1, delay: 0.6 });

    gsap.from('.feature', {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.3,
      scrollTrigger: {
        trigger: '.features-section',
        start: 'top 80%',
      },
    });

    gsap.from('.testimonial', {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.3,
      scrollTrigger: {
        trigger: '.testimonials-section',
        start: 'top 80%',
      },
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  scrollToFeatures(): void {
    const featuresSection = document.querySelector('.features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
