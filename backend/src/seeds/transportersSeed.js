const mongoose = require('mongoose');
const User = require('../models/User');

const transportersData = [
  {
    firstName: 'Hassan',
    lastName: 'Alami',
    email: 'hassan.alami@transport.ma',
    password: 'password123',
    phone: '0661234567',
    address: 'Casablanca, Maroc',
    role: 'transporteur',
    rating: 4.8,
    vehicle: 'Mercedes Sprinter 2022',
    license: 'ABC123',
    completedTransports: 156,
    description: 'Spécialiste du transport express entre Casablanca et Rabat. Plus de 10 ans d\'expérience.',
    specialties: ['Express', 'Meubles', 'Fragile'],
    image: 'https://images.unsplash.com/photo-1537511446984-935f663eb1f4?w=500&q=80',
    priceRange: '300-800 DH'
  },
  {
    firstName: 'Karim',
    lastName: 'Benjelloun',
    email: 'karim.ben@transport.ma',
    password: 'password123',
    phone: '0662345678',
    address: 'Marrakech, Maroc',
    role: 'transporteur',
    rating: 4.9,
    vehicle: 'Renault Master',
    license: 'XYZ789',
    completedTransports: 203,
    description: 'Transport sécurisé dans tout le Maroc. Spécialiste des longues distances.',
    specialties: ['Longue distance', 'Déménagement', 'Sécurisé'],
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80',
    priceRange: '400-1200 DH'
  },
  {
    firstName: 'Fatima',
    lastName: 'Moussaoui',
    email: 'fatima.m@transport.ma',
    password: 'password123',
    phone: '0663456789',
    address: 'Tanger, Maroc',
    role: 'transporteur',
    rating: 4.7,
    vehicle: 'Ford Transit',
    license: 'DEF456',
    completedTransports: 178,
    description: 'Service de transport professionnel entre Tanger et Tétouan. Satisfaction garantie.',
    specialties: ['Express', 'Bagages', 'International'],
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=500&q=80',
    priceRange: '250-600 DH'
  },
  {
    firstName: 'Youssef',
    lastName: 'El Amrani',
    email: 'youssef.ea@transport.ma',
    password: 'password123',
    phone: '0664567890',
    address: 'Agadir, Maroc',
    role: 'transporteur',
    rating: 4.6,
    vehicle: 'Peugeot Boxer',
    license: 'GHI789',
    completedTransports: 134,
    description: 'Transport fiable dans le Sud du Maroc. Spécialiste des objets fragiles.',
    specialties: ['Fragile', 'Meubles', 'Électroménager'],
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=500&q=80',
    priceRange: '300-900 DH'
  },
  {
    firstName: 'Amina',
    lastName: 'Tahiri',
    email: 'amina.t@transport.ma',
    password: 'password123',
    phone: '0665678901',
    address: 'Fès, Maroc',
    role: 'transporteur',
    rating: 4.8,
    vehicle: 'Citroën Jumper',
    license: 'JKL012',
    completedTransports: 167,
    description: 'Transport de qualité dans la région de Fès-Meknès. Ponctualité garantie.',
    specialties: ['Express', 'Déménagement', 'Professionnel'],
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80',
    priceRange: '200-700 DH'
  }
];

const seedTransporters = async () => {
  try {
    // Supprime les transporteurs existants
    await User.deleteMany({ role: 'transporteur' });
    
    // Insère les nouveaux transporteurs
    await User.insertMany(transportersData);
    
    console.log('Données des transporteurs insérées avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'insertion des données:', error);
  }
};

module.exports = seedTransporters; 