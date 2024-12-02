const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  departureCity: {
    type: String,
    required: true
  },
  departureAddress: {
    type: String,
    required: true
  },
  arrivalCity: {
    type: String,
    required: true
  },
  arrivalAddress: {
    type: String,
    required: true
  },
  departureDate: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'completed', 'cancelled'],
    default: 'pending'
  },
  bagageType: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  dimensions: String,
  fragile: {
    type: Boolean,
    default: false
  },
  urgency: {
    type: String,
    enum: ['low', 'normal', 'high'],
    default: 'normal'
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  transporteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const Request = mongoose.model('Request', requestSchema);
module.exports = Request; 