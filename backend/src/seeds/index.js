const mongoose = require('mongoose');
const seedTransporters = require('./transportersSeed');

const seedDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/voyagebagage', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('Connecté à MongoDB pour le seeding');
    
    await seedTransporters();
    
    console.log('Seeding terminé avec succès !');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors du seeding:', error);
    process.exit(1);
  }
};

seedDatabase(); 