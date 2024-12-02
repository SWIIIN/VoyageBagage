const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { protect } = require('../middleware/auth');

// Récupérer le modèle Request
const Request = mongoose.model('Request');

// Route pour obtenir toutes les demandes disponibles (status: pending)
router.get('/available', protect, async (req, res) => {
  try {
    const requests = await Request.find({ 
      status: 'pending',
      transporteur: null 
    })
    .populate('client', 'firstName lastName email')
    .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des demandes',
      error: error.message
    });
  }
});

// Route pour obtenir mes transports/demandes
router.get('/my-requests', protect, async (req, res) => {
  try {
    const requests = await Request.find({
      $or: [
        { client: req.user._id },
        { transporteur: req.user._id }
      ]
    })
    .populate('client', 'firstName lastName email')
    .populate('transporteur', 'firstName lastName email')
    .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de vos transports',
      error: error.message
    });
  }
});

module.exports = router; 