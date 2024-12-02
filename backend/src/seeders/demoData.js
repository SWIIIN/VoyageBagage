const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

// Données utilisateurs de démonstration
const users = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@demo.com',
    password: 'password123',
    role: 'client',
    phone: '0601020304'
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@demo.com',
    password: 'password123',
    role: 'client',
    phone: '0602030405'
  },
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@demo.com',
    password: 'password123',
    role: 'client',
    phone: '0603040506'
  },
  {
    firstName: 'Bob',
    lastName: 'Transport',
    email: 'bob@transport.com',
    password: 'password123',
    role: 'transporteur',
    phone: '0604050607',
    vehicle: 'Camionnette',
    license: 'TR123456'
  },
  {
    firstName: 'Charlie',
    lastName: 'Delivery',
    email: 'charlie@transport.com',
    password: 'password123',
    role: 'transporteur',
    phone: '0605060708',
    vehicle: 'Fourgon',
    license: 'TR789012'
  }
];

// Données des demandes de transport
const requests = [
  {
    title: "Transport valises Paris-Lyon",
    description: "2 valises moyennes (20kg chacune) à transporter",
    departureCity: "Paris",
    departureAddress: "15 rue de la Paix, 75001",
    arrivalCity: "Lyon",
    arrivalAddress: "25 rue de la République, 69001",
    departureDate: new Date('2024-04-15'),
    price: 50,
    status: "pending",
    bagageType: "Valises",
    weight: 40,
    dimensions: "70x50x30 cm",
    fragile: false,
    urgency: "normal"
  },
  {
    title: "Cartons Marseille-Nice",
    description: "3 cartons de déménagement avec livres",
    departureCity: "Marseille",
    departureAddress: "45 rue du Vieux-Port, 13001",
    arrivalCity: "Nice",
    arrivalAddress: "12 Promenade des Anglais, 06000",
    departureDate: new Date('2024-04-20'),
    price: 75,
    status: "accepted",
    bagageType: "Cartons",
    weight: 60,
    dimensions: "50x40x40 cm chacun",
    fragile: true,
    urgency: "high"
  },
  {
    title: "Meubles Toulouse-Bordeaux",
    description: "1 canapé et 2 fauteuils",
    departureCity: "Toulouse",
    departureAddress: "8 place du Capitole, 31000",
    arrivalCity: "Bordeaux",
    arrivalAddress: "25 cours de l'Intendance, 33000",
    departureDate: new Date('2024-04-25'),
    price: 150,
    status: "completed",
    bagageType: "Meubles",
    weight: 100,
    dimensions: "Canapé: 200x90x85 cm",
    fragile: true,
    urgency: "normal"
  },
  {
    title: "Matériel informatique Lyon-Grenoble",
    description: "3 cartons d'équipement informatique",
    departureCity: "Lyon",
    departureAddress: "10 rue de la Bourse, 69002",
    arrivalCity: "Grenoble",
    arrivalAddress: "15 boulevard Gambetta, 38000",
    departureDate: new Date('2024-05-01'),
    price: 85,
    status: "pending",
    bagageType: "Matériel fragile",
    weight: 30,
    dimensions: "40x30x30 cm chacun",
    fragile: true,
    urgency: "high"
  }
];

// Données des évaluations
const reviews = [
  {
    rating: 5,
    comment: "Excellent service, très professionnel",
    type: "client_to_transporteur"
  },
  {
    rating: 4,
    comment: "Bon service, légèrement en retard",
    type: "client_to_transporteur"
  },
  {
    rating: 5,
    comment: "Client très sympathique et ponctuel",
    type: "transporteur_to_client"
  }
];

// Données des messages
const messages = [
  {
    content: "Bonjour, est-ce possible de modifier l'heure de livraison ?",
    type: "client_to_transporteur"
  },
  {
    content: "Pas de problème, quelle heure vous conviendrait ?",
    type: "transporteur_to_client"
  },
  {
    content: "Serait-il possible vers 15h ?",
    type: "client_to_transporteur"
  }
];

// Fonction pour peupler la base de données
const seedDatabase = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connecté à MongoDB');

    // Suppression des données existantes
    await mongoose.connection.dropDatabase();
    console.log('Base de données réinitialisée');

    // Création des schémas
    const RequestSchema = new mongoose.Schema({
      title: String,
      description: String,
      departureCity: String,
      departureAddress: String,
      arrivalCity: String,
      arrivalAddress: String,
      departureDate: Date,
      price: Number,
      status: String,
      bagageType: String,
      weight: Number,
      dimensions: String,
      fragile: Boolean,
      urgency: String,
      client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      transporteur: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      createdAt: { type: Date, default: Date.now }
    });

    const ReviewSchema = new mongoose.Schema({
      rating: Number,
      comment: String,
      type: String,
      from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      request: { type: mongoose.Schema.Types.ObjectId, ref: 'Request' },
      createdAt: { type: Date, default: Date.now }
    });

    const MessageSchema = new mongoose.Schema({
      content: String,
      type: String,
      from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      request: { type: mongoose.Schema.Types.ObjectId, ref: 'Request' },
      read: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now }
    });

    const Request = mongoose.model('Request', RequestSchema);
    const Review = mongoose.model('Review', ReviewSchema);
    const Message = mongoose.model('Message', MessageSchema);

    // Création des utilisateurs
    const createdUsers = await User.create(users);
    console.log('Utilisateurs créés');

    // Création des demandes
    const clients = createdUsers.filter(user => user.role === 'client');
    const transporteurs = createdUsers.filter(user => user.role === 'transporteur');

    const requestsWithUsers = requests.map((request, index) => ({
      ...request,
      client: clients[index % clients.length]._id,
      transporteur: request.status !== 'pending' ? transporteurs[index % transporteurs.length]._id : null
    }));

    const createdRequests = await Request.create(requestsWithUsers);
    console.log('Demandes créées');

    // Création des évaluations
    const reviewsWithUsers = reviews.map((review, index) => ({
      ...review,
      from: review.type === 'client_to_transporteur' ? clients[0]._id : transporteurs[0]._id,
      to: review.type === 'client_to_transporteur' ? transporteurs[0]._id : clients[0]._id,
      request: createdRequests[index]._id
    }));

    await Review.create(reviewsWithUsers);
    console.log('Évaluations créées');

    // Création des messages
    const messagesWithUsers = messages.map((message, index) => ({
      ...message,
      from: message.type === 'client_to_transporteur' ? clients[0]._id : transporteurs[0]._id,
      to: message.type === 'client_to_transporteur' ? transporteurs[0]._id : clients[0]._id,
      request: createdRequests[0]._id
    }));

    await Message.create(messagesWithUsers);
    console.log('Messages créés');

    console.log('Base de données peuplée avec succès !');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors du peuplement de la base de données:', error);
    process.exit(1);
  }
};

// Exécution du script
seedDatabase(); 