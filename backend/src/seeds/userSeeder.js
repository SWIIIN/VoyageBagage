const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const users = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@demo.com',
    password: 'password123',
    role: 'client'
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@demo.com',
    password: 'password123',
    role: 'client'
  },
  {
    firstName: 'Bob',
    lastName: 'Transport',
    email: 'bob@transport.com',
    password: 'password123',
    role: 'transporteur'
  },
  {
    firstName: 'Alice',
    lastName: 'Transport',
    email: 'alice@transport.com',
    password: 'password123',
    role: 'transporteur'
  }
];

const seedUsers = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connecté à MongoDB');

    // Suppression des utilisateurs existants
    await User.deleteMany({});
    console.log('Base de données nettoyée');

    // Création des nouveaux utilisateurs
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await User.create({
        ...user,
        password: hashedPassword
      });
    }

    console.log('Utilisateurs de démonstration créés avec succès');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors du seeding:', error);
    process.exit(1);
  }
};

seedUsers(); 