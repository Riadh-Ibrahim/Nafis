// doctor-list.component.ts
import { Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Personnel {
  id: number;
  nom: string;
  prenom: string;
  type: PersonnelType;
  categorie: PersonnelCategorie;
  specialite?: PersonnelSpecialite;
  service: string;
  email: string;
  telephone: string;
  matricule: string;
  dateRecrutement: Date;
  statut: 'PRESENT' | 'ABSENT' | 'CONGE' | 'MISSION';
  // Additional fields for patient-facing info
  experience: number;
  rating: number;
  totalRatings: number;
  address: string;
  distance?: number;
  imageUrl: string;
  website?: string;
}

enum PersonnelType {
  MEDICAL,
  PARAMENDICAL,
}
enum PersonnelCategorie {
  PERMANENT,
  TEMPORAIRE,
}
enum PersonnelSpecialite {
  DERMATOLOGY,
  FAMILY_MEDICINE,
  CARDIOLOGY,
}

@Component({
  selector: 'app-doctor-search',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './doctor-search.component.html',
  styleUrls: ['./doctor-search.component.scss'],
})
export class DoctorSearchComponent {
  loading = signal(true);
  doctors = signal<Personnel[]>([
    {
      id: 1,
      nom: 'Kassay',
      prenom: 'Kara Michele',
      type: PersonnelType.MEDICAL,
      categorie: PersonnelCategorie.PERMANENT,
      specialite: PersonnelSpecialite.DERMATOLOGY,
      service: 'Family Medicine',
      email: 'kara.kassay@example.com',
      telephone: '(555) 123-4567',
      matricule: 'DR001',
      dateRecrutement: new Date('2015-03-15'),
      statut: 'PRESENT',
      experience: 29,
      rating: 4.5,
      totalRatings: 24,
      address: '9205 Sw Barnes Rd, Portland, OR 97225',
      distance: 9.57,

      imageUrl: '../../../assets/doctor1.jpg',
      website: 'http://www.karakassay.com/',
    },
    {
      id: 2,
      nom: 'Smith',
      prenom: 'John',
      type: PersonnelType.MEDICAL,
      categorie: PersonnelCategorie.PERMANENT,
      specialite: PersonnelSpecialite.FAMILY_MEDICINE,
      service: 'General Practice',
      email: 'john.smith@example.com',
      telephone: '(555) 987-6543',
      matricule: 'DR002',
      dateRecrutement: new Date('2010-08-12'),
      statut: 'PRESENT',
      experience: 13,
      rating: 4.8,
      totalRatings: 45,
      address: '123 Main St, Anytown, USA',
      distance: 5.23,
      imageUrl: '/assets/doctor-image2.jpg',
      website: 'http://www.johnsmithmd.com/',
    },
    {
      id: 3,
      nom: 'Johnson',
      prenom: 'Emily',
      type: PersonnelType.MEDICAL,
      categorie: PersonnelCategorie.TEMPORAIRE,
      specialite: PersonnelSpecialite.CARDIOLOGY,
      service: 'Cardiology',
      email: 'emily.johnson@example.com',
      telephone: '(555) 234-5678',
      matricule: 'DR003',
      dateRecrutement: new Date('2018-05-21'),
      statut: 'ABSENT',
      experience: 5,
      rating: 4.2,
      totalRatings: 30,
      address: '456 Elm St, Metropolis, USA',
      distance: 12.34,
      imageUrl: '/assets/doctor-image3.jpg',
      website: 'http://www.emilyjohnsoncardiology.com/',
    },
    {
      id: 4,
      nom: 'Williams',
      prenom: 'Christopher',
      type: PersonnelType.PARAMENDICAL,
      categorie: PersonnelCategorie.PERMANENT,
      specialite: PersonnelSpecialite.FAMILY_MEDICINE,
      service: 'Pediatrics',
      email: 'christopher.williams@example.com',
      telephone: '(555) 345-6789',
      matricule: 'DR004',
      dateRecrutement: new Date('2005-01-30'),
      statut: 'PRESENT',
      experience: 18,
      rating: 4.9,
      totalRatings: 60,
      address: '789 Oak St, Smalltown, USA',
      distance: 2.56,
      imageUrl: '/assets/doctor-image4.jpg',
      website: 'http://www.christopherwilliamsmd.com/',
    },
    {
      id: 5,
      nom: 'Jones',
      prenom: 'Olivia',
      type: PersonnelType.MEDICAL,
      categorie: PersonnelCategorie.PERMANENT,
      specialite: PersonnelSpecialite.DERMATOLOGY,
      service: 'Dermatology',
      email: 'olivia.jones@example.com',
      telephone: '(555) 456-7890',
      matricule: 'DR005',
      dateRecrutement: new Date('2012-11-11'),
      statut: 'CONGE',
      experience: 11,
      rating: 3.9,
      totalRatings: 15,
      address: '321 Pine St, Bigcity, USA',
      distance: 8.9,
      imageUrl: '/assets/doctor-image5.jpg',
      website: 'http://www.oliviajonesderm.com/',
    },
    {
      id: 6,
      nom: 'Brown',
      prenom: 'Sophia',
      type: PersonnelType.MEDICAL,
      categorie: PersonnelCategorie.TEMPORAIRE,
      specialite: PersonnelSpecialite.CARDIOLOGY,
      service: 'Heart Clinic',
      email: 'sophia.brown@example.com',
      telephone: '(555) 567-8901',
      matricule: 'DR006',
      dateRecrutement: new Date('2017-03-17'),
      statut: 'PRESENT',
      experience: 6,
      rating: 4.7,
      totalRatings: 50,
      address: '654 Maple St, Middletown, USA',
      distance: 11.45,
      imageUrl: '/assets/doctor-image6.jpg',
      website: 'http://www.sophiabrownheart.com/',
    },
    {
      id: 7,
      nom: 'Davis',
      prenom: 'James',
      type: PersonnelType.PARAMENDICAL,
      categorie: PersonnelCategorie.PERMANENT,
      specialite: PersonnelSpecialite.FAMILY_MEDICINE,
      service: 'General Practice',
      email: 'james.davis@example.com',
      telephone: '(555) 678-9012',
      matricule: 'DR007',
      dateRecrutement: new Date('2008-06-24'),
      statut: 'MISSION',
      experience: 15,
      rating: 4.1,
      totalRatings: 20,
      address: '987 Birch St, Largetown, USA',
      distance: 14.78,
      imageUrl: '/assets/doctor-image7.jpg',
      website: 'http://www.jamesdavismd.com/',
    },
    {
      id: 8,
      nom: 'Miller',
      prenom: 'Ava',
      type: PersonnelType.MEDICAL,
      categorie: PersonnelCategorie.PERMANENT,
      specialite: PersonnelSpecialite.DERMATOLOGY,
      service: 'Skin Care',
      email: 'ava.miller@example.com',
      telephone: '(555) 789-0123',
      matricule: 'DR008',
      dateRecrutement: new Date('2011-09-09'),
      statut: 'PRESENT',
      experience: 12,
      rating: 4.4,
      totalRatings: 35,
      address: '852 Willow St, Smalltown, USA',
      distance: 7.89,
      imageUrl: '/assets/doctor-image8.jpg',
      website: 'http://www.avamillerskincare.com/',
    },
    {
      id: 9,
      nom: 'Wilson',
      prenom: 'Mason',
      type: PersonnelType.MEDICAL,
      categorie: PersonnelCategorie.TEMPORAIRE,
      specialite: PersonnelSpecialite.CARDIOLOGY,
      service: 'Heart Institute',
      email: 'mason.wilson@example.com',
      telephone: '(555) 890-1234',
      matricule: 'DR009',
      dateRecrutement: new Date('2009-04-08'),
      statut: 'PRESENT',
      experience: 14,
      rating: 4.6,
      totalRatings: 55,
      address: '963 Cedar St, Anytown, USA',
      distance: 10.12,
      imageUrl: '/assets/doctor-image9.jpg',
      website: 'http://www.masonwilsonheart.com/',
    },
    {
      id: 10,
      nom: 'Moore',
      prenom: 'Isabella',
      type: PersonnelType.MEDICAL,
      categorie: PersonnelCategorie.PERMANENT,
      specialite: PersonnelSpecialite.FAMILY_MEDICINE,
      service: 'Family Practice',
      email: 'isabella.moore@example.com',
      telephone: '(555) 901-2345',
      matricule: 'DR010',
      dateRecrutement: new Date('2013-12-12'),
      statut: 'PRESENT',
      experience: 10,
      rating: 4.3,
      totalRatings: 40,
      address: '147 Spruce St, Bigcity, USA',
      distance: 6.34,
      imageUrl: '/assets/doctor-image10.jpg',
      website: 'http://www.isabellamooremd.com/',
    },
  ]);
  constructor() {
    setTimeout(() => {
      this.loading.set(false);
    }, 2000); // Show skeleton for 2 seconds
  }
}
