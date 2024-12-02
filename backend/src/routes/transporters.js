const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Cache simple en mémoire
let topTransportersCache = null;
let lastCacheTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

router.get('/top', async (req, res) => {
  try {
    // Vérifier si le cache est valide
    if (topTransportersCache && lastCacheTime && (Date.now() - lastCacheTime < CACHE_DURATION)) {
      return res.json(topTransportersCache);
    }

    // Si pas de cache ou cache expiré, faire la requête
    const topTransporters = await User.find({ role: 'transporteur' })
      .sort({ rating: -1 })
      .limit(5)
      .select('-password');
    
    // Mettre à jour le cache
    topTransportersCache = topTransporters;
    lastCacheTime = Date.now();
    
    res.json(topTransporters);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 