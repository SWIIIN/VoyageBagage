const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Request = require('../models/Request');

router.get('/', async (req, res) => {
  try {
    const [users, transporters, requests, completedRequests] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'transporteur' }),
      Request.countDocuments(),
      Request.countDocuments({ status: 'completed' })
    ]);

    res.json({
      totalUsers: users,
      totalTransporters: transporters,
      totalRequests: requests,
      totalCompletedRequests: completedRequests
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 