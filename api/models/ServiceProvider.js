const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');  // Import the UUID v4 generator

const ServiceProviderSchema = new Schema({
  _id: { type: String, default: uuidv4 },  // Auto-generate _id as a string using UUID
  name: { type: String, required: true },
  description: { type: String },
  services: [{
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Services', required: true },  // Reference to Services
    servicePrice: { type: Number, required: true }  // Price for that specific service
  }],
  location: { type: String, required: true },
  place_id: { type: String },  // Google Places place_id
  createdAt: { type: Date, default: Date.now },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

const ServiceProviderModel = mongoose.model('ServiceProvider', ServiceProviderSchema);
module.exports = ServiceProviderModel;
